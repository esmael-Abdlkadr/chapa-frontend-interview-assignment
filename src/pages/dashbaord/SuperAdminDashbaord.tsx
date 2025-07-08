import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import DashboardLayout from "../../components/layout/DashboardLayout";
import SystemStat from "../../components/dashbaord/SystemStat";
import UserManagment from "../../components/dashbaord/UserManagment";
import {
  Users,
  Shield,
  BarChart3,
  Settings,
  TrendingUp,
  Activity,
  CreditCard,
  Crown,
  Zap,
} from "lucide-react";

const SuperAdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  // Debug log to see what role we're getting
  console.log("Current user:", user);
  console.log("User role:", user?.role);

  if (!user || user.role !== "superadmin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Access Denied
          </h2>
          <p className="text-gray-600">
            You don't have permission to access this page.
          </p>
          {/* Debug info - remove in production */}
          <div className="mt-4 p-4 bg-gray-100 rounded-lg text-left">
            <p className="text-sm text-gray-700">Debug Info:</p>
            <p className="text-xs text-gray-600">
              User: {user ? "Logged in" : "Not logged in"}
            </p>
            <p className="text-xs text-gray-600">
              Role: {user?.role || "No role"}
            </p>
            <p className="text-xs text-gray-600">Expected: superadmin</p>
          </div>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <>
            {/* Quick Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <QuickStatCard
                title="Total Users"
                value="20"
                change="+2 this week"
                icon={Users}
                color="blue"
              />
              <QuickStatCard
                title="Active Admins"
                value="6"
                change="All active"
                icon={Shield}
                color="green"
              />
              <QuickStatCard
                title="Total Transactions"
                value="1,247"
                change="+15% this month"
                icon={CreditCard}
                color="purple"
              />
              <QuickStatCard
                title="System Uptime"
                value="99.9%"
                change="Last 30 days"
                icon={Zap}
                color="orange"
              />
            </div>
            <div className="mt-6">
              <SystemStat />
            </div>
          </>
        );
      case "users":
        return <UserManagment />;
      case "admins":
        return <AdminManagement />;
      case "analytics":
        return <AnalyticsDashboard />;
      case "settings":
        return <SystemSettings />;
      default:
        return <SystemStat />;
    }
  };

  return (
    <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </DashboardLayout>
  );
};

// Quick Stats Card Component
const QuickStatCard: React.FC<{
  title: string;
  value: string;
  change: string;
  icon: React.ComponentType<{ className?: string }>;
  color: "blue" | "green" | "purple" | "orange";
}> = ({ title, value, change, icon: Icon, color }) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 border-blue-200",
    green: "bg-green-50 text-green-600 border-green-200",
    purple: "bg-purple-50 text-purple-600 border-purple-200",
    orange: "bg-orange-50 text-orange-600 border-orange-200",
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-xs text-gray-500 mt-1">{change}</p>
        </div>
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[color]}`}
        >
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

// Placeholder components for different sections
const AdminManagement: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Admin Management
      </h2>
      <p className="text-gray-600">
        Admin management functionality will be implemented here.
      </p>
    </div>
  );
};

const AnalyticsDashboard: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Analytics Dashboard
      </h2>
      <p className="text-gray-600">
        Advanced analytics and reporting will be implemented here.
      </p>
    </div>
  );
};

const SystemSettings: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        System Settings
      </h2>
      <p className="text-gray-600">
        System configuration options will be implemented here.
      </p>
    </div>
  );
};

export default SuperAdminDashboard;
