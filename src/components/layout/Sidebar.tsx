import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";

interface SidebarProps {
  navigation: Array<{ name: string; icon: any; key: string; route?: string }>;
  secondaryNavigation: Array<{
    name: string;
    icon: any;
    key: string;
    route?: string;
  }>;
  activeTab: string;
  onTabChange: (tab: string) => void;
  user: any;
  logout: () => void;
  brandColors: any;
  roleIcon: React.ReactNode;
  roleColor: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  navigation,
  secondaryNavigation,
  logout,
  brandColors,
}) => {
  const location = useLocation();

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="flex items-center flex-shrink-0 px-4 py-4 border-b border-gray-200">
        <Link className="flex items-center space-x-3" to={"/"}>
          <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
            <img src="/logo.jpeg" className="w-6 h-6" alt="Logo" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-green-400">Chapa</h1>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.route;
          return (
            <Link
              key={item.key}
              to={item.route || "#"}
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full transition-colors ${
                isActive
                  ? brandColors.primaryActive + " text-white"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Secondary navigation */}
      <div className="px-4 py-4 border-t border-gray-200">
        <div className="space-y-1">
          {secondaryNavigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.route;
            return (
              <Link
                key={item.key}
                to={item.route || "#"}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full transition-colors ${
                  isActive
                    ? brandColors.primaryActive + " text-white"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {item.name}
              </Link>
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

export default Sidebar;
