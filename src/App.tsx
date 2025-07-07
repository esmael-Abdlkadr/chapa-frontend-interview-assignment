import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import UserDashboard from "./pages/dashbaord/userDashoard";
import AdminDashboard from "./pages/dashbaord/adminDashbaord";
import SuperAdminDashboard from "./pages/dashbaord/SuperAdminDashbaord";
import SendMoneyPage from "./pages/dashbaord/SendMoneyPage";
import NotFoundPage from "./pages/NotFoundPage";

// Role-based route protection component
const ProtectedRoute: React.FC<{
  children: React.ReactNode;
  allowedRoles: string[];
}> = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    switch (user.role) {
      case "superadmin":
        return <Navigate to="/super-admin" replace />;
      case "admin":
        return <Navigate to="/admin" replace />;
      case "user":
        return <Navigate to="/dashboard" replace />;
      default:
        return <Navigate to="/auth/login" replace />;
    }
  }

  return <>{children}</>;
};

// Dashboard redirect component
const DashboardRedirect: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  // Redirect to appropriate dashboard based on role
  switch (user.role) {
    case "superadmin":
      return <Navigate to="/super-admin" replace />;
    case "admin":
      return <Navigate to="/admin" replace />;
    case "user":
      return <Navigate to="/dashboard" replace />;
    default:
      return <Navigate to="/auth/login" replace />;
  }
};

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route
          path="/"
          element={!isAuthenticated ? <LandingPage /> : <DashboardRedirect />}
        />
        <Route
          path="/auth/login"
          element={!isAuthenticated ? <Login /> : <DashboardRedirect />}
        />
        <Route
          path="/auth/register"
          element={!isAuthenticated ? <Register /> : <DashboardRedirect />}
        />

        {/* User Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/send-money"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <SendMoneyPage />
            </ProtectedRoute>
          }
        />

        {/* Admin Dashboard Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Super Admin Dashboard Routes */}
        <Route
          path="/super-admin"
          element={
            <ProtectedRoute allowedRoles={["superadmin"]}>
              <SuperAdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
