import {
  Briefcase,
  Images,
  LayoutDashboard,
  Package,
  Phone,
  Handshake,UsersRound,BookOpenCheck,SquarePlay,
  Award,MailQuestion,Building,File
} from "lucide-react";
import { NavLink } from "react-router-dom";

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
    name: "What we do",
    icon: Handshake,
    path: "/What-we-do",
  },
  {
    name: "Company Video",
    icon: SquarePlay,
    path: "/Company-video",
  },
  {
    name: "Home Page Contact",
    icon: Phone,
    path: "/home-contact",
  },
  {
    name: "Certificate(Homepage)",
    icon: BookOpenCheck,
    path: "/certificate",
  },
  {
    name: "Top Management",
    icon: UsersRound,
    path: "/top-management",
  },
  {
    name: "Company Profile",
    icon: Briefcase,
    path: "/company-profile",
  },
  {
    name: "Products",
    icon: Package,
    path: "/products",
  },
  {
    name: "General Certificates",
    icon: Award,
    path: "/general-certificates",
  },
  {
    name: "Inquiries",
    icon: MailQuestion,
    path: "/Inquiries",
  },  
  {
    name: "Career Dept",
    icon: Building,
    path: "/career-dept",
  },
  {
    name: "Job Opening",
    icon: File,
    path: "/job-opening",
  },
  {
    name: "Job Application",
    icon: File,
    path: "/job-application",
  },
  
  
];

export default function Sidebar() {
  return (
    <aside className="flex w-72 flex-col bg-slate-900 text-white">

      <div className="border-b border-slate-800 p-6">

        <h1 className="text-2xl font-bold tracking-wide">
          MALIHA
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Content Management
        </p>

      </div>

      <nav className="flex-1 space-y-1 p-4">

        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <NavLink
              key={menu.path}
              to={menu.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow"
                    : "text-slate-300 hover:bg-slate-800"
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