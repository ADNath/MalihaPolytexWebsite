import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Images,
  Package,
  Image,
  Briefcase,
  Phone,
  Settings,
} from "lucide-react";

const menus = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "Hero Slider",
    icon: Images,
    path: "/hero-slides",
  },
  {
    name: "Products",
    icon: Package,
    path: "/products",
  },
  {
    name: "Gallery",
    icon: Image,
    path: "/gallery",
  },
  {
    name: "Careers",
    icon: Briefcase,
    path: "/careers",
  },
  {
    name: "Contact",
    icon: Phone,
    path: "/contact",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-800 text-white">
      <div className="border-b border-slate-700 p-6">
        <h1 className="text-xl font-bold">
          Maliha Admin
        </h1>
      </div>

      <nav className="mt-4">
        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <NavLink
              key={menu.path}
              to={menu.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 transition ${
                  isActive
                    ? "bg-blue-600"
                    : "hover:bg-slate-700"
                }`
              }
            >
              <Icon size={18} />

              {menu.name}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}