import { useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosConfig";
import { checkSession } from "../services/user";
import useUserStore from "../stores/useUserStore";
import { Paper } from "@mui/material";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, setUser } = useUserStore();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      await login(data);
      return navigate("/dashboard");
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    checkSession((isAuthenticated) => {
      if (isAuthenticated) {
        navigate("/dashboard");
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <Box mt={8}>
        <Paper elevation={5} sx={{p: 5}}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
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
        </Paper>
      </Box>
    </Container>
  );
}
