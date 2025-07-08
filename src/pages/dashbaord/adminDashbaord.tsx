import React from "react";
import { Link } from "react-router-dom";
import {
  Users,
  BarChart3,
  Settings,
  Shield,
  Activity,
  TrendingUp,
  Clock,
  CheckCircle,
} from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import TransactionList from "../../components/dashbaord/TransactionList";

const AdminDashboard: React.FC = () => {
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

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Active Users</p>
                  <p className="text-2xl font-bold text-gray-900">1,234</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +12.5%
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
                  <p className="text-sm text-gray-600 mb-1">Transactions</p>
                  <p className="text-2xl font-bold text-gray-900">45,678</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +8.3%
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Response Time</p>
                  <p className="text-2xl font-bold text-gray-900">280ms</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <Clock className="w-4 h-4 mr-1" />
                    Optimal
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                  <Activity className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">System Health</p>
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
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
