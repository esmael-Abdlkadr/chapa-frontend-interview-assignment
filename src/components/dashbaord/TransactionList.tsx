import React, { useState } from "react";
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
import TransactionDetailsModal from "./TransactionDetailsModal";

interface Transaction {
  id: string;
  type: "income" | "expense";
  amount: number;
  description: string;
  date: string;
  time: string;
  status: "completed" | "pending" | "failed";
  category: string;
  method: string;
  recipient?: string;
  sender?: string;
  reference?: string;
  fee?: number;
  balance?: number;
}

const TransactionList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const transactions: Transaction[] = [
    {
      id: "TXN-001",
      type: "income",
      amount: 15000,
      description: "Salary Payment",
      date: "2025-01-08",
      time: "09:30",
      status: "completed",
      category: "income",
      method: "bank_transfer",
      sender: "Ethiopian Airlines",
      reference: "SAL-2025-001",
      balance: 45000,
    },
    {
      id: "TXN-002",
      type: "expense",
      amount: 450,
      description: "Coffee Purchase",
      date: "2025-01-08",
      time: "08:15",
      status: "completed",
      category: "food",
      method: "chapa_wallet",
      recipient: "Tomoca Coffee",
      reference: "CFE-2025-002",
      fee: 5,
      balance: 30000,
    },
    {
      id: "TXN-003",
      type: "expense",
      amount: 1250,
      description: "Electricity Bill",
      date: "2025-01-07",
      time: "14:22",
      status: "pending",
      category: "utilities",
      method: "mobile_money",
      recipient: "Ethiopian Electric Utility",
      reference: "ELC-2025-003",
      fee: 10,
      balance: 30450,
    },
    {
      id: "TXN-004",
      type: "expense",
      amount: 3200,
      description: "Online Shopping",
      date: "2025-01-07",
      time: "16:45",
      status: "completed",
      category: "shopping",
      method: "card",
      recipient: "JumiaET",
      reference: "SHP-2025-004",
      fee: 25,
      balance: 31700,
    },
    {
      id: "TXN-005",
      type: "income",
      amount: 5500,
      description: "Freelance Payment",
      date: "2025-01-06",
      time: "11:30",
      status: "completed",
      category: "income",
      method: "chapa_wallet",
      sender: "Tech Solutions Ltd",
      reference: "FRE-2025-005",
      balance: 34900,
    },
    {
      id: "TXN-006",
      type: "expense",
      amount: 850,
      description: "Taxi Fare",
      date: "2025-01-06",
      time: "18:20",
      status: "failed",
      category: "transport",
      method: "mobile_money",
      recipient: "Ride Share",
      reference: "TXI-2025-006",
      fee: 8,
      balance: 29400,
    },
  ];

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

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.recipient?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.sender?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      selectedFilter === "all" ||
      transaction.type === selectedFilter ||
      transaction.status === selectedFilter;

    return matchesSearch && matchesFilter;
  });

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
            Recent Transactions
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
          filteredTransactions.map((transaction) => {
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
        <button className="w-full py-2 text-[#7DC400] font-medium hover:bg-[#7DC400]/5 rounded-lg transition-colors">
          View All Transactions
        </button>
      </div>

      {/* Transaction Details Modal */}
      <TransactionDetailsModal
        transaction={selectedTransaction}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default TransactionList;
