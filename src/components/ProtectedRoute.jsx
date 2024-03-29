import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkSession } from "../services/user";
import useUserStore from "../stores/useUserStore";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  useEffect(() => {
    checkSession((isAuthenticated) => {
      if (!isAuthenticated) {
        setUser(null);
        navigate("/login", { replace: true });
      }
    });
  }, []);

  return children;
}
