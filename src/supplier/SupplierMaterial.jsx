import React, { useState, useEffect } from "react";
import Sidenav from "../supplier/supplierComponents/SupplierSidenav";
import Navbar from "../supplier/supplierComponents/SupplierNavbar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import "../styles/Dashboard.css";

const StyledCard = styled(Card)(({ theme, outOfStock }) => ({
  width: "100%",
  backgroundColor: outOfStock ? "#ffcccb" : "#f5f5f5",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: theme.shadows[5],
  },
  borderRadius: "10px",
}));

const OutOfStockTypography = styled(Typography)({
  color: "red",
  fontWeight: "bold",
  textAlign: "center",
});

function SupplierMaterial() {
  const [cardData, setCardData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const fetchMaterials = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/materials");
      if (!response.ok) {
        throw new Error("Failed to fetch materials");
      }
      const data = await response.json();
      setCardData(data);
      setFilteredData(data); // Initialize filteredData with fetched data
    } catch (error) {
      console.error("Error fetching materials:", error);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const filterData = (value) => {
    if (!value) {
      setFilteredData(cardData);
    } else {
      setFilteredData(cardData.filter((item) => item.name.includes(value.name)));
    }
  };

  return (
    <div className="backgroundColor">
      <Navbar />
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Paper elevation={3} sx={{ padding: "20px" }}>
            <Typography
              variant="h5"
              component="div"
              align="left"
              sx={{ color: "#1976d2" }}
            >
              Materials
            </Typography>
            <Box height={40} />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={cardData}
              sx={{ width: 300, marginBottom: "20px" }}
              onChange={(e, v) => filterData(v)}
              getOptionLabel={(rows) => rows.name || ""}
              renderInput={(params) => (
                <TextField {...params} label="Search by name" />
              )}
            />
            <Box sx={{ display: "flex" }}>
              <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
                <Grid container spacing={2}>
                  {filteredData.map((material) => (
                    <Grid item xs={12} sm={6} md={4} key={material.material_id}>
                      <Stack direction="row" spacing={2}>
                        <StyledCard outOfStock={material.total_quantity === 0}>
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                              align="center"
                              sx={{ color: "#1976d2" }}
                            >
                              {material.name}
                            </Typography>
                            <Typography
                              gutterBottom
                              variant="body2"
                              component="div"
                              align="center"
                            >
                              Unit Price: Rs {material.unit_price}
                            </Typography>
                            {material.total_quantity === 0 && (
                              <OutOfStockTypography variant="body2">
                                Out of Stock
                              </OutOfStockTypography>
                            )}
                          </CardContent>
                        </StyledCard>
                      </Stack>
                    </Grid>
                  ))}
                </Grid>
                <Box height={30} />
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </div>
  );
}

export default SupplierMaterial;
