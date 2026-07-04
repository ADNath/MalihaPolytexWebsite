import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function MainLayout() {
    return (
        <>
            <TopBar />
            <Navbar />

            <main>
                <Outlet />
            </main>

            <Footer />
        </>
    );
}