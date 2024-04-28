import React from "react";
import Sidenav from "../admin/adminComponents/AdminSidenav";
import Navbar from "../admin/adminComponents/AdminNavbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "./adminSetting/List";

function AdminSetting() {
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

export default AdminSetting;
