import { useMemo } from "react";
import { useAuthStore } from "../store/authStore";
import { permissions } from "../utils/rolePermissions";


const usePermissions = () => {
  const { user } = useAuthStore();

  const userRole = user?.role || "guest";
  const userPermissions = useMemo(() => {
    return permissions[userRole] || [];
  }, [userRole]);


  const hasPermission = (permission: string): boolean => {
    return userPermissions.includes(permission);
  };
  const hasAnyPermission = (requiredPermissions: string[]): boolean => {
    return requiredPermissions.some((permission) => hasPermission(permission));
  };

  const hasAllPermissions = (requiredPermissions: string[]): boolean => {
    return requiredPermissions.every((permission) => hasPermission(permission));
  };

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
