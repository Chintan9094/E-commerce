import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

import { getCurrentUser, logoutUser as logoutService } from "../services/auth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data } = await getCurrentUser();
        if (data.success) {
          setUser(data.user);
        }
      } catch (error) {
        console.log("Not logged in");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  const loginUser = (data) => {
    setUser(data.user);
  };

  const logoutUser = async () => {
    try {
      await logoutService();
      setUser(null);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
