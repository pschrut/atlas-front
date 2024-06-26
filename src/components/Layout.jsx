import { Outlet } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Header from "./Header";

export default function Layout({ page }) {
  return (
    <Grid container justifyContent="center" gap={2} mt={2}>
      <Grid item xs={11}>
        <Header page={page} />
      </Grid>
      <Grid item xs={11}>
        <Outlet />
      </Grid>
    </Grid>
  );
}
