import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import usePermissions from "../../hooks/usePermissions";
import { useAuthStore } from "../../store/authStore";
import { routePermissions } from "../../utils/rolePermissions";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermissions?: string[];
  requiredRoles?: string[];
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredPermissions = [],
  requiredRoles = [],
  redirectPath = "/auth/login",
}) => {
  const { isAuthenticated , user} = useAuthStore();
  const { hasPermission, hasRole } = usePermissions();
  const location = useLocation();
 console.log("user:", user, "isAuthenticated:", isAuthenticated, "location:", location);
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }


  const hasRequiredPermission =
    requiredPermissions.length === 0 ||
    requiredPermissions.some((permission) => hasPermission(permission));

  const hasRequiredRole = requiredRoles.length === 0 || hasRole(requiredRoles);

  const pathPermissions = routePermissions[location.pathname];
  const hasPathPermission =
    !pathPermissions ||
    pathPermissions.some((permission) => hasPermission(permission));

  if (hasRequiredPermission && hasRequiredRole && hasPathPermission) {
    return <>{children}</>;
  }
  return <Navigate to="/unauthorized" replace />;
};

export default ProtectedRoute;
