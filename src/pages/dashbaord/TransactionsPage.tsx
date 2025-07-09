import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import TransactionHeader from "../../components/dashbaord/transaction/TransactionHeader";
import TransactionFilters from "../../components/dashbaord/transaction/TransactionFilters";
import TransactionTable from "../../components/dashbaord/transaction/TransactionTable";
import TransactionLoading from "../../components/dashbaord/transaction/TransactionLoading";
import { useAuth } from "../../hooks/useAuth";
import usePermissions from "../../hooks/usePermissions";
import { useExport } from "../../hooks/useExport";
import useTransaction from "../../hooks/useTransaction";
import TransactionDetailsModal from "../../components/dashbaord/TransactionDetailsModal";
import ConfirmationModal from "../../components/common/ConfirmationModal";
import { toast } from "react-hot-toast";
import type { Transaction } from "../../services/mockAPi";

const TransactionsPage: React.FC = () => {
  const { user } = useAuth();
  const { hasPermission } = usePermissions();
  const { exportTransactionsToCSV } = useExport();
  const {
    fetchTransactions,
    isLoading,
    transactions: allTransactions,
    deleteTransaction,
  } = useTransaction();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const hasManagePermission = hasPermission("manage_transactions");

  const filteredTransactions = allTransactions
    .filter((transaction) => {

      if (user?.role === "user") {
        return transaction.userId === user.id;
      }
      return true;
    })
    .filter((transaction) => {
      // Filter by type or status
      if (selectedFilter !== "all") {
        if (selectedFilter === "income" || selectedFilter === "expense") {
          return transaction.type === selectedFilter;
        } else {
          return transaction.status === selectedFilter;
        }
      }
      return true;
    })
    .filter((transaction) => {
      if (selectedCategory !== "all") {
        return transaction.category === selectedCategory;
      }
      return true;
    })
    .filter((transaction) => {
      if (startDate && endDate) {
        const transactionDate = new Date(transaction.date);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return transactionDate >= start && transactionDate <= end;
      }
      return true;
    })
    .filter((transaction) => {
      if (searchTerm.trim() === "") {
        return true;
      }

      const searchTermLower = searchTerm.toLowerCase();
      return (
        transaction.description.toLowerCase().includes(searchTermLower) ||
        transaction.recipient?.toLowerCase().includes(searchTermLower) ||
        transaction.sender?.toLowerCase().includes(searchTermLower) ||
        transaction.amount.toString().includes(searchTermLower)
      );
    });


  const handleViewDetails = (id: string) => {
    const transaction = allTransactions.find((t) => t.id === id);
    if (transaction) {
      setSelectedTransaction(transaction);
      setShowDetailsModal(true);
    }
  };

  // Handle transaction management (delete only)
  const handleManageTransaction = (id: string, action: "delete") => {
    if (action === "delete") {
      setTransactionToDelete(id);
      setShowDeleteModal(true);
    }
  };

  const handleConfirmDelete = async () => {
    if (!transactionToDelete) return;

    setIsDeleting(true);
    try {
      await deleteTransaction(transactionToDelete);
      toast.success("Transaction deleted successfully");
      setShowDeleteModal(false);
      setTransactionToDelete(null);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      toast.error(`Failed to delete transaction: ${errorMessage}`);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setTransactionToDelete(null);
  };

  const handleExport = () => {
    exportTransactionsToCSV(filteredTransactions);
    toast.success("Transactions exported successfully");
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <TransactionHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          onExport={handleExport}
        />

        {showFilters && (
          <TransactionFilters
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        )}

        <div className="bg-white rounded-lg shadow overflow-hidden">
          {isLoading ? (
            <div className="p-6">
              <TransactionLoading />
            </div>
          ) : (
            <TransactionTable
              transactions={filteredTransactions}
              onViewDetails={handleViewDetails}
              onManageTransaction={
                hasManagePermission ? handleManageTransaction : undefined
              }
              hasManagePermission={hasManagePermission}
            />
          )}
        </div>
      </div>

      {showDetailsModal && selectedTransaction && (
        <TransactionDetailsModal
          transaction={selectedTransaction}
          isOpen={showDetailsModal}
          onClose={() => setShowDetailsModal(false)}
        />
      )}

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete Transaction"
        message="Are you sure you want to delete this transaction? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        isLoading={isDeleting}
      />
    </DashboardLayout>
  );
};

export default TransactionsPage;
