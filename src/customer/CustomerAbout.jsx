import React from "react";
import Sidenav from "../customer/customerComponents/CustomerSidenav";
import Navbar from "../customer/customerComponents/CustomerNavbar";
import Box from "@mui/material/Box";
import "../styles/Dashboard.css";
import OrderList from "./customerOrder/OrderList";

function CustomerAbout() {
  return (
    <div className="backgroundColor">
      <Navbar />
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <OrderList />
        </Box>
      </Box>
    </div>
  );
}

export default CustomerAbout;
