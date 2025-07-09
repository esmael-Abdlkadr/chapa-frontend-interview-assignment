import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./hooks/useAuth";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import UserDashboard from "./pages/dashbaord/userDashoard";
import AdminDashboard from "./pages/dashbaord/adminDashbaord";
import SuperAdminDashboard from "./pages/dashbaord/SuperAdminDashbaord";
import SendMoneyPage from "./pages/dashbaord/SendMoneyPage";
import NotFoundPage from "./pages/NotFoundPage";
import AdminManagementPage from "./pages/dashbaord/AdminManagementPage";
import TransactionsPage from "./pages/dashbaord/TransactionsPage";
import TransactionDetailsPage from "./pages/dashbaord/TransactionDetailsPage";
import ProtectedRoute from "./components/common/ProtectedRoute";
import RequestPaymentPage from "./pages/dashbaord/requestPayment";
import AnalyticsPage from "./pages/dashbaord/Analaytics";


const DashboardRedirect: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }


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
    <>
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
              <ProtectedRoute requiredRoles={["user"]}>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/send-money"
            element={
              <ProtectedRoute
                requiredRoles={["user"]}
                requiredPermissions={["make_payments"]}
              >
                <SendMoneyPage />
              </ProtectedRoute>
            }
          />
             <Route
            path="/dashboard/request"
            element={
              <ProtectedRoute
                requiredRoles={["user"]}
                requiredPermissions={["make_payments"]}
              >
                <RequestPaymentPage />
              </ProtectedRoute>
            }
          />
              <Route
            path="/dashboard/analytics"
            element={
              <ProtectedRoute
                requiredRoles={["user"]}
          
              >
                <AnalyticsPage />
              </ProtectedRoute>
            }
          />


          {/* Admin Dashboard Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/manage-users"
            element={
              <ProtectedRoute
                requiredRoles={["admin", "superadmin"]}
                requiredPermissions={["view_users"]}
              >
                <AdminManagementPage />
              </ProtectedRoute>
            }
          />

          {/* Super Admin Dashboard Routes */}
          <Route
            path="/super-admin"
            element={
              <ProtectedRoute requiredRoles={["superadmin"]}>
                <SuperAdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/super-admin/admins"
            element={
              <ProtectedRoute
                requiredRoles={["superadmin"]}
                requiredPermissions={["manage_admins"]}
              >
                <AdminManagementPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/transactions"
            element={
              <ProtectedRoute
                requiredPermissions={[
                  "view_transactions",
                  "view_own_transactions",
                ]}
              >
                <TransactionsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/transactions/:id"
            element={
              <ProtectedRoute
                requiredPermissions={[
                  "view_transactions",
                  "view_own_transactions",
                ]}
              >
                <TransactionDetailsPage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#fff",
            color: "#363636",
            border: "1px solid #f0f0f0",
            padding: "12px",
            borderRadius: "8px",
          },

          success: {
            style: {
              border: "1px solid #ebf7ed",
              background: "#f5fbf6",
            },
            iconTheme: {
              primary: "#7DC400",
              secondary: "#fff",
            },
          },
          error: {
            style: {
              border: "1px solid #fbeaea",
              background: "#fef5f5",
            },
            iconTheme: {
              primary: "#e53e3e",
              secondary: "#fff",
            },
          },
        }}
      />
    </>
  );
}

export default App;
