import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import useTransaction from "../../hooks/useTransaction";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  Download,
  ArrowDownLeft,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  Coffee,
  ShoppingBag,
  Zap,
  Building,
  Car,
  Smartphone,
  Eye,
} from "lucide-react";

import type { Transaction as ApiTransaction } from "../../services/mockAPi";

type Transaction = ApiTransaction & { time?: string; balance?: number };
import TransactionDetailsModal from "./TransactionDetailsModal";

interface TransactionListProps {
  limit?: number;
}

const TransactionList: React.FC<TransactionListProps> = ({ limit }) => {
  const { user } = useAuth();
  const { transactions } = useTransaction();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  console.log("transaction", transactions);

  const handleViewDetails = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

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
        return <CheckCircle className="w-4 h-4 text-[#7DC400]" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

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

  // Mock transactions  fro user
  const mockTransactions: Transaction[] = [
    {
      id: "mock-1",
      userId: user?.id || "",
      amount: 2500.00,
      type: "income",
      status: "completed",
      description: "Salary Payment",
      category: "income",
      method: "bank_transfer",
      recipient: "Your Account",
      sender: "ABC Company Ltd",
      date: new Date().toISOString(),
      time: "09:30 AM",
      reference: "SAL001",
      fee: 0,
    },
    {
      id: "mock-2",
      userId: user?.id || "",
      amount: 450.50,
      type: "expense",
      status: "completed",
      description: "Grocery Shopping",
      category: "shopping",
      method: "chapa_wallet",
      recipient: "SuperMarket ABC",
      sender: "Your Account",
      date: new Date(Date.now() - 86400000).toISOString(), 
      time: "02:15 PM",
      reference: "GRC002",
      fee: 5.50,
    },
    {
      id: "mock-3",
      userId: user?.id || "",
      amount: 150.00,
      type: "expense",
      status: "completed",
      description: "Mobile Top-up",
      category: "mobile",
      method: "mobile_money",
      recipient: "Ethio Telecom",
      sender: "Your Account",
      date: new Date(Date.now() - 172800000).toISOString(), 
      time: "11:45 AM",
      reference: "MOB003",
      fee: 2.00,
    },
    {
      id: "mock-4",
      userId: user?.id || "",
      amount: 800.00,
      type: "expense",
      status: "pending",
      description: "Electricity Bill",
      category: "utilities",
      method: "bank_transfer",
      recipient: "Ethiopian Electric Utility",
      sender: "Your Account",
      date: new Date(Date.now() - 259200000).toISOString(), 
      time: "04:20 PM",
      reference: "ELC004",
      fee: 10.00,
    },
    {
      id: "mock-5",
      userId: user?.id || "",
      amount: 1200.00,
      type: "income",
      status: "completed",
      description: "Freelance Payment",
      category: "income",
      method: "chapa_wallet",
      recipient: "Your Account",
      sender: "Client XYZ",
      date: new Date(Date.now() - 345600000).toISOString(), 
      time: "10:00 AM",
      reference: "FRL005",
      fee: 0,
    },
    {
      id: "mock-6",
      userId: user?.id || "",
      amount: 75.00,
      type: "expense",
      status: "failed",
      description: "Coffee Shop",
      category: "food",
      method: "mobile_money",
      recipient: "Tomoca Coffee",
      sender: "Your Account",
      date: new Date(Date.now() - 432000000).toISOString(),
      time: "08:30 AM",
      reference: "COF006",
      fee: 1.50,
    },
  ];

  const filteredTransactions = (() => {
    let transactionsToFilter: Transaction[] = [];

    if (user?.role === "user") {
      const userTransactions = transactions?.filter((transaction: Transaction) => 
        transaction.userId === user.id
      ) || [];
      
      transactionsToFilter = userTransactions.length > 0 ? userTransactions : mockTransactions;
    } else {
      transactionsToFilter = transactions || [];
    }

    return transactionsToFilter
      .filter((transaction: Transaction) => {
        const matchesSearch =
          transaction.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (transaction.recipient &&
            transaction.recipient
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (transaction.sender &&
            transaction.sender
              .toLowerCase()
              .includes(searchTerm.toLowerCase()));

        const matchesFilter =
          selectedFilter === "all" ||
          transaction.type === selectedFilter ||
          transaction.status === selectedFilter;

        return matchesSearch && matchesFilter;
      })
      .slice(0, limit); 
  })();

  const filters = [
    { value: "all", label: "All Transactions" },
    { value: "income", label: "Income" },
    { value: "expense", label: "Expenses" },
    { value: "completed", label: "Completed" },
    { value: "pending", label: "Pending" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {limit
              ? `Recent Transactions (Last ${limit})`
              : "Recent Transactions"}
          </h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 text-gray-500 hover:text-[#7DC400] hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Filter className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-[#7DC400] hover:bg-gray-50 rounded-lg transition-colors">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7DC400] focus:border-transparent"
          />
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="flex flex-wrap gap-2 mb-4">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setSelectedFilter(filter.value)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedFilter === filter.value
                    ? "bg-[#7DC400] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Transaction List */}
      <div className="divide-y divide-gray-100">
        {filteredTransactions.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-gray-500">No transactions found</p>
            <p className="text-sm text-gray-400">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          filteredTransactions.map((transaction: Transaction) => {
            const IconComponent = getTransactionIcon(transaction.category);
            return (
              <div
                key={transaction.id}
                className="p-4 hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        transaction.type === "income"
                          ? "bg-[#7DC400]/10 text-[#7DC400]"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {transaction.description}
                      </h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>
                          {transaction.recipient || transaction.sender}
                        </span>
                        <span>•</span>
                        <span>{transaction.time}</span>
                        <span>•</span>
                        <span className="capitalize">
                          {transaction.method.replace("_", " ")}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`font-semibold ${
                          transaction.type === "income"
                            ? "text-[#7DC400]"
                            : "text-gray-900"
                        }`}
                      >
                        {transaction.type === "income" ? "+" : "-"}
                        {formatCurrency(transaction.amount)}
                      </span>
                      {getStatusIcon(transaction.status)}
                    </div>
                    <div className="flex items-center justify-end space-x-2 mt-1">
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(
                          transaction.status
                        )}`}
                      >
                        {transaction.status}
                      </span>
                      <button
                        onClick={() => handleViewDetails(transaction)}
                        className="opacity-0 group-hover:opacity-100 flex items-center space-x-1 px-2 py-1 text-xs text-[#7DC400] hover:bg-[#7DC400]/10 rounded-lg transition-all"
                      >
                        <Eye className="w-3 h-3" />
                        <span>View</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* View All Button */}
      <div className="p-4 border-t border-gray-200">
        <button
          className="w-full py-2 text-[#7DC400] font-medium hover:bg-[#7DC400]/5 rounded-lg transition-colors"
          onClick={() => navigate("/dashboard/transactions")}
        >
          View All Transactions
        </button>
      </div>

      {/* Transaction Details Modal */}
      {selectedTransaction && (
        <TransactionDetailsModal
          transaction={{
            ...selectedTransaction,
          }}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default TransactionList;
