import { create } from "zustand";
import { persist } from "zustand/middleware";

// User profile data structure
export interface UserProfile {
  userId: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    dateOfBirth?: string;
    address?: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
  };
  preferences: {
    language: string;
    currency: string;
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
    theme: "light" | "dark" | "system";
  };
  security: {
    twoFactorEnabled: boolean;
    lastPasswordChange: string;
    securityQuestions?: Array<{
      question: string;
      answer: string;
    }>;
  };
  financialInfo: {
    walletBalance: number;
    defaultPaymentMethod?: string;
    linkedBankAccounts: Array<{
      id: string;
      bankName: string;
      accountNumber: string;
      accountType: "checking" | "savings";
      isDefault: boolean;
    }>;
  };
  activityLog: Array<{
    id: string;
    action: string;
    timestamp: string;
    details: string;
    ipAddress?: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

interface UserState {
  userProfiles: Record<string, UserProfile>;
  currentUserProfile: UserProfile | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  createUserProfile: (
    userId: string,
    profileData: Partial<UserProfile>
  ) => void;
  updateUserProfile: (userId: string, updates: Partial<UserProfile>) => void;
  getUserProfile: (userId: string) => UserProfile | null;
  setCurrentUserProfile: (userId: string) => void;
  updatePersonalInfo: (
    userId: string,
    personalInfo: Partial<UserProfile["personalInfo"]>
  ) => void;
  updatePreferences: (
    userId: string,
    preferences: Partial<UserProfile["preferences"]>
  ) => void;
  updateFinancialInfo: (
    userId: string,
    financialInfo: Partial<UserProfile["financialInfo"]>
  ) => void;
  addActivityLog: (
    userId: string,
    activity: Omit<UserProfile["activityLog"][0], "id" | "timestamp">
  ) => void;
  clearError: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      userProfiles: {},
      currentUserProfile: null,
      isLoading: false,
      error: null,

      createUserProfile: (userId, profileData) => {
        set((state) => {
          const defaultProfile: UserProfile = {
            userId,
            personalInfo: {
              firstName: "",
              lastName: "",
              email: "",
              ...profileData.personalInfo,
            },
            preferences: {
              language: "en",
              currency: "ETB",
              notifications: {
                email: true,
                sms: true,
                push: true,
              },
              theme: "system",
              ...profileData.preferences,
            },
            security: {
              twoFactorEnabled: false,
              lastPasswordChange: new Date().toISOString(),
              ...profileData.security,
            },
            financialInfo: {
              walletBalance: 0,
              linkedBankAccounts: [],
              ...profileData.financialInfo,
            },
            activityLog: [
              {
                id: `activity-${Date.now()}`,
                action: "Profile Created",
                timestamp: new Date().toISOString(),
                details: "User profile was created",
              },
              ...(profileData.activityLog || []),
            ],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            ...profileData,
          };

          return {
            userProfiles: {
              ...state.userProfiles,
              [userId]: defaultProfile,
            },
          };
        });
      },

      updateUserProfile: (userId, updates) => {
        set((state) => {
          const existingProfile = state.userProfiles[userId];
          if (!existingProfile) return state;

          const updatedProfile: UserProfile = {
            ...existingProfile,
            ...updates,
            updatedAt: new Date().toISOString(),
          };

          return {
            userProfiles: {
              ...state.userProfiles,
              [userId]: updatedProfile,
            },
            currentUserProfile:
              state.currentUserProfile?.userId === userId
                ? updatedProfile
                : state.currentUserProfile,
          };
        });
      },

      getUserProfile: (userId) => {
        const { userProfiles } = get();
        return userProfiles[userId] || null;
      },

      setCurrentUserProfile: (userId) => {
        set((state) => ({
          currentUserProfile: state.userProfiles[userId] || null,
        }));
      },

      updatePersonalInfo: (userId, personalInfo) => {
        set((state) => {
          const existingProfile = state.userProfiles[userId];
          if (!existingProfile) return state;

          const updatedProfile: UserProfile = {
            ...existingProfile,
            personalInfo: {
              ...existingProfile.personalInfo,
              ...personalInfo,
            },
            updatedAt: new Date().toISOString(),
          };

          return {
            userProfiles: {
              ...state.userProfiles,
              [userId]: updatedProfile,
            },
            currentUserProfile:
              state.currentUserProfile?.userId === userId
                ? updatedProfile
                : state.currentUserProfile,
          };
        });
      },

      updatePreferences: (userId, preferences) => {
        set((state) => {
          const existingProfile = state.userProfiles[userId];
          if (!existingProfile) return state;

          const updatedProfile: UserProfile = {
            ...existingProfile,
            preferences: {
              ...existingProfile.preferences,
              ...preferences,
              notifications: {
                ...existingProfile.preferences.notifications,
                ...preferences.notifications,
              },
            },
            updatedAt: new Date().toISOString(),
          };

          return {
            userProfiles: {
              ...state.userProfiles,
              [userId]: updatedProfile,
            },
            currentUserProfile:
              state.currentUserProfile?.userId === userId
                ? updatedProfile
                : state.currentUserProfile,
          };
        });
      },

      updateFinancialInfo: (userId, financialInfo) => {
        set((state) => {
          const existingProfile = state.userProfiles[userId];
          if (!existingProfile) return state;

          const updatedProfile: UserProfile = {
            ...existingProfile,
            financialInfo: {
              ...existingProfile.financialInfo,
              ...financialInfo,
              linkedBankAccounts:
                financialInfo.linkedBankAccounts ||
                existingProfile.financialInfo.linkedBankAccounts,
            },
            updatedAt: new Date().toISOString(),
          };

          return {
            userProfiles: {
              ...state.userProfiles,
              [userId]: updatedProfile,
            },
            currentUserProfile:
              state.currentUserProfile?.userId === userId
                ? updatedProfile
                : state.currentUserProfile,
          };
        });
      },

      addActivityLog: (userId, activity) => {
        set((state) => {
          const existingProfile = state.userProfiles[userId];
          if (!existingProfile) return state;

          const newActivity = {
            ...activity,
            id: `activity-${Date.now()}-${Math.random()
              .toString(36)
              .substr(2, 9)}`,
            timestamp: new Date().toISOString(),
          };

          const updatedProfile: UserProfile = {
            ...existingProfile,
            activityLog: [newActivity, ...existingProfile.activityLog],
            updatedAt: new Date().toISOString(),
          };

          return {
            userProfiles: {
              ...state.userProfiles,
              [userId]: updatedProfile,
            },
            currentUserProfile:
              state.currentUserProfile?.userId === userId
                ? updatedProfile
                : state.currentUserProfile,
          };
        });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: "chapa-user-profiles-storage",
      partialize: (state) => ({
        userProfiles: state.userProfiles,
      }),
    }
  )
);

// Helper functions to work with user profiles
export const getUserProfileById = (userId: string): UserProfile | null => {
  return useUserStore.getState().getUserProfile(userId);
};

export const createDefaultUserProfile = (
  userId: string,
  basicInfo: { firstName: string; lastName: string; email: string }
) => {
  useUserStore.getState().createUserProfile(userId, {
    personalInfo: basicInfo,
  });
};

export const logUserActivity = (
  userId: string,
  action: string,
  details: string,
  ipAddress?: string
) => {
  useUserStore.getState().addActivityLog(userId, {
    action,
    details,
    ipAddress,
  });
};
