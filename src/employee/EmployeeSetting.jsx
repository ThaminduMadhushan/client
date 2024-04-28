import React from "react";
import Sidenav from "../employee/employeeComponents/EmployeeSidenav";
import Navbar from "../employee/employeeComponents/EmployeeNavbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "./employeeSetting/List";

function EmployeeSetting() {
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

export default EmployeeSetting;
