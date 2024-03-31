import { useRef } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import Divider from "@mui/material/Divider";
import axiosInstance from "../../axiosConfig";
import useTransactionsStore from "../stores/useTransactionsStore";
import useUserStore from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import PeriodsFilter from "./PeriodsFilter";

function Header() {
  const fileInputRef = useRef(null);
  const { setIgnoreLowValues, renewData } = useTransactionsStore();
  const user = useUserStore((state) => state.user);
  const { logout } = useUserStore();
  const navigate = useNavigate();
  const handleFileInputClick = () => fileInputRef.current.click();

  const handleFileChange = (event) => {
    const files = event.target.files;
    uploadTransactions(files);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleIgnoreLowValues = (e) => {
    setIgnoreLowValues(e.target.checked);
  };

  const uploadTransactions = async (files) => {
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("file", files[i]);
    }
    axiosInstance
      .post("/upload_transactions", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        renewData();
      });
  };

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
        <Typography variant="h5" component="div">
          {user && user.username}
        </Typography>
        <Box sx={{ ml: 3 }}>
          <PeriodsFilter />
        </Box>
        <Box>
          <FormControlLabel
            value="hidelowvalues"
            control={<Switch color="default" defaultChecked />}
            label="Hide ints."
            labelPlacement="start"
            onChange={handleIgnoreLowValues}
          />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <FormControlLabel
            value="hideinvestments"
            control={<Switch color="default" defaultChecked />}
            label="Hide invs."
            labelPlacement="start"
          />
        </Box>
        <IconButton onClick={handleFileInputClick} color="inherit">
          <FileUploadIcon />
        </IconButton>
        <IconButton color="inherit">
          <PeopleAltIcon />
        </IconButton>
        <Divider orientation="vertical" variant="middle" flexItem />
        <IconButton color="inherit" onClick={handleLogout}>
          <LogoutIcon />
        </IconButton>
        <input
          type="file"
          multiple
          accept=".xml,application/xml,text/xml"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
