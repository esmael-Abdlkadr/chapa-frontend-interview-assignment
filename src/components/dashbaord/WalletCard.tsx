import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  TrendingUp,
  ArrowDownLeft,
  ArrowUpRight,
  Activity,
  Shield,
} from "lucide-react";

const WalletCard: React.FC = () => {
  const [balanceVisible, setBalanceVisible] = useState(true);

  const stats = {
    totalBalance: 125450.75,
    monthlyInflow: 87230.5,
    monthlyOutflow: 42180.25,
    totalTransactions: 847,
    successRate: 99.8,
    avgTransactionValue: 2840.3,
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-ET", {
      style: "currency",
      currency: "ETB",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-[#7DC400] via-green-500 to-emerald-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
      <div className="relative bg-gradient-to-r from-[#7DC400] to-green-600 rounded-3xl p-8 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#7DC400]/90 to-green-600/90"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-white/80 text-sm font-medium">Total Balance</p>
              <div className="flex items-center space-x-3">
                <h3 className="text-3xl font-bold">
                  {balanceVisible
                    ? formatCurrency(stats.totalBalance)
                    : "••••••••"}
                </h3>
                <button
                  onClick={() => setBalanceVisible(!balanceVisible)}
                  className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                >
                  {balanceVisible ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white/80 text-sm">This Month</p>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-green-300" />
                <span className="text-lg font-semibold">+12.5%</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center space-x-2 mb-2">
                <ArrowDownLeft className="w-4 h-4 text-green-300" />
                <span className="text-xs text-white/80">Income</span>
              </div>
              <p className="text-lg font-semibold">
                {formatCurrency(stats.monthlyInflow)}
              </p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center space-x-2 mb-2">
                <ArrowUpRight className="w-4 h-4 text-red-300" />
                <span className="text-xs text-white/80">Expenses</span>
              </div>
              <p className="text-lg font-semibold">
                {formatCurrency(stats.monthlyOutflow)}
              </p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center space-x-2 mb-2">
                <Activity className="w-4 h-4 text-blue-300" />
                <span className="text-xs text-white/80">Transactions</span>
              </div>
              <p className="text-lg font-semibold">{stats.totalTransactions}</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="w-4 h-4 text-purple-300" />
                <span className="text-xs text-white/80">Success Rate</span>
              </div>
              <p className="text-lg font-semibold">{stats.successRate}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletCard;
