import { Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "@/pages/Login/LoginPage";
import DashboardPage from "@/pages/Dashboard/DashboardPage";
import HeroSlidesPage from "@/pages/HeroSlides/HeroSlidesPage";
import WhatWeDoPage from "@/pages/WhatWeDo/WhatWeDoPage";

import AdminLayout from "@/layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";
import CompanyVideosPage from "@/pages/CompanyVideos/CompanyVideosPage";
import CertificatesPage from "@/pages/Certificates/CertificatesPage";
import HomepageContactsPage from "@/pages/HomepageContacts/homePageContactPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Navigate to="/hero-slides" replace />} />

        <Route path="/dashboard" element={<DashboardPage />} />

        <Route path="/hero-slides" element={<HeroSlidesPage />} />

        <Route path="/what-we-do" element={<WhatWeDoPage />} />

        <Route path="/company-video" element={<CompanyVideosPage />} />
        <Route path="/certificate" element={<CertificatesPage />} />
        <Route path="/home-contact" element={<HomepageContactsPage />} />

        <Route path="*" element={<Navigate to="/hero-slides" replace />} />
      </Route>
    </Routes>
  );
}
