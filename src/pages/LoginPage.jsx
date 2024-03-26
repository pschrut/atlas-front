import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import axiosInstance from "../../axiosConfig"

const LoginPage = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    try {
      const response = await axiosInstance.postForm("/login", data)
      if (response.status === 200) {
        login()
        return navigate("/dashboard")
      } else {
        alert("Login failed")
      }
    } catch(e) {
      console.error(e)
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="user"
            label="User Name"
            name="user"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default LoginPage