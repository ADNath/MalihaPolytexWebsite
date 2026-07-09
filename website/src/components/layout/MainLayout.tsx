import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";
import Navbar from "./Navbar";
import Footer from "./Footer/Footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <TopBar />
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}