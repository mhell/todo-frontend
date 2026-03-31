import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Login from "../components/login/Login";
import Dashboard from "../components/dashboard/Dashboard";
import Task from "../components/tasks/Task.jsx";
import NotFound from "../components/not_found/NotFound.jsx";
import RoleProtectedRoute from "./RoleProtectedRoute.jsx";
import { TasksProvider } from "../context/TasksContext.jsx"

const AppRoutes = () => {
  const { hasRole } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />

      {/* Dashboard route - only for admin */}
      {hasRole("ROLE_ADMIN") && (
        <Route path="/dashboard" element={
            <RoleProtectedRoute requiredRoles={["ROLE_ADMIN"]}>
              <Dashboard />
            </RoleProtectedRoute>
          }
        />
      )}

      {/* Tasks route - for both admin and user */}
      <Route key="task" path="/dashboard/tasks" element={
          <RoleProtectedRoute requiredRoles={["ROLE_USER", "ROLE_ADMIN"]}>
            <TasksProvider>
              <Task />
            </TasksProvider>
          </RoleProtectedRoute>
        }
      />

      {/* Redirect non-admin users to tasks page when trying to access dashboard */}
      <Route path="/dashboard" element={<Navigate to="/dashboard/tasks" replace />}/>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
