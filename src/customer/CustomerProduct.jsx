import React, { useState, useEffect } from "react";
import Sidenav from "../customer/customerComponents/CustomerSidenav";
import Navbar from "../customer/customerComponents/CustomerNavbar";
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

function CustomerProduct() {
  const [cardData, setCardData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setCardData(data);
      setFilteredData(data); // Initialize filtered data with all products
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
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
              Products
            </Typography>
            <Box height={40} />
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={cardData}
                sx={{ width: 300, marginLeft: "20px" }}
                onChange={(e, v) => filterData(v)}
                getOptionLabel={(rows) => rows.name || ""}
                renderInput={(params) => (
                  <TextField {...params} label="Search by name" />
                )}
              />
            <Box sx={{ display: "flex" }}>
              <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
                <Grid container spacing={2}>
                  {filteredData.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product.product_id}>
                      <Stack direction="row" spacing={2}>
                        <StyledCard outOfStock={product.total_quantity === 0}>
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                              align="center"
                              sx={{ color: "#1976d2" }}
                            >
                              {product.name}
                            </Typography>
                            <Typography
                              gutterBottom
                              variant="body2"
                              component="div"
                              align="center"
                            >
                              Unit Price: Rs{product.unit_price}
                            </Typography>
                            <Typography
                              gutterBottom
                              variant="body2"
                              component="div"
                              align="center"
                            >
                              Available Quantity: {product.total_quantity}
                            </Typography>
                            {product.total_quantity === 0 && (
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

export default CustomerProduct;
