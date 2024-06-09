import React from "react";
import Sidenav from "../bailer/bailerComponents/BailerSidenav";
import Navbar from "../bailer/bailerComponents/BailerNavbar";
import Box from "@mui/material/Box";
import List from "./bailerSetting/List";

function BailerSetting() {
  return (
    <div className="backgroundColor">
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

export default BailerSetting;
