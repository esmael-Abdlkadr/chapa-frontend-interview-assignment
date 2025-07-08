import React from "react";
import { Hash, Calendar, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";

interface TransactionSummaryCardProps {
  transaction: {
    id: string;
    date: string;
    time: string;
    amount: number;
    type: string;
    description: string;
    status: string;
    category: string;
  };
  formatCurrency: (amount: number) => string;
  getTransactionIcon: (category: string) => React.ElementType;
}

const TransactionSummaryCard: React.FC<TransactionSummaryCardProps> = ({
  transaction,
  formatCurrency,
  getTransactionIcon,
}) => {
  const IconComponent = getTransactionIcon(transaction.category);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-[#7DC400] bg-green-50";
      case "pending":
        return "text-yellow-600 bg-yellow-50";
      case "failed":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-[#7DC400]" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "failed":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div
            className={`w-16 h-16 rounded-xl flex items-center justify-center ${
              transaction.type === "income"
                ? "bg-[#7DC400]/10 text-[#7DC400]"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            <IconComponent className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">
              {transaction.description}
            </h2>
            <div className="flex items-center gap-3 text-gray-500 text-sm">
              <div className="flex items-center gap-1">
                <Hash className="w-4 h-4" />
                <span>{transaction.id}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(transaction.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{transaction.time}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <div
            className={`text-2xl font-bold mb-2 ${
              transaction.type === "income"
                ? "text-[#7DC400]"
                : "text-gray-900"
            }`}
          >
            {transaction.type === "income" ? "+" : "-"}
            {formatCurrency(transaction.amount)}
          </div>
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
              transaction.status
            )}`}
          >
            {getStatusIcon(transaction.status)}
            <span className="ml-2 capitalize">{transaction.status}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TransactionSummaryCard;
