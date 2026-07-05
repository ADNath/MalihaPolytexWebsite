import { useEffect } from "react";
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
  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-[999] transition-all duration-300 ${
        open
          ? "visible bg-black/50 opacity-100"
          : "invisible bg-black/0 opacity-0"
      }`}
    >
      <aside
        onClick={(e) => e.stopPropagation()}
        className={`absolute right-0 top-0 flex h-full w-80 flex-col bg-white shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-primary">
            Menu
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-lg p-2 transition hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation */}

        <nav className="flex flex-1 flex-col gap-2 p-6">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `rounded-xl px-4 py-3 text-lg font-medium transition-colors duration-300 ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-primary/10 hover:text-primary"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Button */}

        <div className="border-t border-gray-200 p-6">
          <NavLink
            to="/contact"
            onClick={onClose}
            className="block rounded-full bg-primary py-4 text-center font-semibold text-white transition hover:bg-primary/90"
          >
            Contact Us
          </NavLink>
        </div>
      </aside>
    </div>
  );
}