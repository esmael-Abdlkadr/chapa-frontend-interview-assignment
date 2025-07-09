import { useState, useEffect, useCallback } from "react";
import { transactionService } from "../services/transactionService";
import type { Transaction } from "../services/mockAPi";
import type { CreateTransactionData, UpdateTransactionData, TransactionFilters } from "../services/transactionService";

interface UseTransactionReturn {
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
  fetchTransactions: (filters?: TransactionFilters) => Promise<void>;
  createTransaction: (data: CreateTransactionData) => Promise<Transaction>;
  updateTransaction: (data: UpdateTransactionData) => Promise<Transaction>;
  deleteTransaction: (id: string) => Promise<boolean>;
  getTransactionById: (id: string) => Transaction | undefined;
  refetch: () => void;
  stats: {
    totalIncome: number;
    totalExpenses: number;
    totalTransactions: number;
    pendingTransactions: number;
  } | null;
}

const useTransaction = (): UseTransactionReturn => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<{
    totalIncome: number;
    totalExpenses: number;
    totalTransactions: number;
    pendingTransactions: number;
  } | null>(null);

  const fetchTransactions = useCallback(async (filters?: TransactionFilters) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await transactionService.getTransactions(filters);
      setTransactions(data);
      
  
      const statsData = await transactionService.getTransactionStats();
      setStats(statsData);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while fetching transactions"
      );
      console.error("Error fetching transactions:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createTransaction = useCallback(async (data: CreateTransactionData): Promise<Transaction> => {
    try {
      const newTransaction = await transactionService.createTransaction(data);

      await fetchTransactions();
      
      return newTransaction;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create transaction";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [fetchTransactions]);

  const updateTransaction = useCallback(async (data: UpdateTransactionData): Promise<Transaction> => {
    try {
      const updatedTransaction = await transactionService.updateTransaction(data);
      
      setTransactions(prev => 
        prev.map(transaction => 
          transaction.id === data.id ? updatedTransaction : transaction
        )
      );
      
      return updatedTransaction;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update transaction";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  const deleteTransaction = useCallback(async (id: string): Promise<boolean> => {
    try {
      const success = await transactionService.deleteTransaction(id);
      
      if (success) {
        setTransactions(prev => prev.filter(transaction => transaction.id !== id));
        

        const statsData = await transactionService.getTransactionStats();
        setStats(statsData);
      }
      
      return success;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to delete transaction";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  const getTransactionById = useCallback((id: string): Transaction | undefined => {
    return transactions.find((transaction) => transaction.id === id);
  }, [transactions]);

  const refetch = useCallback(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return {
    transactions,
    isLoading,
    error,
    fetchTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    getTransactionById,
    refetch,
    stats,
  };
};

export default useTransaction;
