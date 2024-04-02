import { Link } from "react-router-dom";
import Filters from "./Filters";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import useUserStore from "../stores/useUserStore";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Settings from "./Settings";

function Header({ page }) {
  const user = useUserStore((state) => state.user);

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{
        borderRadius: 3,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        color: "white",
      }}
    >
      <Toolbar>
        <Typography
          variant="h5"
          component={Link}
          to="/dashboard"
          sx={{ textDecoration: "none", color: "inherit" }}
        >
          {user && user.username}
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          { page === "dashboard" && <Filters /> }
        </Box>
        <Box>
          <Settings />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
