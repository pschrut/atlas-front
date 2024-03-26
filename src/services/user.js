import axiosInstance from "../../axiosConfig"

export const checkSession = async (callbackFn) => {
  try {
    const authResponse = await axiosInstance.get("/check_session")
    return callbackFn(authResponse.data.isAuthenticated)
  } catch(e) {
    console.error(e)
    return false
  }
}