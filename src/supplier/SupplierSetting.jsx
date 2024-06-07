import React from "react";
import Sidenav from "../supplier/supplierComponents/SupplierSidenav";
import Navbar from "../supplier/supplierComponents/SupplierNavbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "./supplierSetting/List";

function SupplierSetting() {
  return (
    <div className="backgroundColor">
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <List />
        </Box>
      </Box>
    </div>
  );
}

export default SupplierSetting;
