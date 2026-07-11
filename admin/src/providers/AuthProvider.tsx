import { useState, type ReactNode } from "react";

import { AuthContext } from "@/contexts/AuthContext";

interface Props {
  children: ReactNode;
}

export default function AuthProvider({ children }: Props) {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );

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