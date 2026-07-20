import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import HomePage from "../features/home/HomePage";
import TopManagementPage from "@/features/about/pages/TopManagementPage";
import CompanyProfile from "@/features/about/pages/CompanyProfilePage";
import CurrentOpeningPage from "@/features/career/pages/CurrentOpeningPage";
import JobDetailsPage from "@/features/career/pages/JobDetailsPage";
import WalkInApplicationPage from "@/features/career/pages/WalkInApplicationPage";
import ContactPage from "@/features/contact/pages/ContactPage";
import ProductsPage from "@/features/products/pages/ProductsPage";
import GalleryPage from "@/features/gallery/pages/GalleryPage";
import CertificatesPage from "@/features/certificates/pages/CertificatesPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/about-us/top-management"
            element={<TopManagementPage />}
          />
          <Route
            path="/about-us/company-profile"
            element={<CompanyProfile />}
          />
          <Route
            path="/career/current-opening"
            element={<CurrentOpeningPage />}
          />
          <Route path="/career/:jobId" element={<JobDetailsPage />} />
          <Route
            path="/career/walk-in-application"
            element={<WalkInApplicationPage />}
          />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/product" element={<ProductsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/certificates" element={<CertificatesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
