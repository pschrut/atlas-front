import React, { useEffect, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import useTransactionsStore from "../stores/useTransactionsStore";

export default function PeriodsFilter() {
  const periods = useTransactionsStore((state) => state.periods);
  const currentPeriod = useTransactionsStore((state) => state.currentPeriod);
  const { fetchPeriods, renewData, setCurrentPeriod } = useTransactionsStore();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    fetchPeriods();
    if (periods.length > 0) {
      setCurrentPeriod(periods[0]);
    }
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
    if (!event.target.id) return;

    if (event.target.id === "ALL") {
      setCurrentPeriod({ id: "ALL", description: "All" });
      return renewData("ALL");
    }

    const selected = periods.find((period) => period.id === event.target.id);
    setCurrentPeriod(selected);
    renewData(event.target.id);
  };

  return (
    <Box
      sx={{
        height: 40,
        borderRadius: 2,
        bgcolor: open ? "grey" : "inherit",
      }}
    >
      <Button
        onClick={handleClick}
        variant="outlined"
        sx={{
          minWidth: 170,
          bgcolor: "white",
          color: "#000",
          textTransform: "none",
          pr: 0.5,
          "&:hover": { bgcolor: "#fff" },
        }}
      >
        <Typography flexGrow={1}>
          {currentPeriod.description || periods[0]?.description}
        </Typography>
        {open ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
      </Button>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <MenuItem key="ALL" id="ALL" onClick={handleClose}>
          All
        </MenuItem>
        {periods.map((period, index) => (
          <MenuItem
            key={period.id}
            id={period.id}
            selected={currentPeriod === period.id}
            onClick={handleClose}
          >
            {period.description}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
