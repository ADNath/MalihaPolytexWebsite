import { Menu, User } from "lucide-react";
import Button from "@/components/ui/Button";
import useAuth from "@/hooks/useAuth";

export default function Topbar() {
  const { logout } = useAuth();

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 shadow-sm">
      <div className="flex items-center gap-3">
        <button className="rounded-lg p-2 hover:bg-gray-100">
          <Menu size={20} />
        </button>

        <h1 className="text-xl font-semibold text-gray-800">
          Maliha Polytex CMS
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 rounded-lg border px-3 py-2">
          <User size={18} />

          <span className="text-sm font-medium">
            Administrator
          </span>
        </div>

        <Button
          variant="outline"
          onClick={logout}
        >
          Logout
        </Button>
      </div>
    </header>
  );
}