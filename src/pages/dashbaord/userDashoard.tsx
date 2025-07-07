import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import DashboardLayout from "../../components/layout/DashboardLayout";
import WalletCard from "../../components/dashbaord/WalletCard";
import TransactionList from "../../components/dashbaord/TransactionList";
import { Send, Download, QrCode, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  if (!user) return null;

  const quickActions = [
    {
      icon: Send,
      label: "Send Money",
      description: "Transfer funds instantly",
      gradient: "from-[#7DC400] to-green-600",
      onClick: () => navigate("/dashboard/send-money"),
    },
    {
      icon: Download,
      label: "Request Payment",
      description: "Generate payment link",
      gradient: "from-blue-500 to-blue-600",
      onClick: () => console.log("Request payment"),
    },
    {
      icon: QrCode,
      label: "QR Pay",
      description: "Scan to pay or receive",
      gradient: "from-purple-500 to-purple-600",
      onClick: () => console.log("QR Pay"),
    },
    {
      icon: CreditCard,
      label: "Top Up",
      description: "Add funds to wallet",
      gradient: "from-orange-500 to-orange-600",
      onClick: () => console.log("Top up"),
    },
  ];

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <DashboardLayout activeTab={activeTab} onTabChange={handleTabChange}>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Good{" "}
              {new Date().getHours() < 12
                ? "morning"
                : new Date().getHours() < 18
                ? "afternoon"
                : "evening"}
              , {user.firstName}
            </h2>
            <p className="text-gray-600">
              Here's what's happening with your finances today
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm text-gray-500">Account Status</p>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#7DC400] rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-[#7DC400]">
                  Active & Verified
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Wallet Card */}
        <WalletCard />

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Quick Actions
            </h3>
            <button className="text-sm text-[#7DC400] hover:text-green-600 font-medium">
              View All
            </button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                className={`group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${action.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-200`}
                ></div>
                <div className="relative z-10">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${action.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}
                  >
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {action.label}
                  </h4>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <TransactionList />
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
