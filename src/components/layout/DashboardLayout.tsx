import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import {
  Home,
  Send,
  Download,
  PieChart,
  Settings,
  Bell,
  Menu,
  X,
  User,
  FileText,
  HelpCircle,
  Shield,
  Users,
  BarChart3,
  TrendingUp,
  Crown,
  Database,
} from "lucide-react";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  activeTab = "dashboard",
  onTabChange = () => {},
}) => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications] = useState(3);

  const getNavigation = () => {
    if (!user) return { mainNav: [], secondaryNav: [] };

    if (user.role === "user") {
      return {
        mainNav: [
          {
            name: "Dashboard",
            icon: Home,
            key: "dashboard",
            route: "/dashboard",
          },
          {
            name: "Send Money",
            icon: Send,
            key: "send",
            route: "/dashboard/send-money",
          },
          {
            name: "Request Payment",
            icon: Download,
            key: "request",
            route: "/dashboard/request",
          },
      
          {
            name: "My transactions",
            icon: FileText,
            key: "transactions",
            route: "/dashboard/transactions",
          },
          {
            name: "My Analytics",
            icon: PieChart,
            key: "analytics",
            route: "/dashboard/analytics",
          },
        ],
        secondaryNav: [
          {
            name: "Settings",
            icon: Settings,
            key: "settings",
            route: "/dashboard/settings",
          },
          {
            name: "Help & Support",
            icon: HelpCircle,
            key: "help",
            route: "/dashboard/help",
          },
          {
            name: "Security",
            icon: Shield,
            key: "security",
            route: "/dashboard/security",
          },
        ],
        roleIcon: <User className="w-5 h-5 text-white" />,
        roleLabel: "User",
        roleDescription: "Manage your finances",
      };
    }


    if (user.role === "admin") {
      return {
        mainNav: [
          { name: "Dashboard", icon: Home, key: "dashboard", route: "/admin" },
          {
            name: "User Management",
            icon: Users,
            key: "users",
            route: "/admin/manage-users",
          },
          {
            name: "Transactions",
            icon: FileText,
            key: "transactions",
            route: "/dashboard/transactions",
          },
          {
            name: "Analytics",
            icon: PieChart,
            key: "analytics",
            route: "/admin/analytics",
          },
        ],
        secondaryNav: [
          {
            name: "Settings",
            icon: Settings,
            key: "settings",
            route: "/admin/settings",
          },
          {
            name: "System Logs",
            icon: Database,
            key: "logs",
            route: "/admin/logs",
          },
          {
            name: "Security",
            icon: Shield,
            key: "security",
            route: "/admin/security",
          },
        ],
        roleIcon: <Shield className="w-5 h-5 text-white" />,
        roleLabel: "Admin",
        roleDescription: "System management tools",
      };
    }


    if (user.role === "superadmin") {
      return {
        mainNav: [
          {
            name: "System Overview",
            icon: BarChart3,
            key: "overview",
            route: "/super-admin",
          },
          {
            name: "User Management",
            icon: Users,
            key: "users",
            route: "/admin/manage-users",
          },
       
          {
            name: "Transactions",
            icon: FileText,
            key: "transactions",
            route: "/dashboard/transactions",
          },
          {
            name: "Analytics",
            icon: TrendingUp,
            key: "analytics",
            route: "/super-admin/analytics",
          },
          {
            name: "Settings",
            icon: Settings,
            key: "settings",
            route: "/super-admin/settings",
          },
        ],
        secondaryNav: [
          {
            name: "System Config",
            icon: Database,
            key: "config",
            route: "/super-admin/config",
          },
          {
            name: "Security",
            icon: Shield,
            key: "security",
            route: "/super-admin/security",
          },
        ],
        roleIcon: <Crown className="w-5 h-5 text-white" />,
        roleLabel: "Super Admin",
        roleDescription: "Full system control",
      };
    }

    return {
      mainNav: [
        { name: "Dashboard", icon: Home, key: "dashboard", route: "/" },
      ],
      secondaryNav: [{ name: "Settings", icon: Settings, key: "settings" }],
      roleIcon: <User className="w-5 h-5 text-white" />,
      roleLabel: "User",
      roleDescription: "",
    };
  };

  const brandColors = {
    primary: "bg-[#7DC400]",
    primaryHover: "hover:bg-[#6BB000]",
    primaryActive: "bg-[#555a4c]",
    headerColor: "bg-gradient-to-r from-[#7DC400] to-[#6BB000]",
    roleIndicator: {
      user: "bg-[#7DC400]",
      admin: "bg-blue-600",
      superadmin: "bg-purple-600",
    },
  };

  const { mainNav, secondaryNav, roleIcon, roleLabel } = getNavigation();
  const roleColor =
    brandColors.roleIndicator[
      user?.role as keyof typeof brandColors.roleIndicator
    ] || brandColors.roleIndicator.user;

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 flex z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                onClick={() => setSidebarOpen(false)}
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
            <Sidebar
              navigation={mainNav}
              secondaryNavigation={secondaryNav}
              activeTab={activeTab}
              onTabChange={onTabChange}
              user={user}
              logout={logout}
              brandColors={brandColors}
              roleIcon={roleIcon}
              roleColor={roleColor}
            />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <Sidebar
          navigation={mainNav}
          secondaryNavigation={secondaryNav}
          activeTab={activeTab}
          onTabChange={onTabChange}
          user={user}
          logout={logout}
          brandColors={brandColors}
          roleIcon={roleIcon}
          roleColor={roleColor}
        />
      </div>

      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Top header */}
        <header
          className={`shadow-sm border-b border-gray-200 ${brandColors.headerColor} text-white`}
        >
          <div className="flex items-center justify-between px-4 py-4 sm:px-6">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-white hover:text-gray-200 hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="ml-4 lg:ml-0 flex items-center">
                <h1 className="text-xl font-semibold">{roleLabel} Dashboard</h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-white hover:text-gray-100 hover:bg-black/10 rounded-lg transition-colors">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
              <div className="flex items-center space-x-3">
                <div
                  className={`h-8 w-8 ${brandColors.primary} rounded-full flex items-center justify-center text-white font-semibold`}
                >
                  {user.firstName.charAt(0)}
                  {user.lastName.charAt(0)}
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-white">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-white/80 capitalize">
                    {roleLabel}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
