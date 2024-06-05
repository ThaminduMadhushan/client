import React from "react";
import Sidenav from "../bailer/bailerComponents/BailerSidenav";
import Navbar from "../bailer/bailerComponents/BailerNavbar";
import Box from "@mui/material/Box";
import "../styles/Dashboard.css";
import JobList from "./bailerJobs/JobList";

function bailerJobs() {
  return (
    <div className="backgroundColor">
      <Navbar />
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <JobList />
        </Box>
      </Box>
    </div>
  );
}

export default bailerJobs;
