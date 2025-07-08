import { mockAPI } from "./mockAPi";
import type { Transaction as BaseTransaction } from "./mockAPi";

export interface Transaction extends Omit<BaseTransaction, "reference"> {
  time?: string;
  balance?: number;
  reference?: string;
}

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
  async getTransactions(filters?: TransactionFilters): Promise<Transaction[]> {
    try {
      let transactions = await mockAPI.getTransactions();
      let castedTransactions = transactions as unknown as Transaction[];

      if (filters) {
        castedTransactions = this.applyFilters(castedTransactions, filters);
      }

      return castedTransactions;
    } catch (error) {
      console.error("Error fetching transactions:", error);
      throw new Error("Failed to fetch transactions");
    }
  }

  async getTransactionById(id: string): Promise<Transaction | null> {
    try {
      const transactions = await mockAPI.getTransactions();
      return transactions.find((t) => t.id === id) || null;
    } catch (error) {
      console.error("Error fetching transaction:", error);
      throw new Error("Failed to fetch transaction");
    }
  }

  async createTransaction(data: CreateTransactionData): Promise<Transaction> {
    try {
      const newTransaction: Transaction = {
        id: this.generateId(),
        userId: "user-1", // Adding required userId field
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

      // Simulate API call delay
      await this.delay(500);

      // In a real app, you would make an API call here
      // For now, we'll just return the created transaction
      return newTransaction;
    } catch (error) {
      console.error("Error creating transaction:", error);
      throw new Error("Failed to create transaction");
    }
  }

  // Update an existing transaction
  async updateTransaction(data: UpdateTransactionData): Promise<Transaction> {
    try {
      const existingTransaction = await this.getTransactionById(data.id);

      if (!existingTransaction) {
        throw new Error("Transaction not found");
      }

      const updatedTransaction: Transaction = {
        ...existingTransaction,
        ...data,
      };

      // Simulate API call delay
      await this.delay(500);

      return updatedTransaction;
    } catch (error) {
      console.error("Error updating transaction:", error);
      throw new Error("Failed to update transaction");
    }
  }

  // Delete a transaction
  async deleteTransaction(id: string): Promise<boolean> {
    try {
      const transaction = await this.getTransactionById(id);

      if (!transaction) {
        throw new Error("Transaction not found");
      }

      // Simulate API call delay
      await this.delay(500);

      // In a real app, you would make an API call here
      return true;
    } catch (error) {
      console.error("Error deleting transaction:", error);
      throw new Error("Failed to delete transaction");
    }
  }

  // Get transaction statistics
  async getTransactionStats(): Promise<{
    totalIncome: number;
    totalExpenses: number;
    totalTransactions: number;
    pendingTransactions: number;
  }> {
    try {
      const transactions = await this.getTransactions();

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
