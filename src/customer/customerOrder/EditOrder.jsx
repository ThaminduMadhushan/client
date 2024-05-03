import { Grid, IconButton, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Swal from 'sweetalert2';
import Autocomplete from "@mui/material/Autocomplete";

function EditOrder({ closeEvent, orderId }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState("");
  const [material, setMaterial] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, [orderId]);

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
    calculatePrice(event.target.value, material);
  };

  const calculatePrice = (quantity, material) => {
    const selectedMaterial = products.find(
      (m) => m.name === material
    );
    if (selectedMaterial) {
      const totalPrice = selectedMaterial.price * parseInt(quantity);
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

    // Make PUT request to backend
    fetch(`http://localhost:3001/api/orders/${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        material,
        quantity: quantityValue,
        price
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update Order');
      }
      return response.json();
    })
    .then(data => {
      console.log('Order updated:', data);
      Swal.fire(
        'Updated!',
        'Your Order has been updated.',
        'success'
      );
      closeEvent();
      window.location.reload();
    })
    .catch((error) => {
      console.error('Error updating Order:', error);
      Swal.fire(
        'Error!',
        'Failed to update the Order.',
        'error'
      );
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
            label="Name"
            variant="outlined"
            size="small"
            value={name}
            onChange={handleNameChange}
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            value={material}
            onChange={(event, newValue) => {
              setMaterial(newValue);
              calculatePrice(quantity, newValue);
            }}
            id="material-autocomplete"
            options={products.map((material) => material.name)}
            renderInput={(params) => (
              <TextField {...params} label="Material Type" />
            )}
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
      </Grid>
      <Box sx={{ m: 2 }}></Box>
      <Button variant="contained" onClick={handleSubmit}>Update</Button>
    </div>
  );
}

export default EditOrder;
