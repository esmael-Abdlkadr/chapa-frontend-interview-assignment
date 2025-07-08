import React from "react";
import { Send, TrendingUp, Eye, EyeOff } from "lucide-react";

interface SendMoneyHeaderProps {
  balance: number;
  showBalance: boolean;
  onToggleBalance: () => void;
  formatCurrency: (amount: number) => string;
}

const SendMoneyHeader: React.FC<SendMoneyHeaderProps> = ({
  balance,
  showBalance,
  onToggleBalance,
  formatCurrency,
}) => {
  return (
    <div className="bg-gradient-to-br from-[#7DC400] via-green-500 to-emerald-600 p-6 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

      <div className="relative z-10">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <Send className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold">Send Money</h3>
            <p className="text-green-100">Transfer funds instantly</p>
          </div>
        </div>

        <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Available Balance</p>
              <div className="flex items-center space-x-2">
                <p className="text-2xl font-bold">
                  {showBalance ? formatCurrency(balance) : "••••••"}
                </p>
                <button
                  onClick={onToggleBalance}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                >
                  {showBalance ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            <TrendingUp className="w-8 h-8 text-green-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMoneyHeader;
