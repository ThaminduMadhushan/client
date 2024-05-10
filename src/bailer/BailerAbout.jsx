import React from "react";
import Sidenav from "../bailer/bailerComponents/BailerSidenav";
import Navbar from "../bailer/bailerComponents/BailerNavbar";
import Box from "@mui/material/Box";
import "../styles/Dashboard.css";
import OrderList from "./bailerOrder/OrderList";

function BailerAbout() {
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

export default BailerAbout;
