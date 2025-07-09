import  { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  BarChart3,
  Settings,
  Shield,
  TrendingUp,
  Clock,
  CheckCircle,
  Search,
  Download,
  Eye,
  UserCheck,
  UserX,
  DollarSign,
  CreditCard,
} from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import TransactionList from "../../components/dashbaord/TransactionList";
import { mockAPI, type User, type Transaction } from "../../services/mockAPi";
import { toastService } from "../../services/toastService";

const AdminDashboard= () => {
  const [users, setUsers] = useState<User[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [usersData, transactionsData] = await Promise.all([
        mockAPI.getUsers(),
        mockAPI.getTransactions(),
      ]);
      setUsers(usersData);
      setTransactions(transactionsData);
    } catch (error) {
      console.error("Error loading data:", error);
      toastService.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleUserStatus = async (
    userId: string,
    currentStatus: string
  ) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    const loadingId = toastService.loading(
      `${newStatus === "active" ? "Activating" : "Deactivating"} user...`
    );

    try {
      const updatedUser = await mockAPI.updateUser(userId, {
        status: newStatus,
      });
      setUsers((prev) => prev.map((u) => (u.id === userId ? updatedUser : u)));

      toastService.dismiss(loadingId);
      toastService.success(
        `User ${
          newStatus === "active" ? "activated" : "deactivated"
        } successfully`
      );
    } catch (error) {
      console.error("Error toggling user status:", error);
      toastService.dismiss(loadingId);
      toastService.error("Failed to update user status");
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-ET", {
      style: "currency",
      currency: "ETB",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getUserPaymentSummary = (userId: string) => {
    const userTransactions = transactions.filter((t) => t.userId === userId);
    const totalPayments = userTransactions
      .filter((t) => t.status === "completed")
      .reduce((sum, t) => sum + t.amount, 0);
    const totalTransactions = userTransactions.length;
    const pendingAmount = userTransactions
      .filter((t) => t.status === "pending")
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      totalPayments,
      totalTransactions,
      pendingAmount,
    };
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "all" || user.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    return status === "active" ? (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        <UserCheck className="w-3 h-3 mr-1" />
        Active
      </span>
    ) : (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        <UserX className="w-3 h-3 mr-1" />
        Inactive
      </span>
    );
  };

  const quickActions = [
    {
      title: "User Management",
      description: "Manage users and permissions",
      icon: Users,
      path: "/admin/manage-users",
    },
    {
      title: "System Analytics",
      description: "View reports and insights",
      icon: BarChart3,
      path: "/admin/analytics",
    },
    {
      title: "Settings",
      description: "Configure system settings",
      icon: Settings,
      path: "/admin/settings",
    },
    {
      title: "Security Center",
      description: "Monitor security & logs",
      icon: Shield,
      path: "/admin/security",
    },
  ];


  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === "active").length;
  const totalRevenue = transactions
    .filter((t) => t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalTransactions = transactions.length;

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">
              Manage your system with powerful admin tools
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {[
                  { id: "overview", label: "Overview", icon: BarChart3 },
                  { id: "users", label: "User Management", icon: Users },
                  {
                    id: "payments",
                    label: "Payment Summary",
                    icon: DollarSign,
                  },
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.id
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

   
          {activeTab === "overview" && (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Total Users</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {totalUsers}
                      </p>
                      <p className="text-sm text-green-600 flex items-center mt-1">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        {activeUsers} active
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">
                        Total Revenue
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {formatCurrency(totalRevenue)}
                      </p>
                      <p className="text-sm text-green-600 flex items-center mt-1">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        +18.3% this month
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Transactions</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {totalTransactions}
                      </p>
                      <p className="text-sm text-green-600 flex items-center mt-1">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        +8.3%
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">
                        System Health
                      </p>
                      <p className="text-2xl font-bold text-gray-900">98.7%</p>
                      <p className="text-sm text-green-600 flex items-center mt-1">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Healthy
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                      <Shield className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Quick Actions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <Link
                        key={index}
                        to={action.path}
                        className="bg-white rounded-xl p-6 border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 group"
                      >
                        <div className="flex flex-col items-center text-center space-y-3">
                          <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                            <Icon className="w-6 h-6 text-gray-600 group-hover:text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 mb-1">
                              {action.title}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {action.description}
                            </p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Recent Activity
                  </h2>
                </div>
                <div className="p-6">
                  <TransactionList limit={10} />
                </div>
              </div>
            </>
          )}

          {activeTab === "users" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    User Management
                  </h3>
                  <div className="flex items-center space-x-2">
                    <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                      <Download className="w-4 h-4 inline mr-1" />
                      Export
                    </button>
                  </div>
                </div>

                {/* Search and Filters */}
                <div className="flex items-center space-x-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search users by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Users Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Wallet Balance
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Payments
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Transactions
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user) => {
                      const paymentSummary = getUserPaymentSummary(user.id);
                      return (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                <span className="text-sm font-medium text-blue-800">
                                  {user.firstName.charAt(0)}
                                  {user.lastName.charAt(0)}
                                </span>
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {user.firstName} {user.lastName}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {user.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              {getStatusBadge(user.status)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {formatCurrency(user.walletBalance)}
                            </div>
                            <div className="text-sm text-gray-500">
                              {user.isVerified ? "Verified" : "Unverified"}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {formatCurrency(paymentSummary.totalPayments)}
                            </div>
                            {paymentSummary.pendingAmount > 0 && (
                              <div className="text-sm text-yellow-600">
                                {formatCurrency(paymentSummary.pendingAmount)}{" "}
                                pending
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {paymentSummary.totalTransactions}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() =>
                                  handleToggleUserStatus(user.id, user.status)
                                }
                                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                                  user.status === "active"
                                    ? "bg-red-100 text-red-800 hover:bg-red-200"
                                    : "bg-green-100 text-green-800 hover:bg-green-200"
                                }`}
                              >
                                {user.status === "active"
                                  ? "Deactivate"
                                  : "Activate"}
                              </button>
                              <button className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded transition-colors">
                                <Eye className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "payments" && (
            <div className="space-y-6">
              {/* Payment Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">
                        Total Revenue
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {formatCurrency(totalRevenue)}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">
                        Completed Payments
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {
                          transactions.filter((t) => t.status === "completed")
                            .length
                        }
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">
                        Pending Payments
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {
                          transactions.filter((t) => t.status === "pending")
                            .length
                        }
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-yellow-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* User Payment Summary Table */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    User Payment Summary
                  </h3>
                  <p className="text-sm text-gray-600">
                    Overview of payment totals per user
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total Payments
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Transactions Count
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Pending Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Wallet Balance
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users
                        .sort((a, b) => {
                          const aPayments = getUserPaymentSummary(
                            a.id
                          ).totalPayments;
                          const bPayments = getUserPaymentSummary(
                            b.id
                          ).totalPayments;
                          return bPayments - aPayments;
                        })
                        .map((user) => {
                          const paymentSummary = getUserPaymentSummary(user.id);
                          return (
                            <tr key={user.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                    <span className="text-xs font-medium text-blue-800">
                                      {user.firstName.charAt(0)}
                                      {user.lastName.charAt(0)}
                                    </span>
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium text-gray-900">
                                      {user.firstName} {user.lastName}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {user.email}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                  {formatCurrency(paymentSummary.totalPayments)}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {paymentSummary.totalTransactions}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div
                                  className={`text-sm font-medium ${
                                    paymentSummary.pendingAmount > 0
                                      ? "text-yellow-600"
                                      : "text-gray-400"
                                  }`}
                                >
                                  {formatCurrency(paymentSummary.pendingAmount)}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                  {formatCurrency(user.walletBalance)}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
