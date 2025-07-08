import React, { useState, useEffect } from "react";
import { mockAPI, type Admin, type User } from "../../services/mockAPi";
import { toastService } from "../../services/toastService";
import {
  Trash2,
  Edit,
  Shield,
  Crown,
  Eye,
  Search,
  UserPlus,
  AlertTriangle,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
} from "lucide-react";

import { useAuth } from "../../hooks/useAuth";

const UserManagment: React.FC = () => {
  const { user } = useAuth();
  // State for all accounts (users + admins combined)
  const [allAccounts, setAllAccounts] = useState<(User | Admin)[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null
  );
  const [showDeactivateConfirm, setShowDeactivateConfirm] = useState<{
    account: User | Admin;
    newStatus: "active" | "inactive";
  } | null>(null);
  const [sortField, setSortField] = useState<string>("lastName");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "admin" as "admin" | "superadmin",
    status: "active" as "active" | "inactive",
    permissions: [] as string[],
  });

  useEffect(() => {
    loadAllAccounts();
  }, []);

  // Load all accounts using the new endpoint
  const loadAllAccounts = async () => {
    setLoading(true);
    try {
      const accountsData = await mockAPI.getAllAccounts();
      setAllAccounts(accountsData);
    } catch (error) {
      console.error("Error loading accounts:", error);
      toastService.error("Failed to load accounts");
    } finally {
      setLoading(false);
    }
  };

  // Combine users and admins for management table
  const getManagedAccounts = () => {
    let managed: (User | Admin)[] = [];
    if (user?.role === "superadmin") {
      managed = allAccounts; // superadmins see all accounts
    } else if (user?.role === "admin") {
      managed = allAccounts.filter(account => account.role === "user"); // admins can only see/manage users
    }
    return managed
      .filter(
        (account) =>
          account.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          account.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          account.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        const fieldA =
          sortField === "name"
            ? `${a.firstName} ${a.lastName}`
            : a[sortField as keyof (User | Admin)];
        const fieldB =
          sortField === "name"
            ? `${b.firstName} ${b.lastName}`
            : b[sortField as keyof (User | Admin)];
        if (fieldA < fieldB) return sortDirection === "asc" ? -1 : 1;
        if (fieldA > fieldB) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
  };

  // Permission helpers
  const canEdit = (target: Admin | User) => {
    if (!user) return false;
    // Admins can edit users (role === 'user')
    if (user.role === "admin" && target.role === "user") return true;
    // Superadmins can edit admins and users
    if (user.role === "superadmin" && (target.role === "admin" || target.role === "user")) return true;
    return false;
  };

  const canDelete = (target: Admin | User) => {
    if (!user) return false;
    // Only superadmins can delete admins and users
    if (user.role === "superadmin" && (target.role === "admin" || target.role === "user")) return true;
    return false;
  };

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    const loadingId = toastService.loading("Adding new admin...");

    try {
      const newAdmin = await mockAPI.addAdmin({
        ...formData,
        lastLogin: new Date().toISOString(),
        avatar: "", // No emoji avatar
      });

      // Optimistic UI update - add to allAccounts
      setAllAccounts((prev) => [...prev, newAdmin]);
      setShowAddForm(false);
      resetForm();

      // Show success toast
      toastService.dismiss(loadingId);
      toastService.success(
        `${newAdmin.firstName} ${newAdmin.lastName} added successfully`
      );
    } catch (error) {
      console.error("Error adding admin:", error);
      toastService.dismiss(loadingId);
      toastService.error("Failed to add admin");
    }
  };

  const handleDeleteAdmin = async (id: string) => {
    const account = allAccounts.find((a) => a.id === id);
    const loadingId = toastService.loading("Deleting account...");

    try {
      // Use appropriate API based on account type
      if (account && 'permissions' in account) {
        await mockAPI.removeAdmin(id);
      } else {
        // For users, we would need a removeUser API method
        // For now, just remove from local state
      }

      // Optimistic UI update
      setAllAccounts((prev) => prev.filter((acc) => acc.id !== id));
      setShowDeleteConfirm(null);

      // Show success toast
      toastService.dismiss(loadingId);
      toastService.success(
        account
          ? `${account.firstName} ${account.lastName} removed successfully`
          : "Account removed successfully"
      );
    } catch (error) {
      console.error("Error deleting account:", error);
      toastService.dismiss(loadingId);
      toastService.error("Failed to delete account");
    }
  };

  const handleUpdateAdmin = async (id: string, updates: Partial<Admin>) => {
    const loadingId = toastService.loading("Updating admin...");

    try {
      const updatedAdmin = await mockAPI.updateAdmin(id, updates);

      // Optimistic UI update
      setAllAccounts((prev) =>
        prev.map((account) => (account.id === id ? updatedAdmin : account))
      );
      setEditingAdmin(null);

      // Show success toast
      toastService.dismiss(loadingId);
      toastService.success(
        `${updatedAdmin.firstName} ${updatedAdmin.lastName} updated successfully`
      );
    } catch (error) {
      console.error("Error updating admin:", error);
      toastService.dismiss(loadingId);
      toastService.error("Failed to update admin");
    }
  };

  const handleToggleStatus = async (account: User | Admin, skipConfirm = false) => {
    const newStatus = account.status === "active" ? "inactive" : "active";
    
    // Show confirmation modal for deactivation
    if (newStatus === "inactive" && !skipConfirm) {
      setShowDeactivateConfirm({ account, newStatus });
      return;
    }

    const loadingId = toastService.loading(
      `${newStatus === "active" ? "Activating" : "Deactivating"} user...`
    );

    try {
      // For admins, use the admin API
      if ("permissions" in account) {
        const updatedAdmin = await mockAPI.updateAdmin(account.id, {
          status: newStatus,
        });

        // Optimistic UI update
        setAllAccounts((prev) =>
          prev.map((acc) => (acc.id === account.id ? updatedAdmin : acc))
        );
      } else {
        // For users, use the user update API
        const updatedUser = await mockAPI.updateUser(account.id, {
          status: newStatus,
        });

        // Optimistic UI update
        setAllAccounts((prev) =>
          prev.map((acc) => (acc.id === account.id ? updatedUser : acc))
        );
      }

      // Close confirmation modal if open
      setShowDeactivateConfirm(null);

      // Show success toast
      toastService.dismiss(loadingId);
      toastService.success(
        `${account.firstName} ${account.lastName} ${
          newStatus === "active" ? "activated" : "deactivated"
        } successfully`
      );
    } catch (error) {
      console.error("Error toggling user status:", error);
      toastService.dismiss(loadingId);
      toastService.error("Failed to update user status");
    }
  };

  const canToggleStatus = (target: Admin | User) => {
    if (!user) return false;
    // Admins can toggle user status
    if (user.role === "admin" && target.role === "user") return true;
    // Superadmins can toggle admin and user status
    if (user.role === "superadmin" && (target.role === "admin" || target.role === "user")) return true;
    return false;
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      role: "admin",
      status: "active",
      permissions: [],
    });
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      // Toggle direction if clicking the same field
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Set new field and default to ascending
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getStatusBadge = (status: string) => {
    return status === "active" ? (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        <Check className="w-3 h-3 mr-1" />
        Active
      </span>
    ) : (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        <X className="w-3 h-3 mr-1" />
        Inactive
      </span>
    );
  };

  const getRoleBadge = (role: string) => {
    if (role === "superadmin") {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
          <Crown className="w-3 h-3 mr-1" />
          Super Admin
        </span>
      );
    } else if (role === "admin") {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          <Shield className="w-3 h-3 mr-1" />
          Admin
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          <Eye className="w-3 h-3 mr-1" />
          User
        </span>
      );
    }
  };

  const toggleDropdown = (adminId: string) => {
    if (activeDropdown === adminId) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(adminId);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-full mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const filteredAndSortedAccounts = getManagedAccounts();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              User Management
            </h2>
            <p className="text-gray-600">
              Manage user accounts and admin permissions
            </p>
          </div>
          {user?.role === "superadmin" && (
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center justify-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add Admin</span>
            </button>
          )}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search users and admins by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Admin Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center space-x-1">
                    <span>Name</span>
                    {sortField === "name" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      ))}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("email")}
                >
                  <div className="flex items-center space-x-1">
                    <span>Email</span>
                    {sortField === "email" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      ))}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("role")}
                >
                  <div className="flex items-center space-x-1">
                    <span>Role</span>
                    {sortField === "role" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      ))}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("status")}
                >
                  <div className="flex items-center space-x-1">
                    <span>Status</span>
                    {sortField === "status" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      ))}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("lastLogin")}
                >
                  <div className="flex items-center space-x-1">
                    <span>Last Login</span>
                    {sortField === "lastLogin" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      ))}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedAccounts.length > 0 ? (
                filteredAndSortedAccounts.map((account) => (
                  <tr key={account.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="font-medium text-gray-900">
                            {account.firstName} {account.lastName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {account.phone}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{account.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getRoleBadge(account.role)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(account.status)}
                        {canToggleStatus(account) && (
                          <button
                            onClick={() => handleToggleStatus(account)}
                            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 border ${
                              account.status === "active"
                                ? "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100 hover:border-orange-300"
                                : "bg-green-50 text-green-700 border-green-200 hover:bg-green-100 hover:border-green-300"
                            }`}
                            title={account.status === "active" ? "Deactivate user" : "Activate user"}
                          >
                            {account.status === "active" ? "Deactivate" : "Activate"}
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(account.lastLogin).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="relative inline-block text-left">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleDropdown(account.id);
                          }}
                          className="p-2 rounded-full hover:bg-gray-100"
                          disabled={
                            !(
                              canEdit(account) ||
                              canToggleStatus(account) ||
                              (account.role === "admin" || account.role === "superadmin"
                                ? canDelete(account as Admin)
                                : false)
                            )
                          }
                          style={
                            !(
                              canEdit(account) ||
                              canToggleStatus(account) ||
                              (account.role === "admin" || account.role === "superadmin"
                                ? canDelete(account as Admin)
                                : false)
                            )
                              ? { opacity: 0.5, cursor: "not-allowed" }
                              : {}
                          }
                        >
                          <MoreHorizontal className="w-5 h-5 text-gray-500" />
                        </button>

                        {activeDropdown === account.id && (canEdit(account) || canToggleStatus(account) || ('permissions' in account && canDelete(account))) && (
                          <div
                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="py-1" role="menu">
                              {canToggleStatus(account) && (
                                <button
                                  onClick={() => handleToggleStatus(account)}
                                  className={`flex items-center w-full px-4 py-2 text-sm ${
                                    account.status === "active"
                                      ? "text-orange-600 hover:bg-orange-50"
                                      : "text-green-600 hover:bg-green-50"
                                  }`}
                                >
                                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border mr-2 ${
                                    account.status === "active"
                                      ? "bg-orange-50 text-orange-700 border-orange-200"
                                      : "bg-green-50 text-green-700 border-green-200"
                                  }`}>
                                    {account.status === "active" ? "Deactivate" : "Activate"}
                                  </span>
                                </button>
                              )}
                              {canEdit(account) && "permissions" in account && (
                                <button
                                  onClick={() => setEditingAdmin(account)}
                                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  <Edit className="w-4 h-4 mr-2" /> Edit
                                </button>
                              )}
                              {canDelete(account as Admin) && "permissions" in account && (
                                <button
                                  onClick={() => setShowDeleteConfirm(account.id)}
                                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                >
                                  <Trash2 className="w-4 h-4 mr-2" /> Delete
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No users or admins found matching your search
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">
                {filteredAndSortedAccounts.length}
              </span>{" "}
              {user?.role === "superadmin" ? "accounts (users + admins)" : "users"}
            </div>
          </div>
        </div>
      </div>

      {/* Add Admin Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Add New Admin
                </h3>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <form onSubmit={handleAddAdmin} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      role: e.target.value as "admin",
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Add Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Delete Admin
                </h3>
                <p className="text-gray-600">This action cannot be undone.</p>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteAdmin(showDeleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Admin Modal - would need to be implemented similar to Add Admin Modal */}
      {editingAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Edit Admin
                </h3>
                <button
                  onClick={() => setEditingAdmin(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateAdmin(editingAdmin.id, {
                  firstName: formData.firstName,
                  lastName: formData.lastName,
                  email: formData.email,
                  phone: formData.phone,
                  role: formData.role,
                  status: formData.status,
                });
              }}
              className="p-6 space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingAdmin(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Update Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Deactivate Confirmation Modal */}
      {showDeactivateConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Deactivate User
                </h3>
                <p className="text-gray-600">
                  Are you sure you want to deactivate{" "}
                  <span className="font-medium">
                    {showDeactivateConfirm.account.firstName}{" "}
                    {showDeactivateConfirm.account.lastName}
                  </span>
                  ? They will lose access to the system.
                </p>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeactivateConfirm(null)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleToggleStatus(showDeactivateConfirm.account, true)}
                className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                Deactivate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagment;
