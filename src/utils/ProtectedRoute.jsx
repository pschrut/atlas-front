import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useEffect } from "react"
import axiosInstance from "../../axiosConfig"

const ProtectedRoute = ({ children }) => {
  const { handleAuth, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const verifySession = async () => {
    try {
      const response = await axiosInstance.get("/check_session")
      handleAuth(response.data.isAuthenticated)
    } catch(e) {
      console.error(e)
      handleAuth(false)
    }
  }

  useEffect(() => { verifySession() }, [])
  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/login", { replace: true })
    }
  }, [isAuthenticated])

  return children
}

export default ProtectedRoute