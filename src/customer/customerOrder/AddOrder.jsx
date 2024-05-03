import React, { useState, useEffect } from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";
import Autocomplete from "@mui/material/Autocomplete";

function AddOrder({ closeEvent }) {
  const [name, setName] = useState("");
  const [material, setMaterial] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

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
    const quantityValue = parseInt(quantity);
    if (isNaN(quantityValue)) {
      setError("Quantity must be a number.");
      return;
    }

    fetch("http://localhost:3001/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        material,
        quantity: quantityValue,
        price,
        status,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add order.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Order created:", data);
        Swal.fire("Success!", "Order added successfully.", "success");
        closeEvent();
        window.location.reload(); // Reload the page after successful order addition
      })
      .catch((error) => {
        console.error("Error adding order:", error);
        Swal.fire("Error!", "Failed to add the order.", "error");
        closeEvent();
      });
  };

  return (
    <div>
      <Box sx={{ m: 2 }}></Box>
      <Typography variant="h5" align="center">
        Add Order
      </Typography>
      <IconButton
        style={{ position: "absolute", top: 0, right: 0 }}
        onClick={closeEvent}
      >
        <CloseIcon />
      </IconButton>
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

        {error && (
          <Typography variant="body2" color="error" align="center">
            {error}
          </Typography>
        )}
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ m: 2 }}></Box>
    </div>
  );
}

export default AddOrder;
