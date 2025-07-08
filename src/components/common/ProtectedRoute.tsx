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
  redirectPath = "/login",
}) => {
  const { isAuthenticated } = useAuthStore();
  const { hasPermission, hasRole } = usePermissions();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  // Check permissions if any are required
  const hasRequiredPermission =
    requiredPermissions.length === 0 ||
    requiredPermissions.some((permission) => hasPermission(permission));

  // Check roles if any are required
  const hasRequiredRole = requiredRoles.length === 0 || hasRole(requiredRoles);

  // If path is specified in routePermissions mapping, check those too
  const pathPermissions = routePermissions[location.pathname];
  const hasPathPermission =
    !pathPermissions ||
    pathPermissions.some((permission) => hasPermission(permission));

  // Allow access only if all checks pass
  if (hasRequiredPermission && hasRequiredRole && hasPathPermission) {
    return <>{children}</>;
  }

  // If not authorized, redirect to appropriate page
  return <Navigate to="/unauthorized" replace />;
};

export default ProtectedRoute;
