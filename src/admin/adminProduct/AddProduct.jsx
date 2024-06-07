import { Grid, IconButton, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Swal from 'sweetalert2';
import Autocomplete from "@mui/material/Autocomplete";

function AddProducts({ closeEvent }) {
  const [name, setName] = useState("");
  const [unit_price, setPrice] = useState("");
  const [total_quantity, setTotalQuantity] = useState("");
  const [material_id, setMaterialId] = useState("");
  const [material_quantity, setMaterialQuantity] = useState("");
  const [error, setError] = useState("");
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setTotalQuantity(event.target.value);
  };

  const handleMaterialQuantityChange = (event) => {
    setMaterialQuantity(event.target.value);
  };

  const fetchMaterials = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/materials");
      if (!response.ok) {
        throw new Error("Failed to fetch materials");
      }
      const data = await response.json();
      setMaterials(data);
    } catch (error) {
      console.error("Error fetching materials:", error);
    }
  };

  const handleSubmit = () => {
    if (!name || !unit_price || !total_quantity || !material_id || !material_quantity) {
      setError("All fields are required.");
      return;
    }

    // Make POST request to backend
    fetch('http://localhost:3001/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        unit_price,
        total_quantity,
        material_id,
        material_quantity
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to add product');
      }
      return response.json();
    })
    .then(data => {
      console.log('Product created:', data);
      Swal.fire(
        'Success!',
        'Product added successfully.',
        'success'
      );
      // Close the modal after success
      closeEvent();
      window.location.reload();
    })
    .catch((error) => {
      console.error('Error adding product:', error);
      Swal.fire(
        'Error!',
        'Failed to add the product.',
        'error'
      );
      // Close the modal even if there's an error
      closeEvent();
    });
  };

  return (
    <div>
      <Box sx={{ m: 2 }}></Box>
      <Typography variant="h5" align="center">
        Add Product
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
            label="Product Name"
            variant="outlined"
            size="small"
            value={name}
            onChange={handleNameChange}
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            label="Unit Price"
            variant="outlined"
            size="small"
            type="number"
            InputProps={{
              startAdornment: "Rs.",
            }}
            value={unit_price}
            onChange={handlePriceChange}
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            label="Total Quantity"
            variant="outlined"
            size="small"
            type="number"
            InputProps={{
              endAdornment: "Kg",
            }}
            value={total_quantity}
            onChange={handleQuantityChange}
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            value={materials.find(material => material.material_id === material_id) || null}
            onChange={(event, newValue) => {
              if (newValue) {
                setMaterialId(newValue.material_id);
              } else {
                setMaterialId("");
              }
            }}
            id="material-autocomplete"
            options={materials}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} label="Material Name" />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Material Quantity"
            variant="outlined"
            size="small"
            type="number"
            InputProps={{
              endAdornment: "Kg",
            }}
            value={material_quantity}
            onChange={handleMaterialQuantityChange}
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

export default AddProducts;
