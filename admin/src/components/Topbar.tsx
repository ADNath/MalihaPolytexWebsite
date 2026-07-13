import { LogOut, UserCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Button from "@/components/ui/Button";
import useAuth from "@/hooks/useAuth";

export default function Topbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-8 shadow-sm">
      <div>
        <h1 className="text-xl font-bold text-gray-800">
          Maliha Polytex CMS
        </h1>

        <p className="text-sm text-gray-500">
          Website Content Management
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 rounded-lg border bg-gray-50 px-3 py-2">
          <UserCircle2 size={20} />
          <span className="text-sm font-medium">
            Administrator
          </span>
        </div>

        <Button
          variant="danger"
          onClick={handleLogout}
        >
          <LogOut size={16} />
          <span className="ml-2">Logout</span>
        </Button>
      </div>
    </header>
  );
}