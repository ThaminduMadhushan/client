import React from "react";
import Sidenav from "../bailer/bailerComponents/BailerSidenav";
import Navbar from "../bailer/bailerComponents/BailerNavbar";
import Box from "@mui/material/Box";
import SalaryList from "./bailerSalary/SalaryList";

function BailerSalaryDetails() {
  return (
    <div color="primary">
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

export default BailerSalaryDetails;
