import React from "react";
import {
  X,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  Copy,
  Download,
  ArrowDownLeft,
  Coffee,
  ShoppingBag,
  Zap,
  Building,
  Car,
  Smartphone,
  CreditCard,
  Wallet,
  Phone,
  MapPin,
} from "lucide-react";
import type { Transaction } from "../../services/mockAPi";

interface TransactionDetailsModalProps {
  transaction: Transaction | null;
  isOpen: boolean;
  onClose: () => void;
}

const TransactionDetailsModal: React.FC<TransactionDetailsModalProps> = ({
  transaction,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !transaction) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-ET", {
      style: "currency",
      currency: "ETB",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const getTransactionIcon = (category: string) => {
    const iconMap = {
      income: ArrowDownLeft,
      food: Coffee,
      shopping: ShoppingBag,
      utilities: Zap,
      transport: Car,
      mobile: Smartphone,
      default: Building,
    };
    return iconMap[category as keyof typeof iconMap] || iconMap.default;
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-[#7DC400] bg-green-50 border-green-200";
      case "pending":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "failed":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case "card":
        return <CreditCard className="w-4 h-4" />;
      case "chapa_wallet":
        return <Wallet className="w-4 h-4" />;
      case "mobile_money":
        return <Phone className="w-4 h-4" />;
      case "bank_transfer":
        return <Building className="w-4 h-4" />;
      default:
        return <Building className="w-4 h-4" />;
    }
  };

  const IconComponent = getTransactionIcon(transaction.category);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Transaction Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="text-center">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                transaction.type === "income"
                  ? "bg-[#7DC400]/10 text-[#7DC400]"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              <IconComponent className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {transaction.description}
            </h3>
            <div
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                transaction.status
              )}`}
            >
              {getStatusIcon(transaction.status)}
              <span className="ml-2 capitalize">{transaction.status}</span>
            </div>
          </div>

          {/* Amount */}
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">Amount</p>
            <p
              className={`text-3xl font-bold ${
                transaction.type === "income"
                  ? "text-[#7DC400]"
                  : "text-gray-900"
              }`}
            >
              {transaction.type === "income" ? "+" : "-"}
              {formatCurrency(transaction.amount)}
            </p>
            {transaction.fee && (
              <p className="text-sm text-gray-500 mt-1">
                Fee: {formatCurrency(transaction.fee)}
              </p>
            )}
          </div>

          {/* Transaction Details */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Transaction ID</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-900">
                  {transaction.id}
                </span>
                <button
                  onClick={() => copyToClipboard(transaction.id)}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Date & Time</span>
              <span className="text-sm font-medium text-gray-900">
                {new Date(transaction.date).toLocaleDateString("en-ET", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                at {new Date(transaction.date).toLocaleTimeString("en-ET", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Payment Method</span>
              <div className="flex items-center space-x-2">
                {getMethodIcon(transaction.method)}
                <span className="text-sm font-medium text-gray-900 capitalize">
                  {transaction.method.replace("_", " ")}
                </span>
              </div>
            </div>

            {transaction.recipient && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Recipient</span>
                <span className="text-sm font-medium text-gray-900">
                  {transaction.recipient}
                </span>
              </div>
            )}

            {transaction.sender && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Sender</span>
                <span className="text-sm font-medium text-gray-900">
                  {transaction.sender}
                </span>
              </div>
            )}

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Category</span>
              <span className="text-sm font-medium text-gray-900 capitalize">
                {transaction.category}
              </span>
            </div>

            {transaction.reference && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Reference</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">
                    {transaction.reference}
                  </span>
                  <button
                    onClick={() => copyToClipboard(transaction.reference!)}
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-200 space-y-3">
          <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-[#7DC400] text-white rounded-lg hover:bg-[#6ab300] transition-colors">
            <Download className="w-4 h-4" />
            <span>Download Receipt</span>
          </button>
          <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <MapPin className="w-4 h-4" />
            <span>Report Issue</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetailsModal;
