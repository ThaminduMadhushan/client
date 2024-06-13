import React from "react";
import Sidenav from "../customer/customerComponents/CustomerSidenav";
import Navbar from "../customer/customerComponents/CustomerNavbar";
import Box from "@mui/material/Box";
import "../styles/Dashboard.css";
import List from "./customerOrder/List";

function CustomerAbout() {
  return (
    <div color="primary">
      <Navbar />
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <List />
        </Box>
      </Box>
    </div>
  );
}

export default CustomerAbout;
