import React from "react";
import { X, ChevronRight } from "lucide-react";

interface RecentTransaction {
  id: string;
  recipient: string;
  amount: number;
  date: string;
}

interface RecentTransactionsModalProps {
  isOpen: boolean;
  transactions: RecentTransaction[];
  onSelectTransaction: (transaction: RecentTransaction) => void;
  onClose: () => void;
  formatCurrency: (amount: number) => string;
}

const RecentTransactionsModal: React.FC<RecentTransactionsModalProps> = ({
  isOpen,
  transactions,
  onSelectTransaction,
  onClose,
  formatCurrency,
}) => {
  if (!isOpen) return null;

  return (
    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 animate-in slide-in-from-top-2 duration-300">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-gray-900">Recent Transactions</h4>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-200 rounded transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-2">
        {transactions.map((transaction) => (
          <button
            key={transaction.id}
            type="button"
            onClick={() => onSelectTransaction(transaction)}
            className="w-full flex items-center justify-between p-3 hover:bg-white rounded-xl transition-colors text-left"
          >
            <div>
              <p className="font-medium text-gray-900">
                {transaction.recipient}
              </p>
              <p className="text-sm text-gray-500">{transaction.date}</p>
            </div>
            <div className="text-right flex items-center space-x-2">
              <div>
                <p className="font-semibold text-gray-900">
                  {formatCurrency(transaction.amount)}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </button>
        ))}

        {transactions.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No recent transactions</p>
            <p className="text-sm">Your recent transfers will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentTransactionsModal;
