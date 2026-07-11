import { Navigate, Route, Routes } from "react-router-dom";

import useAuth from "@/hooks/useAuth";

import DashboardLayout from "@/layouts/DashboardLayout";

import DashboardPage from "@/pages/Dashboard/DashboardPage";
import LoginPage from "@/pages/Login/LoginPage";
import HeroSlidesPage from "./pages/HeroSlides/HeroSlidesPage";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
        }
      />

      <Route path="/login" element={<LoginPage />} />

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* Hero Slider */}
        <Route path="/hero-slides" element={<HeroSlidesPage />} />

        {/* Products */}
        <Route path="/products" element={<h1>Products</h1>} />

        {/* Gallery */}
        <Route path="/gallery" element={<h1>Gallery</h1>} />

        {/* Careers */}
        <Route path="/careers" element={<h1>Careers</h1>} />

        {/* Contact */}
        <Route path="/contact" element={<h1>Contact</h1>} />

        {/* Settings */}
        <Route path="/settings" element={<h1>Settings</h1>} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
