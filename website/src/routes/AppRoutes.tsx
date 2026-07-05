import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import HomePage from "../features/home/HomePage";
import TopManagementPage from "@/features/about/pages/TopManagementPage";

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
