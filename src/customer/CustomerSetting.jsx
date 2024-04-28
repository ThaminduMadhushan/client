import React from "react";
import Sidenav from "../customer/customerComponents/CustomerSidenav";
import Navbar from "../customer/customerComponents/CustomerNavbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "./customerSetting/List";

function CustomerSetting() {
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

export default CustomerSetting;
