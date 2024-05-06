import { Grid, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Swal from 'sweetalert2';

function EditProduct({ closeEvent, productId }) {
  const [name, setName] = useState("");
  const [unit_price, setPrice] = useState("");
  const [error, setError] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleSubmit = () => {

    // Make PUT request to backend
    fetch(`http://localhost:3001/api/products/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        unit_price // Send the parsed integer value for quantity
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update product');
      }
      return response.json();
    })
    .then(data => {
      console.log('Product updated:', data);
      Swal.fire(
        'Updated!',
        'Your product has been updated.',
        'success'
      );
      closeEvent();
      window.location.reload();
    })
    .catch((error) => {
      console.error('Error updating product:', error);
      Swal.fire(
        'Error!',
        'Failed to update the product.',
        'error'
      );
      closeEvent();
    });
  };

  return (
    <div>
      <Box sx={{ m: 2 }}></Box>
      <Typography variant="h5" align="center">
        Edit Product
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
          <TextField
            id="outlined-basic"
            label="Price"
            variant="outlined"
            size="small"
            type="number"
            InputProps={{
              startAdornment: "Rs.",
            }}
            value={unit_price}
            onChange={handlePriceChange}
            sx={{ width: "100%" }}
          >
          </TextField>
        </Grid>
        
        {error && (
          <Typography variant="body2" color="error" align="center">
            {error}
          </Typography>
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

export default EditProduct;
