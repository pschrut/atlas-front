import { Link } from "react-router-dom";
import { Divider, Grid, IconButton } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import axiosInstance from "../../axiosConfig";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import useUserStore from "../stores/useUserStore";
import useTransactionsStore from "../stores/useTransactionsStore";

function Settings({ isAdmin }) {
  const fileInputRef = useRef(null);
  const { renewData } = useTransactionsStore();
  const { logout } = useUserStore();
  const navigate = useNavigate();
  const handleFileInputClick = () => {
    fileInputRef.current.value = null;
    fileInputRef.current.click();
  };

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
      .post("upload_transactions", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        renewData();
      });
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <Grid container>
      <IconButton onClick={handleFileInputClick} color="inherit">
        <FileUploadIcon />
      </IconButton>
      {isAdmin && (
        <IconButton color="inherit" component={Link} to="/users">
          <PeopleAltIcon />
        </IconButton>
      )}
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
    </Grid>
  );
}

export default Settings;
