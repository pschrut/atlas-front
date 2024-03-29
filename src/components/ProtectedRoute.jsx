import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkSession } from "../services/user";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    checkSession((isAuthenticated) => {
      if (!isAuthenticated) {
        navigate("/login", { replace: true });
      }
    });
  }, []);

  return children;
}
