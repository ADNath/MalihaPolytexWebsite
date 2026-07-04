import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";
import logo from "../../assets/logo/logo.png";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Products", path: "/products" },
  { name: "Certificates", path: "/certificates" },
  { name: "Contact", path: "/contact" },
];

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
                  Maliha Poly Tex
                </h1>

                <p className="text-sm text-green-700 tracking-wide">
                  Fiber Industry Ltd.
                </p>
              </div>
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex items-center gap-12">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `relative py-2 font-medium transition-colors duration-300 ${
                      isActive
                        ? "text-green-700"
                        : "text-gray-700 hover:text-green-700"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.name}

                      <span
                        className={`absolute left-0 -bottom-1 h-[2px] bg-green-700 transition-all duration-300 ${
                          isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

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

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        navItems={navItems}
      />
    </>
  );
}
