import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Transaction {
  id: string;
  type: "income" | "expense";
  amount: number;
  description: string;
  category: string;
  date: string;
  method: string;
  recipient?: string;
  sender?: string;
  reference?: string;
  fee?: number;
  status: "pending" | "completed" | "failed";
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "user" | "admin" | "superadmin";
  avatar?: string;
  createdAt: string;
  lastLogin?: string;
  isActive: boolean;
  createdBy?: string;
  transactions: Transaction[];
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (
    userData: Omit<
      User,
      | "id"
      | "createdAt"
      | "lastLogin"
      | "isActive"
      | "createdBy"
      | "transactions"
    > & { password: string }
  ) => Promise<void>;
  createUser: (
    userData: Omit<
      User,
      "id" | "createdAt" | "lastLogin" | "isActive" | "transactions"
    > & {
      password: string;
    },
    createdById: string
  ) => Promise<User>;
  logout: () => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
  addTransaction: (
    transaction: Omit<Transaction, "id" | "date" | "status">
  ) => Promise<void>;
  updateUserTransactions: (userId: string, transactions: Transaction[]) => void;
}

const mockUsers: User[] = [
  {
    id: "super-admin-001",
    email: "superadmin@chapa.co",
    firstName: "Abebe",
    lastName: "Tadesse",
    role: "superadmin",
    avatar: "👨‍💻",
    createdAt: "2024-01-01T00:00:00Z",
    lastLogin: "2024-12-20T16:45:00Z",
    isActive: true,
    transactions: [],
  },

  {
    id: "admin-001",
    email: "admin@chapa.co",
    firstName: "Almaz",
    lastName: "Kebede",
    role: "admin",
    avatar: "👩‍💼",
    createdAt: "2024-01-10T08:00:00Z",
    lastLogin: "2024-12-20T09:15:00Z",
    isActive: true,
    createdBy: "super-admin-001",
    transactions: [],
  },

  {
    id: "user-001",
    email: "user@chapa.co",
    firstName: "Dawit",
    lastName: "Haile",
    role: "user",
    avatar: "👤",
    createdAt: "2025-01-15T10:00:00Z",
    lastLogin: "2025-12-20T14:30:00Z",
    isActive: true,
    createdBy: "admin-001",
    transactions: [],
  },
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });

        try {
          await new Promise((resolve) => setTimeout(resolve, 1000));

          const user = mockUsers.find(
            (u) => u.email.toLowerCase() === email.toLowerCase()
          );

          if (!user) {
            throw new Error("Invalid email or password");
          }

          if (!user.isActive) {
            throw new Error(
              "Your account has been deactivated. Please contact support."
            );
          }

          // For demo purposes, accept any password for existing users
          if (password.length < 6) {
            throw new Error("Password must be at least 6 characters");
          }

          const updatedUser = {
            ...user,
            lastLogin: new Date().toISOString(),
          };

          set({
            user: updatedUser,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Login failed",
            isLoading: false,
          });
          throw error;
        }
      },

      register: async (userData) => {
        set({ isLoading: true, error: null });

        try {
          if (userData.role !== "user") {
            throw new Error(
              "Only User accounts can be created through registration. Admin accounts must be created by SuperAdmin."
            );
          }

      
          await new Promise((resolve) => setTimeout(resolve, 1500));
          const existingUser = mockUsers.find(
            (u) => u.email.toLowerCase() === userData.email.toLowerCase()
          );

          if (existingUser) {
            throw new Error("User with this email already exists");
          }

          
          const newUser: User = {
            id: `user-${Date.now()}`,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            role: "user", 
            avatar: "👤",
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            isActive: true,
            transactions: [],
      
          };

          mockUsers.push(newUser);

          set({
            user: newUser,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : "Registration failed",
            isLoading: false,
          });
          throw error;
        }
      },

      createUser: async (userData, createdById) => {
        const currentUser = get().user;

        if (!currentUser) {
          throw new Error("You must be logged in to create users");
        }
        if (userData.role === "superadmin") {
          throw new Error("SuperAdmin accounts cannot be created");
        }

        if (userData.role === "admin" && currentUser.role !== "superadmin") {
          throw new Error("Only SuperAdmin can create Admin accounts");
        }

        if (
          userData.role === "user" &&
          !["admin", "superadmin"].includes(currentUser.role)
        ) {
          throw new Error(
            "Only Admin or SuperAdmin can create User accounts through admin panel"
          );
        }

        const existingUser = mockUsers.find(
          (u) => u.email.toLowerCase() === userData.email.toLowerCase()
        );

        if (existingUser) {
          throw new Error("User with this email already exists");
        }

    
        const newUser: User = {
          id: `${userData.role.toLowerCase()}-${Date.now()}`,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          role: userData.role,
          avatar: userData.avatar || (userData.role === "admin" ? "👩‍💼" : "👤"),
          createdAt: new Date().toISOString(),
          isActive: true,
          createdBy: createdById,
          transactions: [],
        };

        
        mockUsers.push(newUser);

        return newUser;
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          error: null,
        });
      },

      clearError: () => {
        set({ error: null });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      addTransaction: async (transaction) => {
        const currentUser = get().user;

        if (!currentUser) {
          throw new Error("You must be logged in to add transactions");
        }
        const newTransaction: Transaction = {
          id: `txn-${Date.now()}`,
          ...transaction,
          date: new Date().toISOString(),
          status: "pending",
        };
        const updatedTransactions = [
          ...currentUser.transactions,
          newTransaction,
        ];

        set(
          (state) => {
            const user = state.user;
            if (!user) return state;

            return {
              user: {
                ...user,
                transactions: updatedTransactions,
              },
            };
          },
          false,
        );


        await new Promise((resolve) => setTimeout(resolve, 1000));
        set(
          (state) => {
            const user = state.user;
            if (!user) return state;

            const transactionToUpdate = user.transactions.find(
              (txn) => txn.id === newTransaction.id
            );

            if (!transactionToUpdate) return state;

            const updatedTransaction: Transaction = {
              ...transactionToUpdate,
              status: "completed",
            };

            const updatedUser: User = {
              ...user,
              transactions: user.transactions.map((txn) =>
                txn.id === updatedTransaction.id ? updatedTransaction : txn
              ),
            };

            return { user: updatedUser };
          },
          false
        );
      },

      updateUserTransactions: (userId, transactions) => {
        set(
          (state) => {
            const user = state.user;
            if (!user || user.id !== userId) return state;

            return {
              user: {
                ...user,
                transactions,
              },
            };
          },
          false,
        );
      },
    }),
    {
      name: "chapa-auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);


export const getAllUsers = () => mockUsers;


export const getUsersCreatedBy = (createdById: string) =>
  mockUsers.filter((user) => user.createdBy === createdById);
