/**
 * Roles:
 * - superadmin: Has full access to all features
 * - admin: Has most administrative capabilities except managing other admins
 * - user: Basic user with limited permissions
 * - guest: access to public features only(lading page, registration, login)
 */


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
    "view_own_transactions",

    "update_own_profile",
    "manage_own_wallet",


    "make_payments",
    "request_refunds",
  ],

  guest: [
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
  if (!routePermissions[route]) return true;

  return routePermissions[route].some((permission) =>
    userPermissions.includes(permission)
  );
};
