import React from "react";
import Sidenav from "../driver/driverComponents/DriverSidenav";
import Navbar from "../driver/driverComponents/DriverNavbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "../driver/driverSetting/List";

function DriverSetting() {
  return (
    <div className="backgroundColor">
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Setting</h1>
          <List />
        </Box>
      </Box>
    </div>
  );
}

export default DriverSetting;
