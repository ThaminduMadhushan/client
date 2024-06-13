import React from "react";
import Sidenav from "../customer/customerComponents/CustomerSidenav";
import Navbar from "../customer/customerComponents/CustomerNavbar";
import Box from "@mui/material/Box";
import List from "./customerSetting/List";

function CustomerSetting() {
  return (
    <div color="primary">
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box height={30} />
          <List />
        </Box>
      </Box>
    </div>
  );
}

export default CustomerSetting;
