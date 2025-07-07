import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "user" | "admin" | "superadmin"; // Changed to lowercase
  avatar?: string;
  createdAt: string;
  lastLogin?: string;
  isActive: boolean;
  createdBy?: string; // ID of the user who created this user
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
      "id" | "createdAt" | "lastLogin" | "isActive" | "createdBy"
    > & { password: string }
  ) => Promise<void>;
  createUser: (
    userData: Omit<User, "id" | "createdAt" | "lastLogin" | "isActive"> & {
      password: string;
    },
    createdById: string
  ) => Promise<User>;
  logout: () => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

// Mock users - Only SuperAdmin is pre-seeded
const mockUsers: User[] = [
  {
    id: "super-admin-001",
    email: "superadmin@chapa.co",
    firstName: "Abebe",
    lastName: "Tadesse",
    role: "superadmin", // Changed to lowercase
    avatar: "👨‍💻",
    createdAt: "2024-01-01T00:00:00Z",
    lastLogin: "2024-12-20T16:45:00Z",
    isActive: true,
    // SuperAdmin has no createdBy - system generated
  },
  // Demo Admin created by SuperAdmin (for testing purposes)
  {
    id: "admin-001",
    email: "admin@chapa.co",
    firstName: "Almaz",
    lastName: "Kebede",
    role: "admin", // Changed to lowercase
    avatar: "👩‍💼",
    createdAt: "2024-01-10T08:00:00Z",
    lastLogin: "2024-12-20T09:15:00Z",
    isActive: true,
    createdBy: "super-admin-001",
  },
  // Demo User for testing
  {
    id: "user-001",
    email: "user@chapa.co",
    firstName: "Dawit",
    lastName: "Haile",
    role: "user", // Changed to lowercase
    avatar: "👤",
    createdAt: "2024-01-15T10:00:00Z",
    lastLogin: "2024-12-20T14:30:00Z",
    isActive: true,
    createdBy: "admin-001",
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
          // Simulate API call delay
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Find user by email
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

          // Update last login
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
          // Only allow User registration through public registration
          if (userData.role !== "user") {
            throw new Error(
              "Only User accounts can be created through registration. Admin accounts must be created by SuperAdmin."
            );
          }

          // Simulate API call delay
          await new Promise((resolve) => setTimeout(resolve, 1500));

          // Check if user already exists
          const existingUser = mockUsers.find(
            (u) => u.email.toLowerCase() === userData.email.toLowerCase()
          );

          if (existingUser) {
            throw new Error("User with this email already exists");
          }

          // Create new user
          const newUser: User = {
            id: `user-${Date.now()}`,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            role: "user", // Force role to user for public registration
            avatar: "👤",
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            isActive: true,
            // No createdBy for self-registered users
          };

          // Add to mock users (in real app, this would be an API call)
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

        // Permission checks
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

        // Check if user already exists
        const existingUser = mockUsers.find(
          (u) => u.email.toLowerCase() === userData.email.toLowerCase()
        );

        if (existingUser) {
          throw new Error("User with this email already exists");
        }

        // Create new user
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
        };

        // Add to mock users
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

// Helper function to get all users (for admin panels)
export const getAllUsers = () => mockUsers;

// Helper function to get users created by a specific user
export const getUsersCreatedBy = (createdById: string) =>
  mockUsers.filter((user) => user.createdBy === createdById);
