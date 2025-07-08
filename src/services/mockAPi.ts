const STORAGE_KEYS = {
  USERS: "chapa_users",
  ADMINS: "chapa_admins",
  TRANSACTIONS: "chapa_transactions",
  SYSTEM_STATS: "chapa_system_stats",
};

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: "user" | "admin" | "superadmin";
  status: "active" | "inactive" | "suspended";
  createdAt: string;
  lastLogin: string;
  walletBalance: number;
  totalTransactions: number;
  isVerified: boolean;
  avatar: string;
}

export interface Admin {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: "admin" | "superadmin";
  status: "active" | "inactive";
  createdAt: string;
  lastLogin: string;
  permissions: string[];
  avatar: string;
}

export interface Transaction {
  id: string;
  userId: string;
  type: "income" | "expense";
  amount: number;
  description: string;
  date: string;
  status: "completed" | "pending" | "failed";
  category: string;
  method: string;
  recipient?: string;
  sender?: string;
  reference: string;
  fee: number;
}

export interface SystemStats {
  totalUsers: number;
  activeUsers: number;
  totalAdmins: number;
  activeAdmins: number;
  totalTransactions: number;
  totalRevenue: number;
  systemUptime: number;
  lastUpdated: string;
  // Enhanced stats for competition features
  monthlyGrowth: {
    users: number;
    revenue: number;
    transactions: number;
  };
  transactionBreakdown: {
    completed: number;
    pending: number;
    failed: number;
  };
  revenueBreakdown: {
    fees: number;
    commissions: number;
    penalties: number;
  };
  systemHealth: {
    database: "healthy" | "warning" | "error";
    apiServer: "running" | "warning" | "error";
    paymentGateway: "operational" | "warning" | "error";
    security: "protected" | "warning" | "vulnerable";
  };
  activeSessionsCount: number;
  averageTransactionValue: number;
  topPerformingRegions: string[];
}

// JSON Mock Data
const mockUsersData: User[] = [
  {
    id: "user-1",
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@example.com",
    phone: "+251911234567",
    role: "user",
    status: "active",
    createdAt: "2024-01-15T08:30:00Z",
    lastLogin: "2024-12-20T14:22:00Z",
    walletBalance: 2500,
    totalTransactions: 15,
    isVerified: true,
    avatar: "",
  },
  {
    id: "user-2",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@example.com",
    phone: "+251922345678",
    role: "user",
    status: "active",
    createdAt: "2024-02-10T10:15:00Z",
    lastLogin: "2024-12-19T16:45:00Z",
    walletBalance: 1800,
    totalTransactions: 8,
    isVerified: true,
    avatar: "",
  },
  {
    id: "user-3",
    firstName: "Michael",
    lastName: "Williams",
    email: "michael.williams@example.com",
    phone: "+251933456789",
    role: "user",
    status: "active",
    createdAt: "2024-03-05T12:00:00Z",
    lastLogin: "2024-12-21T09:30:00Z",
    walletBalance: 3200,
    totalTransactions: 22,
    isVerified: false,
    avatar: "",
  },
  {
    id: "user-4",
    firstName: "Emma",
    lastName: "Brown",
    email: "emma.brown@example.com",
    phone: "+251944567890",
    role: "user",
    status: "inactive",
    createdAt: "2024-04-12T14:20:00Z",
    lastLogin: "2024-11-15T11:10:00Z",
    walletBalance: 950,
    totalTransactions: 5,
    isVerified: true,
    avatar: "",
  },
  {
    id: "user-5",
    firstName: "David",
    lastName: "Jones",
    email: "david.jones@example.com",
    phone: "+251955678901",
    role: "user",
    status: "active",
    createdAt: "2024-05-18T16:45:00Z",
    lastLogin: "2024-12-20T18:22:00Z",
    walletBalance: 4100,
    totalTransactions: 31,
    isVerified: true,
    avatar: "",
  },
  {
    id: "user-6",
    firstName: "Lisa",
    lastName: "Garcia",
    email: "lisa.garcia@example.com",
    phone: "+251966789012",
    role: "user",
    status: "active",
    createdAt: "2024-06-22T09:30:00Z",
    lastLogin: "2024-12-21T12:15:00Z",
    walletBalance: 2750,
    totalTransactions: 18,
    isVerified: true,
    avatar: "",
  },
  {
    id: "user-7",
    firstName: "Ahmed",
    lastName: "Kebede",
    email: "ahmed.kebede@example.com",
    phone: "+251977890123",
    role: "user",
    status: "active",
    createdAt: "2024-07-10T11:20:00Z",
    lastLogin: "2024-12-19T20:45:00Z",
    walletBalance: 1600,
    totalTransactions: 12,
    isVerified: false,
    avatar: "",
  },
  {
    id: "user-8",
    firstName: "Fatima",
    lastName: "Tesfaye",
    email: "fatima.tesfaye@example.com",
    phone: "+251988901234",
    role: "user",
    status: "active",
    createdAt: "2024-08-03T13:45:00Z",
    lastLogin: "2024-12-21T07:30:00Z",
    walletBalance: 3800,
    totalTransactions: 26,
    isVerified: true,
    avatar: "",
  },
];

