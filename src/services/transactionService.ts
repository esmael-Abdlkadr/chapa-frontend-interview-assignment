import { mockAPI } from "./mockAPi";
import type { Transaction } from "./mockAPi";

export interface CreateTransactionData {
  type: "income" | "expense";
  amount: number;
  description: string;
  category: string;
  method: string;
  recipient?: string;
  sender?: string;
  reference?: string;
  fee?: number;
}

export interface UpdateTransactionData extends Partial<CreateTransactionData> {
  id: string;
}

export interface TransactionFilters {
  type?: "income" | "expense";
  status?: "completed" | "pending" | "failed";
  category?: string;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
}

class TransactionService {
  private getStorageKey(userId: string): string {
    return `chapa_user_${userId}`;
  }

  private getUserFromStorage(userId: string) {
    const userData = localStorage.getItem(this.getStorageKey(userId));
    return userData ? JSON.parse(userData) : null;
  }

  private saveUserToStorage(user: any) {
    localStorage.setItem(this.getStorageKey(user.id), JSON.stringify(user));

    // Also update the main auth storage if this is the current user
    const authData = localStorage.getItem("auth-storage");
    if (authData) {
      const parsedAuth = JSON.parse(authData);
      if (parsedAuth.state?.user?.id === user.id) {
        parsedAuth.state.user = user;
        localStorage.setItem("auth-storage", JSON.stringify(parsedAuth));
      }
    }
  }

  // Get transactions from localStorage
  private getStoredTransactions(userId: string): Transaction[] {
    try {
      const stored = localStorage.getItem(this.getStorageKey(userId));
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error reading transactions from localStorage:", error);
      return [];
    }
  }

  // Save transactions to localStorage
  private saveTransactions(transactions: Transaction[], userId: string): void {
    try {
      localStorage.setItem(
        this.getStorageKey(userId),
        JSON.stringify(transactions)
      );
    } catch (error) {
      console.error("Error saving transactions to localStorage:", error);
    }
  }

  // Get all transactions with optional filters (combines mock data + stored data)
  async getTransactions(
    filters?: TransactionFilters,
    userId?: string
  ): Promise<Transaction[]> {
    try {
      // Get mock transactions
      const mockTransactions = await mockAPI.getTransactions();

      // Get stored transactions
      const storedTransactions = this.getStoredTransactions(userId!);

      // Combine and sort by date (newest first)
      let allTransactions = [...mockTransactions, ...storedTransactions].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      if (filters) {
        allTransactions = this.applyFilters(allTransactions, filters);
      }

      return allTransactions;
    } catch (error) {
      console.error("Error fetching transactions:", error);
      throw new Error("Failed to fetch transactions");
    }
  }

  // Get a single transaction by ID
  async getTransactionById(
    id: string,
    userId?: string
  ): Promise<Transaction | null> {
    try {
      const allTransactions = await this.getTransactions(undefined, userId);
      return allTransactions.find((t) => t.id === id) || null;
    } catch (error) {
      console.error("Error fetching transaction:", error);
      throw new Error("Failed to fetch transaction");
    }
  }

  // Create a new transaction and store it
  async createTransaction(
    data: CreateTransactionData,
    userId?: string
  ): Promise<Transaction> {
    try {
      const newTransaction: Transaction = {
        id: this.generateId(),
        ...data,
        date: new Date().toISOString().split("T")[0],
        time: new Date().toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: "completed",
        balance: await this.calculateNewBalance(data.type, data.amount),
      };

      // Get existing stored transactions
      const storedTransactions = this.getStoredTransactions(userId!);
      storedTransactions.unshift(newTransaction);

      this.saveTransactions(storedTransactions, userId!);

      // Simulate API call delay
      await this.delay(500);

      return newTransaction;
    } catch (error) {
      console.error("Error creating transaction:", error);
      throw new Error("Failed to create transaction");
    }
  }

