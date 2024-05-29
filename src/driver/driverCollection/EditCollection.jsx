import { Grid, IconButton, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";
import Autocomplete from "@mui/material/Autocomplete";

function EditCollection({ closeEvent, orderId }) {
  const [name, setName] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, [products]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
    calculatePrice(event.target.value, selectedProduct);
  };

  const calculatePrice = (quantity, selectedProduct) => {
    if (selectedProduct) {
      const totalPrice = selectedProduct.unit_price * parseInt(quantity);
      setPrice(totalPrice);
    }
  };

  const handleSubmit = () => {
    // Convert quantity to a number
    const quantityValue = parseInt(quantity);

    if (isNaN(quantityValue)) {
      setError("Quantity must be a number.");
      return;
    }

    if (!selectedProduct) {
      setError("Please select a product.");
      return;
    }

    // Make PUT request to backend
    fetch(`http://localhost:3001/api/orders/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        product_id: selectedProduct.product_id,
        quantity: quantityValue,
        price,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update Order");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Order updated:", data);
        Swal.fire("Updated!", "Your Order has been updated.", "success");
        closeEvent();
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating Order:", error);
        Swal.fire("Error!", "Failed to update the Order.", "error");
        closeEvent();
      });
  };

  return (
    <div>
      <Box sx={{ m: 2 }}></Box>
      <Typography variant="h5" align="center">
        Edit Order
      </Typography>
      <IconButton
        style={{ position: "absolute", top: 0, right: 0 }}
        onClick={closeEvent}
      >
        <CloseIcon />
      </IconButton>
      <Box height={20}></Box>
      <Box height={20}></Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Order Name"
            variant="outlined"
            size="small"
            value={name}
            onChange={handleNameChange}
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            value={selectedProduct}
            onChange={(event, newValue) => {
              setSelectedProduct(newValue);
              calculatePrice(quantity, newValue);
            }}
            id="product-autocomplete"
            options={products}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label="Product" />}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            label="Quantity"
            variant="outlined"
            size="small"
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            InputProps={{
              endAdornment: "Kg",
            }}
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            label="Price"
            variant="outlined"
            size="small"
            type="text"
            value={price}
            readOnly
            sx={{ width: "100%" }}
          />
        </Grid>
        {error && (
          <Grid item xs={12}>
            <Typography variant="body2" color="error" align="center">
              {error}
            </Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            <Button variant="contained" onClick={handleSubmit}>
              Update
            </Button>
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ m: 2 }}></Box>
    </div>
  );
}

export default EditCollection;
