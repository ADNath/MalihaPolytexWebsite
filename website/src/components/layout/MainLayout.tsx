import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer/Footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />

      <main className="pt-[136px]">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}