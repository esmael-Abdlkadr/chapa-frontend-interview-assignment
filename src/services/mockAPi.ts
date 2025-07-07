
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
}

// Generate mock data
const generateMockUsers = (): User[] => {
  const firstNames = [
    "John",
    "Sarah",
    "Michael",
    "Emma",
    "David",
    "Lisa",
    "James",
    "Anna",
    "Robert",
    "Maria",
    "Ahmed",
    "Fatima",
    "Daniel",
    "Zara",
    "Samuel",
    "Hanan",
    "Yonas",
    "Meron",
    "Tadesse",
    "Almaz",
  ];
  const lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Garcia",
    "Miller",
    "Davis",
    "Rodriguez",
    "Martinez",
    "Kebede",
    "Tesfaye",
    "Abebe",
    "Haile",
    "Getachew",
    "Mulatu",
    "Bekele",
    "Girma",
    "Worku",
    "Mengistu",
  ];
  const avatars = ["👨‍💼", "👩‍💼", "👨‍💻", "👩‍💻", "👨‍🎓", "👩‍🎓", "👨‍🚀", "👩‍🚀", "👨‍🏫", "👩‍🏫"];

  return Array.from({ length: 20 }, (_, i) => ({
    id: `user-${i + 1}`,
    firstName: firstNames[i],
    lastName: lastNames[i],
    email: `${firstNames[i].toLowerCase()}.${lastNames[
      i
    ].toLowerCase()}@example.com`,
    phone: `+251${Math.floor(Math.random() * 900000000) + 900000000}`,
    role: "user" as const,
    status: Math.random() > 0.1 ? "active" : ("inactive" as const),
    createdAt: new Date(
      Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000
    ).toISOString(),
    lastLogin: new Date(
      Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
    ).toISOString(),
    walletBalance: Math.floor(Math.random() * 10000) + 500,
    totalTransactions: Math.floor(Math.random() * 50) + 1,
    isVerified: Math.random() > 0.2,
    avatar: avatars[Math.floor(Math.random() * avatars.length)],
  }));
};

const generateMockAdmins = (): Admin[] => {
  const admins = [
    {
      firstName: "Alex",
      lastName: "Thompson",
      email: "alex.thompson@chapa.com",
      role: "admin" as const,
    },
    {
      firstName: "Priya",
      lastName: "Patel",
      email: "priya.patel@chapa.com",
      role: "admin" as const,
    },
    {
      firstName: "Marcus",
      lastName: "Johnson",
      email: "marcus.johnson@chapa.com",
      role: "admin" as const,
    },
    {
      firstName: "Sofia",
      lastName: "Rodriguez",
      email: "sofia.rodriguez@chapa.com",
      role: "admin" as const,
    },
    {
      firstName: "Raj",
      lastName: "Kumar",
      email: "raj.kumar@chapa.com",
      role: "admin" as const,
    },
    {
      firstName: "Elena",
      lastName: "Petrov",
      email: "elena.petrov@chapa.com",
      role: "superadmin" as const,
    },
  ];

  const avatars = ["👨‍💼", "👩‍💼", "👨‍🔧", "👩‍🔧", "👨‍⚖️", "👩‍⚖️"];

  return admins.map((admin, i) => ({
    id: `admin-${i + 1}`,
    ...admin,
    phone: `+251${Math.floor(Math.random() * 900000000) + 900000000}`,
    status: "active" as const,
    createdAt: new Date(
      Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000
    ).toISOString(),
    lastLogin: new Date(
      Date.now() - Math.random() * 2 * 24 * 60 * 60 * 1000
    ).toISOString(),
    permissions:
      admin.role === "superadmin"
        ? ["all"]
        : ["user_management", "transaction_monitoring", "basic_analytics"],
    avatar: avatars[i],
  }));
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
    const users = getStorageData<User[]>(STORAGE_KEYS.USERS, []);
    const admins = getStorageData<Admin[]>(STORAGE_KEYS.ADMINS, []);
    const transactions = getStorageData<Transaction[]>(
      STORAGE_KEYS.TRANSACTIONS,
      []
    );

    const stats: SystemStats = {
      totalUsers: users.length,
      activeUsers: users.filter((u) => u.status === "active").length,
      totalAdmins: admins.length,
      activeAdmins: admins.filter((a) => a.status === "active").length,
      totalTransactions: transactions.length,
      totalRevenue: transactions.reduce((sum, t) => sum + t.amount, 0),
      systemUptime: 99.9,
      lastUpdated: new Date().toISOString(),
    };

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

  // Admins
  getAdmins: (): Promise<Admin[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getStorageData<Admin[]>(STORAGE_KEYS.ADMINS, []));
      }, 300);
    });
  },

  addAdmin: (admin: Omit<Admin, "id" | "createdAt">): Promise<Admin> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const admins = getStorageData<Admin[]>(STORAGE_KEYS.ADMINS, []);
        const newAdmin: Admin = {
          ...admin,
          id: `admin-${Date.now()}`,
          createdAt: new Date().toISOString(),
        };

        admins.push(newAdmin);
        setStorageData(STORAGE_KEYS.ADMINS, admins);
        resolve(newAdmin);
      }, 500);
    });
  },

  removeAdmin: (id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const admins = getStorageData<Admin[]>(STORAGE_KEYS.ADMINS, []);
        const filteredAdmins = admins.filter((a) => a.id !== id);

        if (filteredAdmins.length === admins.length) {
          reject(new Error("Admin not found"));
          return;
        }

        setStorageData(STORAGE_KEYS.ADMINS, filteredAdmins);
        resolve();
      }, 300);
    });
  },

  updateAdmin: (id: string, updates: Partial<Admin>): Promise<Admin> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const admins = getStorageData<Admin[]>(STORAGE_KEYS.ADMINS, []);
        const adminIndex = admins.findIndex((a) => a.id === id);

        if (adminIndex === -1) {
          reject(new Error("Admin not found"));
          return;
        }

        admins[adminIndex] = { ...admins[adminIndex], ...updates };
        setStorageData(STORAGE_KEYS.ADMINS, admins);
        resolve(admins[adminIndex]);
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

  // System Stats
  getSystemStats: (): Promise<SystemStats> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Recalculate stats from current data
        const users = getStorageData<User[]>(STORAGE_KEYS.USERS, []);
        const admins = getStorageData<Admin[]>(STORAGE_KEYS.ADMINS, []);
        const transactions = getStorageData<Transaction[]>(
          STORAGE_KEYS.TRANSACTIONS,
          []
        );

        const stats: SystemStats = {
          totalUsers: users.length,
          activeUsers: users.filter((u) => u.status === "active").length,
          totalAdmins: admins.length,
          activeAdmins: admins.filter((a) => a.status === "active").length,
          totalTransactions: transactions.length,
          totalRevenue: transactions.reduce((sum, t) => sum + t.amount, 0),
          systemUptime: 99.9,
          lastUpdated: new Date().toISOString(),
        };

        setStorageData(STORAGE_KEYS.SYSTEM_STATS, stats);
        resolve(stats);
      }, 200);
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
