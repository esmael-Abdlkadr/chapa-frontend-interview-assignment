import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import {
  Wallet,
  Home,
  Send,
  Download,
  CreditCard,
  PieChart,
  Settings,
  Bell,
  LogOut,
  Menu,
  X,
  User,
  FileText,
  HelpCircle,
  Shield,
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  activeTab,
  onTabChange,
}) => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications] = useState(3);

  const navigation = [
    { name: "Dashboard", icon: Home, key: "dashboard", route: "/" },
    {
      name: "Send Money",
      icon: Send,
      key: "send",
      route: "/dashboard/send-money",
    },
    { name: "Request Payment", icon: Download, key: "request", route: "/" },
    { name: "My Cards", icon: CreditCard, key: "cards", route: "/" },
    { name: "Transactions", icon: FileText, key: "transactions", route: "/" },
    { name: "Analytics", icon: PieChart, key: "analytics", route: "/" },
  ];

  const secondaryNavigation = [
    { name: "Settings", icon: Settings, key: "settings" },
    { name: "Help & Support", icon: HelpCircle, key: "help" },
    { name: "Security", icon: Shield, key: "security" },
  ];

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
            <SidebarContent
              navigation={navigation}
              secondaryNavigation={secondaryNavigation}
              activeTab={activeTab}
              onTabChange={onTabChange}
              user={user}
              logout={logout}
            />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <SidebarContent
          navigation={navigation}
          secondaryNavigation={secondaryNavigation}
          activeTab={activeTab}
          onTabChange={onTabChange}
          user={user}
          logout={logout}
        />
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Top header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-4 sm:px-6">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#7DC400]"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="ml-4 lg:ml-0">
                <h1 className="text-xl font-semibold text-gray-900">
                  {navigation.find((nav) => nav.key === activeTab)?.name ||
                    "Dashboard"}
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-[#7DC400] rounded-full flex items-center justify-center text-white font-semibold">
                  {user.firstName.charAt(0)}
                  {user.lastName.charAt(0)}
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-gray-500">{user.role}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6">{children}</div>
        </main>
      </div>
    </div>
  );
};

interface SidebarContentProps {
  navigation: Array<{ name: string; icon: any; key: string }>;
  secondaryNavigation: Array<{ name: string; icon: any; key: string }>;
  activeTab: string;
  route?: string;
  onTabChange: (tab: string) => void;
  user: any;
  logout: () => void;
}

const SidebarContent: React.FC<SidebarContentProps> = ({
  navigation,
  secondaryNavigation,
  activeTab,
  onTabChange,
  user,
  logout,
}) => {
  return (
    <div className="flex flex-col flex-1 min-h-0 bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="flex items-center flex-shrink-0 px-4 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-[#7DC400] rounded-lg flex items-center justify-center">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Chapa</h1>
            <p className="text-xs text-gray-500">Financial Technology</p>
          </div>
        </div>
      </div>

      {/* User info */}
      <div className="px-4 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-[#7DC400] rounded-full flex items-center justify-center text-white font-semibold">
            {user.firstName.charAt(0)}
            {user.lastName.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.key}
              onClick={() => onTabChange(item.key)}
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full transition-colors ${
                activeTab === item.key
                  ? "bg-[#555a4c] text-white"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
              {item.name}
            </button>
          );
        })}
      </nav>

      {/* Secondary navigation */}
      <div className="px-4 py-4 border-t border-gray-200">
        <div className="space-y-1">
          {secondaryNavigation.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                onClick={() => onTabChange(item.key)}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full transition-colors ${
                  activeTab === item.key
                    ? "bg-[#7DC400] text-white"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {item.name}
              </button>
            );
          })}
        </div>

        {/* Logout button */}
        <button
          onClick={logout}
          className="mt-4 group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5 flex-shrink-0" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default DashboardLayout;
