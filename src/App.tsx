import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import AuthLayout from "./auth/AuthLayout";
import Login from "./auth/pages/Login";
import Register from "./auth/pages/Register";
import AuthProvider from "./context/AuthContext";
import Dashboard from "./admin/pages/Dashboard";
import AdminLayout from "./admin/AdminLayout";
import ProtectedRoute from "./pages/ProtectedRoute";
import Organisations from "./admin/pages/Organisations";
import Teachers from "./admin/pages/Teachers";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin/organisations" element={<Organisations />} />
              <Route path="/admin/teachers" element={<Teachers />} />
            </Route>
          </Route>
          <Route
            path="*"
            element={
              <div className="flex justify-center bg-black items-center h-screen">
                <p className="text-red-500">404 not found</p>
              </div>
            }
          />
        </Routes>
      </AuthProvider>
    </>
  );
}
export default App;
