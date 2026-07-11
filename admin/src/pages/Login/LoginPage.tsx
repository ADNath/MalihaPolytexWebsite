import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "@/hooks/useAuth";
import { login } from "@/services/authApi";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login: saveToken } = useAuth();

  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await login({
        username,
        password,
      });

      if (!response.success) {
        setError(response.message);
        return;
      }

      saveToken(response.data.token);

      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.log(err);

      setError("Invalid username or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-lg bg-white p-8 shadow"
      >
        <h1 className="mb-6 text-center text-2xl font-bold">
          Maliha Polytex Admin
        </h1>

        <input
          className="mb-4 w-full rounded border p-3"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="mb-4 w-full rounded border p-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

        <button
          disabled={loading}
          className="w-full rounded bg-blue-600 p-3 text-white"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
