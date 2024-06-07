import React from "react";
import Sidenav from "../supplier/supplierComponents/SupplierSidenav";
import Navbar from "../supplier/supplierComponents/SupplierNavbar";
import Box from "@mui/material/Box";
import "../styles/Dashboard.css";
import CollectionDetails from "./supplierCollectionDetails/CollectionDetails";

function SupplierAbout() {
  return (
    <div className="backgroundColor">
      <Navbar />
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <CollectionDetails />
        </Box>
      </Box>
    </div>
  );
}

export default SupplierAbout;
