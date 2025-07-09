import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Share2, AlertCircle } from "lucide-react";
import { mockAPI, type Transaction } from "../../services/mockAPi";
import { toastService } from "../../services/toastService";
import PageHeader from "../../components/common/PageHeader";
import TransactionSummaryCard from "../../components/dashbaord/transaction/TransactionSummaryCard";
import TransactionInformationCard from "../../components/dashbaord/transaction/TransactionInformationCard";
import ParticipantInformationCard from "../../components/dashbaord/transaction/ParticipantInformationCard";
import TransactionTimeline from "../../components/dashbaord/transaction/TransactionTimeline";

const TransactionDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactionDetails = async () => {
      try {
        setIsLoading(true);
        // In a real app, you would fetch a specific transaction by ID
        // For this mock, we'll filter from all transactions
        const response = await mockAPI.getTransactions();
        const foundTransaction = response.find((t) => t.id === id);

        if (foundTransaction) {
          setTransaction(foundTransaction);
        } else {
          setError("Transaction not found");
        }
      } catch {
        setError("Failed to load transaction details");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchTransactionDetails();
    }
  }, [id]);

  const handleDownloadReceipt = () => {
    toastService.success("Receipt downloaded successfully");
  };

  const handleShareTransaction = () => {
    toastService.success("Transaction details copied to clipboard");
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="animate-pulse space-y-6">
            <div className="flex items-center space-x-4">
              <div className="h-10 bg-gray-200 rounded w-1/4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/6"></div>
            </div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-48 bg-gray-200 rounded"></div>
              <div className="h-48 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !transaction) {
    return (
      <div className="p-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 text-center">
          <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {error || "Transaction Not Found"}
          </h3>
          <p className="text-gray-600 mb-4">
            We couldn't find the transaction you're looking for.
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate("/dashboard/transactions")}
              className="px-4 py-2 bg-[#7DC400] text-white rounded-lg hover:bg-[#6ab300] transition-colors"
            >
              Back to Transactions
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header with Back Navigation */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center">
          <button
            onClick={() => navigate("/dashboard/transactions")}
            className="mr-4 p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div>
            <PageHeader
              title="Transaction Details"
              subtitle="View complete information about this transaction"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShareTransaction}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
          <button
            onClick={handleDownloadReceipt}
            className="flex items-center gap-2 px-4 py-2 bg-[#7DC400] text-white rounded-lg hover:bg-[#6ab300] transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download Receipt</span>
          </button>
        </div>
      </div>

      {      /* Transaction Summary Card */}
      <TransactionSummaryCard
        transaction={{
          ...transaction,
          time: new Date(transaction.date).toLocaleTimeString(),
        }}
        formatCurrency={(amount) => `ETB ${amount.toFixed(2)}`}
        getTransactionIcon={(type) => {
          return () => <span>{type === "deposit" ? "💰" : "💸"}</span>;
        }}
      />

      {/* Detailed Transaction Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column - Transaction Information */}
        <TransactionInformationCard
          transaction={transaction}
          formatCurrency={(amount) => `ETB ${amount.toFixed(2)}`}
          getTransactionIcon={(type) => {
            return () => <span>{type === "deposit" ? "💰" : "💸"}</span>;
          }}
        />

        {/* Right Column - Participant Information and Timeline */}
        <div className="space-y-6">
          <ParticipantInformationCard 
            transaction={{
              ...transaction,
              time: new Date(transaction.date).toLocaleTimeString(),
            }} 
          />
          <TransactionTimeline 
            date={transaction.date}
            time={new Date(transaction.date).toLocaleTimeString()}
            status={transaction.status}
          />
        </div>
      </div>
    </div>
  );
};

export default TransactionDetailsPage;
