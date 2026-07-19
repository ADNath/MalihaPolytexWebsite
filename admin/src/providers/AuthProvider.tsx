import { useState, type ReactNode } from "react";

import { AuthContext } from "@/contexts/AuthContext";

interface Props {
  children: ReactNode;
}
function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

export default function AuthProvider({ children }: Props) {
  const [token, setToken] = useState<string | null>(() => {
    const stored = localStorage.getItem("token");

    if (!stored) return null;

    if (isTokenExpired(stored)) {
      localStorage.removeItem("token");
      return null;
    }

    return stored;
  });

  const login = (jwt: string) => {
    localStorage.setItem("token", jwt);
    setToken(jwt);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
