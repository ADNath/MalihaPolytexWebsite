import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";
import logo from "../../assets/logo/logo.png";
import DesktopNavigation from "./DesktopNavigation";


export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur"
        }`}
      >
        <div className="container mx-auto px-6">
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              isScrolled ? "h-20" : "h-24"
            }`}
          >
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img
                src={logo}
                alt="Maliha Polytex"
                className={`w-auto transition-all duration-300 ${
                  isScrolled ? "h-10" : "h-12"
                }`}
              />

              <div className="hidden lg:block">
                <h1 className="text-xl font-bold text-gray-900">
                  Maliha Poly Tex <span  className="text-15px text-green-700 tracking-wide">Fiber Industry Ltd.</span>
                </h1>
                  
              </div>
            </Link>

            {/* Desktop Menu */}
            <DesktopNavigation />

            {/* Contact Button */}
            <div className="hidden lg:block">
              <Link
                to="/contact"
                className="rounded-full bg-green-700 px-7 py-3.5 font-semibold text-white transition-all duration-300 hover:bg-green-800 hover:-translate-y-0.5 hover:shadow-lg"
              >
                Contact Us
              </Link>
            </div>

            {/* Mobile Button */}
            <button onClick={() => setMenuOpen(true)} className="lg:hidden">
              <Menu size={28} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
