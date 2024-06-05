import React from "react";
import Sidenav from "../bailer/bailerComponents/BailerSidenav";
import Navbar from "../bailer/bailerComponents/BailerNavbar";
import Box from "@mui/material/Box";
import List from "./bailerMaterial/List";

function BailerMaterial() {
  return (
    <div className="backgroundColor">
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

export default BailerMaterial;