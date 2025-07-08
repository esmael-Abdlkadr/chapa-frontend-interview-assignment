import React from "react";
import { Link } from "react-router-dom";
import {
  UsersIcon,
  BarChart3Icon,
  SettingsIcon,
  ShieldIcon,
  ActivityIcon,
} from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import SystemStat from "../../components/dashbaord/SystemStat";
import TransactionList from "../../components/dashbaord/TransactionList";

const AdminDashboard: React.FC = () => {
  const adminFeatures = [
    {
      title: "User Management",
      description: "Manage system users, permissions and roles",
      icon: <UsersIcon className="w-8 h-8 text-purple-500" />,
      path: "/admin/manage-users",
      color: "bg-purple-50 border-purple-200",
    },
    {
      title: "Analytics",
      description: "View system statistics and reports",
      icon: <BarChart3Icon className="w-8 h-8 text-blue-500" />,
      path: "/admin/analytics",
      color: "bg-blue-50 border-blue-200",
    },
    {
      title: "System Settings",
      description: "Configure system parameters and settings",
      icon: <SettingsIcon className="w-8 h-8 text-green-500" />,
      path: "/admin/settings",
      color: "bg-green-50 border-green-200",
    },
    {
      title: "Security",
      description: "Manage security settings and audit logs",
      icon: <ShieldIcon className="w-8 h-8 text-red-500" />,
      path: "/admin/security",
      color: "bg-red-50 border-red-200",
    },
    {
      title: "Activity Logs",
      description: "View user activities and system events",
      icon: <ActivityIcon className="w-8 h-8 text-amber-500" />,
      path: "/admin/logs",
      color: "bg-amber-50 border-amber-200",
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600">Manage and monitor system activities</p>
        </div>

        {/* Admin Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <SystemStat
            title="Active Users"
            value="1,234"
            changePercent={12.5}
            isIncrease={true}
            icon={<UsersIcon className="w-5 h-5" />}
          />
          <SystemStat
            title="Transactions"
            value="45,678"
            changePercent={8.3}
            isIncrease={true}
            icon={<BarChart3Icon className="w-5 h-5" />}
          />
          <SystemStat
            title="Avg. Response Time"
            value="280ms"
            changePercent={5.2}
            isIncrease={false}
            icon={<ActivityIcon className="w-5 h-5" />}
          />
          <SystemStat
            title="System Health"
            value="98.7%"
            changePercent={0.2}
            isIncrease={true}
            icon={<ShieldIcon className="w-5 h-5" />}
          />
        </div>

        {/* Admin Features */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Admin Controls
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminFeatures.map((feature, index) => (
              <Link
                to={feature.path}
                key={index}
                className={`p-6 rounded-xl border ${feature.color} hover:shadow-md transition-shadow`}
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-white shadow-sm">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent System Activity */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Activity
          </h2>
          <TransactionList limit={5} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
