import React from "react";
import Sidenav from "../driver/driverComponents/DriverSidenav";
import Navbar from "../driver/driverComponents/DriverNavbar";
import Box from "@mui/material/Box";
import SalaryList from "./driverSalaryDetails/SalaryList";

function DriverSalary() {
  return (
    <div className="backgroundColor">
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box height={30} />
          <SalaryList />
        </Box>
      </Box>
    </div>
  );
}

export default DriverSalary;
