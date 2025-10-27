import React, { createContext, useEffect, useState } from "react";

interface IAuthValue {
  token: string | null;
  isLoading: boolean;
  login: (token: string) => void;
  logOut: () => void;
  authinticated: boolean;
}

export const AuthContext = createContext<IAuthValue>({} as IAuthValue);
interface IProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: IProps) => {
  const [token, setToken] = useState<null | string>(null);
  const [authinticated, setAuthinticated] = useState<boolean>(
    !!localStorage.getItem("token")
  );
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      setAuthinticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);
    setAuthinticated(true);
  };
  const logOut = () => {
    localStorage.removeItem("token");
    setToken(null);
    setAuthinticated(false);
  };

  const AuthStaff: IAuthValue = {
    token,
    isLoading,
    login,
    logOut,
    authinticated,
  };

  return (
    <AuthContext.Provider value={AuthStaff}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
