import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import UserManagment from "../../components/dashbaord/UserManagment";
import { useAuth } from "../../hooks/useAuth";

const AdminManagementPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
          <p className="text-gray-600">
            Manage system users, permissions, and roles
          </p>
        </div>

        <UserManagment />
      </div>
    </DashboardLayout>
  );
};

export default AdminManagementPage;