const generateMockUsers = (): User[] => {
  return mockUsersData;
};

const mockAdminsData: Admin[] = [
  {
    id: "admin-1",
    firstName: "Alex",
    lastName: "Thompson",
    email: "alex.thompson@chapa.com",
    phone: "+251911111111",
    role: "admin",
    status: "active",
    createdAt: "2024-01-01T08:00:00Z",
    lastLogin: "2024-12-21T08:30:00Z",
    permissions: [
      "user_management",
      "transaction_monitoring",
      "basic_analytics",
    ],
    avatar: "",
  },
  {
    id: "admin-2",
    firstName: "Priya",
    lastName: "Patel",
    email: "priya.patel@chapa.com",
    phone: "+251922222222",
    role: "admin",
    status: "active",
    createdAt: "2024-01-15T09:30:00Z",
    lastLogin: "2024-12-20T14:45:00Z",
    permissions: [
      "user_management",
      "transaction_monitoring",
      "basic_analytics",
    ],
    avatar: "",
  },
  {
    id: "admin-3",
    firstName: "Marcus",
    lastName: "Johnson",
    email: "marcus.johnson@chapa.com",
    phone: "+251933333333",
    role: "superadmin",
    status: "active",
    createdAt: "2024-01-01T00:00:00Z",
    lastLogin: "2024-12-21T10:00:00Z",
    permissions: ["all"],
    avatar: "",
  },
  {
    id: "admin-4",
    firstName: "Sofia",
    lastName: "Rodriguez",
    email: "sofia.rodriguez@chapa.com",
    phone: "+251944444444",
    role: "admin",
    status: "active",
    createdAt: "2024-02-10T11:20:00Z",
    lastLogin: "2024-12-19T16:30:00Z",
    permissions: [
      "user_management",
      "transaction_monitoring",
      "basic_analytics",
    ],
    avatar: "",
  },
  {
    id: "admin-5",
    firstName: "Raj",
    lastName: "Kumar",
    email: "raj.kumar@chapa.com",
    phone: "+251955555555",
    role: "admin",
    status: "active",
    createdAt: "2024-03-05T13:15:00Z",
    lastLogin: "2024-12-20T12:20:00Z",
    permissions: [
      "user_management",
      "transaction_monitoring",
      "basic_analytics",
    ],
    avatar: "",
  },
];

const generateMockAdmins = (): Admin[] => {
  return mockAdminsData;
};