  // Update an existing transaction
  async updateTransaction(
    data: UpdateTransactionData,
    userId?: string
  ): Promise<Transaction> {
    try {
      const storedTransactions = this.getStoredTransactions(userId!);
      const transactionIndex = storedTransactions.findIndex(
        (t) => t.id === data.id
      );

      if (transactionIndex === -1) {
        throw new Error("Transaction not found");
      }

      const updatedTransaction: Transaction = {
        ...storedTransactions[transactionIndex],
        ...data,
      };

      storedTransactions[transactionIndex] = updatedTransaction;
      this.saveTransactions(storedTransactions, userId!);

      // Simulate API call delay
      await this.delay(500);

      return updatedTransaction;
    } catch (error) {
      console.error("Error updating transaction:", error);
      throw new Error("Failed to update transaction");
    }
  }

  // Delete a transaction
  async deleteTransaction(id: string, userId?: string): Promise<boolean> {
    try {
      const storedTransactions = this.getStoredTransactions(userId!);
      const filteredTransactions = storedTransactions.filter(
        (t) => t.id !== id
      );

      if (filteredTransactions.length === storedTransactions.length) {
        throw new Error("Transaction not found");
      }

      this.saveTransactions(filteredTransactions, userId!);

      // Simulate API call delay
      await this.delay(500);

      return true;
    } catch (error) {
      console.error("Error deleting transaction:", error);
      throw new Error("Failed to delete transaction");
    }
  }

  // Get transaction statistics
  async getTransactionStats(userId?: string): Promise<{
    totalIncome: number;
    totalExpenses: number;
    totalTransactions: number;
    pendingTransactions: number;
  }> {
    try {
      const transactions = await this.getTransactions(undefined, userId);

      const stats = transactions.reduce(
        (acc, transaction) => {
          if (transaction.type === "income") {
            acc.totalIncome += transaction.amount;
          } else {
            acc.totalExpenses += transaction.amount;
          }

          if (transaction.status === "pending") {
            acc.pendingTransactions++;
          }

          acc.totalTransactions++;
          return acc;
        },
        {
          totalIncome: 0,
          totalExpenses: 0,
          totalTransactions: 0,
          pendingTransactions: 0,
        }
      );

      return stats;
    } catch (error) {
      console.error("Error getting transaction stats:", error);
      throw new Error("Failed to get transaction statistics");
    }
  }

  // Clear all stored transactions (useful for testing)
  clearStoredTransactions(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Error clearing stored transactions:", error);
    }
  }

  // Private helper methods
  private applyFilters(
    transactions: Transaction[],
    filters: TransactionFilters
  ): Transaction[] {
    return transactions.filter((transaction) => {
      // Filter by type
      if (filters.type && transaction.type !== filters.type) {
        return false;
      }

      // Filter by status
      if (filters.status && transaction.status !== filters.status) {
        return false;
      }

      // Filter by category
      if (filters.category && transaction.category !== filters.category) {
        return false;
      }

      // Filter by date range
      if (filters.dateFrom && transaction.date < filters.dateFrom) {
        return false;
      }
      if (filters.dateTo && transaction.date > filters.dateTo) {
        return false;
      }

      // Filter by search term
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const searchableFields = [
          transaction.description,
          transaction.recipient,
          transaction.sender,
          transaction.amount.toString(),
          transaction.reference,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        if (!searchableFields.includes(searchTerm)) {
          return false;
        }
      }

      return true;
    });
  }

  private generateId(): string {
    return `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private async calculateNewBalance(
    type: "income" | "expense",
    amount: number
  ): Promise<number> {
    // In a real app, you would fetch the current balance from the API
    // For now, we'll simulate a balance calculation
    const currentBalance = 50000; // Mock current balance
    return type === "income"
      ? currentBalance + amount
      : currentBalance - amount;
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export const transactionService = new TransactionService();
export default transactionService;
