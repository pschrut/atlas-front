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

function Header() {
  const fileInputRef = useRef(null);
  const { renewData } = useTransactionsStore();
  const handleFileInputClick = () => fileInputRef.current.click();

  const handleFileChange = (event) => {
    const files = event.target.files;
    uploadTransactions(files);
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
        <div style={{ flexGrow: 1 }} />
        <IconButton onClick={handleFileInputClick} color="inherit">
          <FileUploadIcon />
        </IconButton>
        <IconButton color="inherit">
          <PeopleAltIcon />
        </IconButton>
        <Divider orientation="vertical" variant="middle" flexItem />
        <IconButton color="inherit">
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
