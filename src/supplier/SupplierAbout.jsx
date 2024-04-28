import React from "react";
import Sidenav from "../supplier/supplierComponents/SupplierSidenav";
import Navbar from "../supplier/supplierComponents/SupplierNavbar";
import Box from "@mui/material/Box";
import "../styles/Dashboard.css";
import OrderList from "./supplierOrder/OrderList";

function SupplierAbout() {
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

export default SupplierAbout;
