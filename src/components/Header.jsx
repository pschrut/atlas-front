import { useState } from "react"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import MenuItem from "@mui/material/MenuItem"
import Menu from "@mui/material/Menu"
import SettingsIcon from "@mui/icons-material/Settings"
import { Typography } from "@mui/material"
import { Link } from "react-router-dom"
import Box from "@mui/material/Box"

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleMenu = (event) => setAnchorEl(event.currentTarget)
  const handleClose = () =>  setAnchorEl(null)

  return (
    <Box mb={2}>
        <AppBar position="static" color="default" elevation={0}>
            <Toolbar>
                <Typography variant="h6">Dashboard</Typography>
                <div style={{flexGrow: 1}} />
                <IconButton onClick={handleMenu} color="inherit">
                    <SettingsIcon />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose} component={Link} to="/logout">Logout</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    </Box>
  )
}

export default Header