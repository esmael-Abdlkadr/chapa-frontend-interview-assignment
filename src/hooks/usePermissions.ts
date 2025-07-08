import { useMemo } from "react";
import { useAuthStore } from "../store/authStore";
import { permissions } from "../utils/rolePermissions";

/**
 * Hook to check user permissions based on their role
 *
 * @returns Object containing permission-checking utility functions
 */
const usePermissions = () => {
  const { user } = useAuthStore();

  // Get the user's role from auth store
  const userRole = user?.role || "guest";

  // Memoize the user's permissions based on their role
  const userPermissions = useMemo(() => {
    return permissions[userRole] || [];
  }, [userRole]);

  /**
   * Check if the current user has a specific permission
   *
   * @param permission - The permission to check for
   * @returns Boolean indicating if user has the permission
   */
  const hasPermission = (permission: string): boolean => {
    return userPermissions.includes(permission);
  };

  /**
   * Check if the current user has any of the specified permissions
   *
   * @param requiredPermissions - Array of permissions to check
   * @returns Boolean indicating if user has any of the permissions
   */
  const hasAnyPermission = (requiredPermissions: string[]): boolean => {
    return requiredPermissions.some((permission) => hasPermission(permission));
  };

  /**
   * Check if the current user has all of the specified permissions
   *
   * @param requiredPermissions - Array of permissions to check
   * @returns Boolean indicating if user has all of the permissions
   */
  const hasAllPermissions = (requiredPermissions: string[]): boolean => {
    return requiredPermissions.every((permission) => hasPermission(permission));
  };

  /**
   * Check if the current user has a specific role
   *
   * @param checkRole - The role to check for
   * @returns Boolean indicating if user has the role
   */
  const hasRole = (checkRoles: string | string[]): boolean => {
    const rolesToCheck = Array.isArray(checkRoles) ? checkRoles : [checkRoles];
    return rolesToCheck.includes(userRole);
  };

  return {
    userRole,
    userPermissions,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    hasRole,
  };
};

export default usePermissions;
