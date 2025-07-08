import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import DashboardLayout from "../../components/layout/DashboardLayout";
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
  CheckCircle,
  Database,
  Server,
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

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "users", label: "User Management", icon: Users },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
    { id: "settings", label: "System Settings", icon: Settings },
  ];

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">20</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                +2 this week
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
              <p className="text-sm text-gray-600 mb-1">Active Admins</p>
              <p className="text-2xl font-bold text-gray-900">6</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <CheckCircle className="w-4 h-4 mr-1" />
                All active
              </p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Transactions</p>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                +15% this month
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
              <p className="text-sm text-gray-600 mb-1">System Uptime</p>
              <p className="text-2xl font-bold text-gray-900">99.9%</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <Activity className="w-4 h-4 mr-1" />
                Last 30 days
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <Database className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Database</p>
              <p className="text-sm text-green-600">Healthy</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Server className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">API Server</p>
              <p className="text-sm text-blue-600">Running</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Security</p>
              <p className="text-sm text-purple-600">Protected</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return renderOverview();
      case "users":
        return <UserManagment />;
      case "analytics":
        return <AnalyticsDashboard />;
      case "settings":
        return <SystemSettings />;
      default:
        return renderOverview();
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <Crown className="w-5 h-5 text-purple-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">
                Super Admin Dashboard
              </h1>
            </div>
            <p className="text-gray-600">
              Complete system control and management
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.id
                          ? "border-purple-500 text-purple-600"
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

          {/* Content */}
          {renderContent()}
        </div>
      </div>
    </DashboardLayout>
  );
};

// Placeholder components for different sections
const AnalyticsDashboard: React.FC = () => {
  return (
    <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
      <div className="text-center">
        <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Analytics Dashboard
        </h2>
        <p className="text-gray-600">
          Advanced analytics and reporting features coming soon
        </p>
      </div>
    </div>
  );
};

const SystemSettings: React.FC = () => {
  return (
    <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
      <div className="text-center">
        <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          System Settings
        </h2>
        <p className="text-gray-600">
          System configuration and settings panel coming soon
        </p>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
