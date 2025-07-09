/**
 * Roles:
 * - superadmin: Has full access to all features
 * - admin: Has most administrative capabilities except managing other admins
 * - user: Basic user with limited permissions
 * - guest: access to public features only(lading page, registration, login)
 */

// Permission structure by role
export const permissions: Record<string, string[]> = {
  superadmin: [
    "view_transactions",
    "manage_transactions",
    "export_transactions",

    // User Management
    "view_users",
    "create_users",
    "update_users",
    "delete_users",
    "manage_admins",

    // System Management
    "access_admin_dashboard",
    "view_system_stats",
    "manage_system_settings",

    // Payment Management
    "process_payments",
    "refund_payments",
    "adjust_payment_settings",
  ],

  admin: [
    // Transaction Management
    "view_transactions",
    "manage_transactions",
    "export_transactions",

    // User Management (except admin management)
    "view_users",
    "create_users",
    "update_users",
    "delete_users",

    // System Management (partial)
    "access_admin_dashboard",
    "view_system_stats",

    // Payment Management
    "process_payments",
    "refund_payments",
  ],

  user: [
    // Limited Transaction Access
    "view_own_transactions",

    // Account Management
    "update_own_profile",
    "manage_own_wallet",

    // Payment Capabilities
    "make_payments",
    "request_refunds",
  ],

  guest: [
    // Minimal access
    "view_landing_page",
    "register_account",
    "login",
  ],
};


export const routePermissions: Record<string, string[]> = {
  "/dashboard/transactions": ["view_transactions", "view_own_transactions"],
  "/dashboard/users": ["view_users"],
  "/dashboard/send-money": ["make_payments", "process_payments"],
  "/dashboard/admin-management": ["manage_admins"],
};

export const getDashboardPathByRole = (role: string): string => {
  switch (role) {
    case "superadmin":
      return "/dashboard/admin";
    case "admin":
      return "/dashboard/admin";
    case "user":
      return "/dashboard/user";
    default:
      return "/login";
  }
};

export const canAccessRoute = (
  userPermissions: string[],
  route: string
): boolean => {
  // If route has no permissions defined, default to allowing access
  if (!routePermissions[route]) return true;

  // Check if user has at least one of the required permissions
  return routePermissions[route].some((permission) =>
    userPermissions.includes(permission)
  );
};