const generateMockTransactions = (): Transaction[] => {
  const descriptions = [
    "Salary Payment",
    "Coffee Purchase",
    "Electricity Bill",
    "Online Shopping",
    "Freelance Payment",
    "Taxi Fare",
    "Restaurant Bill",
    "Grocery Shopping",
    "Mobile Top-up",
    "Internet Bill",
    "Fuel Purchase",
    "Medical Expenses",
  ];

  const categories = [
    "income",
    "food",
    "utilities",
    "shopping",
    "transport",
    "entertainment",
  ];
  const methods = ["chapa_wallet", "bank_transfer", "card", "mobile_money"];

  return Array.from({ length: 150 }, (_, i) => ({
    id: `TXN-${String(i + 1).padStart(3, "0")}`,
    userId: `user-${Math.floor(Math.random() * 20) + 1}`,
    type: Math.random() > 0.3 ? "expense" : ("income" as const),
    amount: Math.floor(Math.random() * 5000) + 50,
    description: descriptions[Math.floor(Math.random() * descriptions.length)],
    date: new Date(
      Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
    ).toISOString(),
    status:
      Math.random() > 0.1
        ? "completed"
        : Math.random() > 0.5
        ? "pending"
        : ("failed" as const),
    category: categories[Math.floor(Math.random() * categories.length)],
    method: methods[Math.floor(Math.random() * methods.length)],
    recipient:
      Math.random() > 0.5
        ? `Recipient ${Math.floor(Math.random() * 20) + 1}`
        : undefined,
    sender:
      Math.random() > 0.5
        ? `Sender ${Math.floor(Math.random() * 20) + 1}`
        : undefined,
    reference: `REF-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    fee: Math.floor(Math.random() * 50) + 5,
  }));
};

// Local storage utilities
const getStorageData = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage for key ${key}:`, error);
    return defaultValue;
  }
};

const setStorageData = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error writing to localStorage for key ${key}:`, error);
  }
};

// Enhanced system stats calculation
const calculateEnhancedStats = (): SystemStats => {
  const users = getStorageData<User[]>(STORAGE_KEYS.USERS, []);
  const admins = getStorageData<Admin[]>(STORAGE_KEYS.ADMINS, []);
  const transactions = getStorageData<Transaction[]>(
    STORAGE_KEYS.TRANSACTIONS,
    []
  );

  const completedTransactions = transactions.filter(
    (t) => t.status === "completed"
  );
  const pendingTransactions = transactions.filter(
    (t) => t.status === "pending"
  );
  const failedTransactions = transactions.filter((t) => t.status === "failed");

  const totalRevenue = completedTransactions.reduce(
    (sum, t) => sum + t.amount,
    0
  );
  const totalFees = completedTransactions.reduce((sum, t) => sum + t.fee, 0);

  return {
    totalUsers: users.length,
    activeUsers: users.filter((u) => u.status === "active").length,
    totalAdmins: admins.length,
    activeAdmins: admins.filter((a) => a.status === "active").length,
    totalTransactions: transactions.length,
    totalRevenue,
    systemUptime: 99.9,
    lastUpdated: new Date().toISOString(),
    monthlyGrowth: {
      users: 12.5,
      revenue: 18.3,
      transactions: 25.7,
    },
    transactionBreakdown: {
      completed: completedTransactions.length,
      pending: pendingTransactions.length,
      failed: failedTransactions.length,
    },
    revenueBreakdown: {
      fees: totalFees,
      commissions: totalRevenue * 0.025, // 2.5% commission
      penalties: totalRevenue * 0.001, // 0.1% penalties
    },
    systemHealth: {
      database: "healthy",
      apiServer: "running",
      paymentGateway: "operational",
      security: "protected",
    },
    activeSessionsCount:
      users.filter((u) => u.status === "active").length +
      admins.filter((a) => a.status === "active").length,
    averageTransactionValue:
      completedTransactions.length > 0
        ? totalRevenue / completedTransactions.length
        : 0,
    topPerformingRegions: [
      "Addis Ababa",
      "Dire Dawa",
      "Hawassa",
      "Bahir Dar",
      "Mekelle",
    ],
  };
};

// Initialize data if not exists
const initializeData = () => {
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    setStorageData(STORAGE_KEYS.USERS, generateMockUsers());
  }

  if (!localStorage.getItem(STORAGE_KEYS.ADMINS)) {
    setStorageData(STORAGE_KEYS.ADMINS, generateMockAdmins());
  }

  if (!localStorage.getItem(STORAGE_KEYS.TRANSACTIONS)) {
    setStorageData(STORAGE_KEYS.TRANSACTIONS, generateMockTransactions());
  }

  if (!localStorage.getItem(STORAGE_KEYS.SYSTEM_STATS)) {
    const stats = calculateEnhancedStats();
    setStorageData(STORAGE_KEYS.SYSTEM_STATS, stats);
  }
};

// API functions
export const mockAPI = {
  // Initialize data
  init: initializeData,

  // Users
  getUsers: (): Promise<User[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getStorageData<User[]>(STORAGE_KEYS.USERS, []));
      }, 300);
    });
  },

  updateUser: (id: string, updates: Partial<User>): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getStorageData<User[]>(STORAGE_KEYS.USERS, []);
        const userIndex = users.findIndex((u) => u.id === id);

        if (userIndex === -1) {
          reject(new Error("User not found"));
          return;
        }

        users[userIndex] = { ...users[userIndex], ...updates };
        setStorageData(STORAGE_KEYS.USERS, users);
        resolve(users[userIndex]);
      }, 200);
    });
  },

  // Enhanced admin management
  getAdmins: (): Promise<Admin[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getStorageData<Admin[]>(STORAGE_KEYS.ADMINS, []));
      }, 300);
    });
  },

  addAdmin: (admin: Omit<Admin, "id" | "createdAt">): Promise<Admin> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const admins = getStorageData<Admin[]>(STORAGE_KEYS.ADMINS, []);

          // Check if email already exists
          const existingAdmin = admins.find((a) => a.email === admin.email);
          if (existingAdmin) {
            reject(new Error("Admin with this email already exists"));
            return;
          }

          const newAdmin: Admin = {
            ...admin,
            id: `admin-${Date.now()}-${Math.random()
              .toString(36)
              .substr(2, 9)}`,
            createdAt: new Date().toISOString(),
          };

          admins.push(newAdmin);
          setStorageData(STORAGE_KEYS.ADMINS, admins);
          resolve(newAdmin);
        } catch (error) {
          reject(error);
        }
      }, 500);
    });
  },

  removeAdmin: (id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const admins = getStorageData<Admin[]>(STORAGE_KEYS.ADMINS, []);
          const adminToRemove = admins.find((a) => a.id === id);

          if (!adminToRemove) {
            reject(new Error("Admin not found"));
            return;
          }

          // Prevent removal of superadmin
          if (adminToRemove.role === "superadmin") {
            reject(new Error("Cannot remove super admin"));
            return;
          }

          const filteredAdmins = admins.filter((a) => a.id !== id);
          setStorageData(STORAGE_KEYS.ADMINS, filteredAdmins);
          resolve();
        } catch (error) {
          reject(error);
        }
      }, 300);
    });
  },

  updateAdmin: (id: string, updates: Partial<Admin>): Promise<Admin> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const admins = getStorageData<Admin[]>(STORAGE_KEYS.ADMINS, []);
          const adminIndex = admins.findIndex((a) => a.id === id);

          if (adminIndex === -1) {
            reject(new Error("Admin not found"));
            return;
          }

          // Prevent role change for superadmin
          const currentAdmin = admins[adminIndex];
          if (
            currentAdmin.role === "superadmin" &&
            updates.role &&
            updates.role !== "superadmin"
          ) {
            reject(new Error("Cannot change super admin role"));
            return;
          }

          admins[adminIndex] = { ...admins[adminIndex], ...updates };
          setStorageData(STORAGE_KEYS.ADMINS, admins);
          resolve(admins[adminIndex]);
        } catch (error) {
          reject(error);
        }
      }, 200);
    });
  },

  // Transactions
  getTransactions: (): Promise<Transaction[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getStorageData<Transaction[]>(STORAGE_KEYS.TRANSACTIONS, []));
      }, 300);
    });
  },

  // Get all accounts (users + admins combined)
  getAllAccounts: (): Promise<(User | Admin)[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = getStorageData<User[]>(STORAGE_KEYS.USERS, []);
        const admins = getStorageData<Admin[]>(STORAGE_KEYS.ADMINS, []);
        resolve([...users, ...admins]);
      }, 300);
    });
  },

  // Enhanced System Stats
  getSystemStats: (): Promise<SystemStats> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const stats = calculateEnhancedStats();
        setStorageData(STORAGE_KEYS.SYSTEM_STATS, stats);
        resolve(stats);
      }, 200);
    });
  },

  // New methods for advanced features
  getSystemHealth: (): Promise<SystemStats["systemHealth"]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const stats = calculateEnhancedStats();
        resolve(stats.systemHealth);
      }, 100);
    });
  },

  exportSystemData: (): Promise<{
    users: User[];
    admins: Admin[];
    transactions: Transaction[];
    stats: SystemStats;
  }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = getStorageData<User[]>(STORAGE_KEYS.USERS, []);
        const admins = getStorageData<Admin[]>(STORAGE_KEYS.ADMINS, []);
        const transactions = getStorageData<Transaction[]>(
          STORAGE_KEYS.TRANSACTIONS,
          []
        );
        const stats = calculateEnhancedStats();

        resolve({ users, admins, transactions, stats });
      }, 1000); // Simulate longer processing time for export
    });
  },

  // Bulk operations for admin efficiency
  bulkUpdateUsers: (
    updates: { id: string; changes: Partial<User> }[]
  ): Promise<User[]> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const users = getStorageData<User[]>(STORAGE_KEYS.USERS, []);
          const updatedUsers: User[] = [];

          updates.forEach(({ id, changes }) => {
            const userIndex = users.findIndex((u) => u.id === id);
            if (userIndex !== -1) {
              users[userIndex] = { ...users[userIndex], ...changes };
              updatedUsers.push(users[userIndex]);
            }
          });

          setStorageData(STORAGE_KEYS.USERS, users);
          resolve(updatedUsers);
        } catch (error) {
          reject(error);
        }
      }, 500);
    });
  },

  resetData: (): void => {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
    initializeData();
  },
};

initializeData();
