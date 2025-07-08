import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import DashboardLayout from "../../components/layout/DashboardLayout";
import UserManagment from "../../components/dashbaord/UserManagment";
import {
  mockAPI,
  type SystemStats,
  type User,
  type Transaction,
} from "../../services/mockAPi";
import { toastService } from "../../services/toastService";
import {
  Users,
  Shield,
  BarChart3,
  Settings,
  TrendingUp,
  CreditCard,
  Crown,
  Database,
  Server,
  DollarSign,
  RefreshCw,
  UserPlus,
  Download,
  Globe,
  Lock,
} from "lucide-react";

const SuperAdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [systemStats, setSystemStats] = useState<SystemStats | null>(null);
  const [recentUsers, setRecentUsers] = useState<User[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
    // Set up real-time updates every 30 seconds
    const interval = setInterval(loadDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadDashboardData = async () => {
    try {
      const [statsData, usersData, transactionsData] = await Promise.all([
        mockAPI.getSystemStats(),
        mockAPI.getUsers(),
        mockAPI.getTransactions(),
      ]);

      setSystemStats(statsData);
      setRecentUsers(usersData.slice(0, 5));
      setRecentTransactions(transactionsData.slice(0, 10));
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      toastService.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
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
    { id: "overview", label: "System Overview", icon: BarChart3 },
    { id: "users", label: "User & Admin Management", icon: Users },
    { id: "analytics", label: "Advanced Analytics", icon: TrendingUp },
    { id: "settings", label: "System Settings", icon: Settings },
  ];

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={systemStats?.totalUsers?.toString() || "0"}
          subtitle={`${systemStats?.activeUsers || 0} active`}
          change="+12% this month"
          trend="up"
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Total Revenue"
          value={formatCurrency(systemStats?.totalRevenue || 0)}
          subtitle="All transactions"
          change="+18% this month"
          trend="up"
          icon={DollarSign}
          color="green"
        />
        <StatCard
          title="Admin Users"
          value={systemStats?.totalAdmins?.toString() || "0"}
          subtitle={`${systemStats?.activeAdmins || 0} active`}
          change="No change"
          trend="up"
          icon={Shield}
          color="purple"
        />
        <StatCard
          title="Total Transactions"
          value={systemStats?.totalTransactions?.toString() || "0"}
          subtitle="All time"
          change="+25% this month"
          trend="up"
          icon={CreditCard}
          color="orange"
        />
      </div>

      {/* System Health & Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              System Health
            </h3>
            <button
              onClick={loadDashboardData}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            <HealthStatus icon={Database} label="Database" status="healthy" />
            <HealthStatus icon={Server} label="API Server" status="running" />
            <HealthStatus icon={Globe} label="CDN" status="optimal" />
            <HealthStatus icon={Lock} label="Security" status="protected" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Performance Metrics
          </h3>
          <div className="space-y-4">
            <MetricRow label="System Uptime" value="99.9%" color="green" />
            <MetricRow label="Response Time" value="180ms" color="green" />
            <MetricRow label="Success Rate" value="99.2%" color="green" />
            <MetricRow label="Error Rate" value="0.8%" color="yellow" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickActionCard
            icon={UserPlus}
            title="Add Admin"
            description="Create new admin user"
            onClick={() => setActiveTab("users")}
          />
          <QuickActionCard
            icon={Download}
            title="Export Data"
            description="Download system reports"
            onClick={() => toastService.info("Export feature coming soon")}
          />
          <QuickActionCard
            icon={Shield}
            title="Security Audit"
            description="Review security logs"
            onClick={() => toastService.info("Security audit coming soon")}
          />
          <QuickActionCard
            icon={Settings}
            title="System Config"
            description="Configure system settings"
            onClick={() => setActiveTab("settings")}
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Users
            </h3>
            <button
              onClick={() => setActiveTab("users")}
              className="text-sm text-purple-600 hover:text-purple-700 font-medium"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {recentUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {user.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Transactions
            </h3>
            <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {recentTransactions.slice(0, 5).map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      transaction.type === "income"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {transaction.description}
                    </p>
                    <p className="text-sm text-gray-500">
                      {transaction.reference}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-semibold ${
                      transaction.type === "income"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "-"}
                    {formatCurrency(transaction.amount)}
                  </p>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      transaction.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : transaction.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {transaction.status}
                  </span>
                </div>
              </div>
            ))}
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
        return <AdvancedAnalytics systemStats={systemStats} />;
      case "settings":
        return <SystemSettings />;
      default:
        return renderOverview();
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading Super Admin Dashboard...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Enhanced Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Crown className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Super Admin Dashboard
                  </h1>
                  <p className="text-gray-600">
                    Complete system control and management
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Last updated</p>
                  <p className="text-sm font-medium text-gray-900">
                    {systemStats?.lastUpdated
                      ? new Date(systemStats.lastUpdated).toLocaleTimeString()
                      : "--"}
                  </p>
                </div>
                <button
                  onClick={loadDashboardData}
                  className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  title="Refresh data"
                >
                  <RefreshCw className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
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

// Enhanced Components
const StatCard: React.FC<{
  title: string;
  value: string;
  subtitle: string;
  change: string;
  trend: "up" | "down";
  icon: React.ComponentType<{ className?: string }>;
  color: "green" | "blue" | "purple" | "orange";
}> = ({ title, value, subtitle, change, trend, icon: Icon, color }) => {
  const colorClasses = {
    green: "bg-green-50 text-green-600 border-green-200",
    blue: "bg-blue-50 text-blue-600 border-blue-200",
    purple: "bg-purple-50 text-purple-600 border-purple-200",
    orange: "bg-orange-50 text-orange-600 border-orange-200",
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[color]}`}
        >
          <Icon className="w-6 h-6" />
        </div>
        <div
          className={`flex items-center text-sm ${
            trend === "up" ? "text-green-600" : "text-red-600"
          }`}
        >
          <TrendingUp className="w-4 h-4 mr-1" />
          {change}
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-600 mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
};

const HealthStatus: React.FC<{
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  status: string;
}> = ({ icon: Icon, label, status }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "healthy":
      case "running":
      case "optimal":
      case "protected":
        return "text-green-600 bg-green-50";
      case "warning":
        return "text-yellow-600 bg-yellow-50";
      case "error":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center ${getStatusColor(
            status
          )}`}
        >
          <Icon className="w-4 h-4" />
        </div>
        <span className="font-medium text-gray-900">{label}</span>
      </div>
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(
          status
        )}`}
      >
        {status}
      </span>
    </div>
  );
};

const MetricRow: React.FC<{
  label: string;
  value: string;
  color: "green" | "yellow" | "red";
}> = ({ label, value, color }) => {
  const colorClasses = {
    green: "text-green-600",
    yellow: "text-yellow-600",
    red: "text-red-600",
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-600">{label}</span>
      <span className={`font-semibold ${colorClasses[color]}`}>{value}</span>
    </div>
  );
};

const QuickActionCard: React.FC<{
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  onClick: () => void;
}> = ({ icon: Icon, title, description, onClick }) => (
  <button
    onClick={onClick}
    className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all duration-200 text-left group"
  >
    <div className="flex flex-col items-center text-center space-y-2">
      <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center group-hover:bg-purple-100 transition-colors">
        <Icon className="w-5 h-5 text-purple-600" />
      </div>
      <div>
        <h4 className="font-medium text-gray-900">{title}</h4>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
    </div>
  </button>
);

// Placeholder components for different sections
const AdvancedAnalytics: React.FC<{ systemStats: SystemStats | null }> = ({
  systemStats,
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
        <div className="text-center mb-8">
          <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Advanced Analytics Dashboard
          </h2>
          <p className="text-gray-600">
            Comprehensive analytics and reporting features
          </p>
        </div>

        {systemStats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">
                {systemStats.totalUsers}
              </p>
              <p className="text-sm text-gray-600">Total Users</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">
                {(
                  (systemStats.activeUsers / systemStats.totalUsers) *
                  100
                ).toFixed(1)}
                %
              </p>
              <p className="text-sm text-gray-600">User Activity Rate</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">
                {systemStats.totalTransactions}
              </p>
              <p className="text-sm text-gray-600">Total Transactions</p>
            </div>
          </div>
        )}
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
        <p className="text-gray-600 mb-6">
          System configuration and settings panel
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">
              Security Settings
            </h3>
            <p className="text-sm text-gray-600">
              Configure authentication, authorization, and security policies
            </p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">
              Payment Configuration
            </h3>
            <p className="text-sm text-gray-600">
              Manage payment gateways, fees, and transaction limits
            </p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">
              System Maintenance
            </h3>
            <p className="text-sm text-gray-600">
              Schedule maintenance, backups, and system updates
            </p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">API Management</h3>
            <p className="text-sm text-gray-600">
              Configure API endpoints, rate limits, and access controls
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
