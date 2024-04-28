import React from "react";
import Sidenav from "../employee/employeeComponents/EmployeeSidenav";
import Navbar from "../employee/employeeComponents/EmployeeNavbar";
import Box from "@mui/material/Box";
import "../styles/Dashboard.css";
import OrderList from "./employeeOrder/OrderList";

function EmployeeAbout() {
  return (
    <div className="backgroundColor">
      <Navbar />
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>About</h1>
          <OrderList />
        </Box>
      </Box>
    </div>
  );
}

export default EmployeeAbout;
