import { NavLink } from "react-router-dom";
import { X } from "lucide-react";

type NavItem = {
  name: string;
  path: string;
};

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  navItems: NavItem[];
}

export default function MobileMenu({
  open,
  onClose,
  navItems,
}: MobileMenuProps) {
  return (
    <div
      className={`fixed inset-0 z-[999] transition-all duration-300 ${
        open
          ? "visible bg-black/50 opacity-100"
          : "invisible opacity-0"
      }`}
    >
      <div
        className={`absolute right-0 top-0 h-full w-80 bg-white shadow-xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-xl font-bold text-green-700">
            Menu
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <X size={26} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col p-6">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `rounded-lg px-4 py-4 text-lg font-medium transition ${
                  isActive
                    ? "bg-green-700 text-white"
                    : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Button */}
        <div className="absolute bottom-8 left-6 right-6">
          <NavLink
            to="/contact"
            onClick={onClose}
            className="block rounded-full bg-green-700 py-4 text-center font-semibold text-white transition hover:bg-green-800"
          >
            Contact Us
          </NavLink>
        </div>
      </div>
    </div>
  );
}