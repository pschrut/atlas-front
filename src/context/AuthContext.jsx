import { createContext, useContext, useState } from "react"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  const handleAuth = (isAuth) => setIsAuthenticated(isAuth)

  const login = () => setIsAuthenticated(true)
  const logout = () => setIsAuthenticated(false)

  return (
    <AuthContext.Provider value={{ handleAuth, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)