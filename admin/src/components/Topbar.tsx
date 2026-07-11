import { useNavigate } from "react-router-dom";

import useAuth from "@/hooks/useAuth";

export default function Topbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <h2 className="text-lg font-semibold">
        Admin Panel
      </h2>

      <button
        onClick={handleLogout}
        className="rounded bg-red-500 px-4 py-2 text-white"
      >
        Logout
      </button>
    </header>
  );
}