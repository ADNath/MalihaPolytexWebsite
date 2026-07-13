import { NavLink } from "react-router-dom";
import {
  House,
  Images,
  Boxes,
  Image,
  FileBadge,
  Users,
  Briefcase,
  Phone,
  Settings,
} from "lucide-react";
import clsx from "clsx";

const menus = [
  {
    title: "Hero Slider",
    path: "/hero-slides",
    icon: Images,
  },
  {
    title: "What we do",
    path: "/what-we-do",
    icon: House,
  },
  {
    title: "Products",
    path: "/products",
    icon: Boxes,
  },
  {
    title: "Gallery",
    path: "/gallery",
    icon: Image,
  },
  {
    title: "Certificates",
    path: "/certificates",
    icon: FileBadge,
  },
  {
    title: "Management",
    path: "/management",
    icon: Users,
  },
  {
    title: "Careers",
    path: "/careers",
    icon: Briefcase,
  },
  {
    title: "Contact",
    path: "/contact",
    icon: Phone,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <aside className="w-72 border-r border-slate-800 bg-slate-900 text-white shadow-xl">
      <div className="border-b border-slate-800 p-6">
        <h2 className="text-2xl font-bold tracking-wide">MALIHA POLYTEX</h2>

        <p className="mt-1 text-sm text-slate-400">Content Management</p>
      </div>

      <nav className="p-4 space-y-1">
        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <NavLink
              key={menu.path}
              to={menu.path}
              className={({ isActive }) =>
                clsx(
                  "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-blue-600 shadow-lg"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white",
                )
              }
            >
              <Icon size={18} />

              {menu.title}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
