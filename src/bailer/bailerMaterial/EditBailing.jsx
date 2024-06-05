import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Grid, Typography, Autocomplete } from "@mui/material";
import Swal from "sweetalert2";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function EditBailing({ closeEvent, bailingDetails }) {
  const [bailingName, setBailingName] = useState(bailingDetails.bailing_name);
  const [productId, setProductId] = useState(bailingDetails.product_id);
  const [productQuantity, setProductQuantity] = useState(bailingDetails.product_quantity);
  const [materialId, setMaterialId] = useState(bailingDetails.material_id);
  const [materialQuantity, setMaterialQuantity] = useState(bailingDetails.material_quantity);
  const [products, setProducts] = useState([]);
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchMaterials();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchMaterials = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/materials");
      const data = await response.json();
      setMaterials(data);
    } catch (error) {
      console.error("Error fetching materials:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/api/bailings/${bailingDetails.bailing_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bailing_name: bailingName,
          product_id: productId,
          product_quantity: productQuantity,
          material_id: materialId,
          material_quantity: materialQuantity,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update bailing");
      }

      Swal.fire("Updated!", "Your bailing has been updated.", "success");
      closeEvent();
      window.location.reload();
    } catch (error) {
      console.error("Error updating bailing:", error);
      Swal.fire("Error!", "Failed to update the bailing.", "error");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Typography variant="h5" align="center">Edit Bailing</Typography>
      <IconButton
        style={{ position: "absolute", top: 0, right: 0 }}
        onClick={closeEvent}
      >
        <CloseIcon />
      </IconButton>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Bailing Name"
            autoFocus
            value={bailingName}
            onChange={(e) => setBailingName(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            options={products}
            sx={{ marginTop: 2 }}
            getOptionLabel={(option) => option.name}
            onChange={(event, newValue) => setProductId(newValue?.product_id || productId)}
            defaultValue={products.find(product => product.product_id === bailingDetails.product_id)}
            renderInput={(params) => <TextField {...params} label="Product Name" />}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Product Quantity"
            value={productQuantity}
            onChange={(e) => setProductQuantity(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            options={materials}
            sx={{ marginTop: 2 }}
            getOptionLabel={(option) => option.name}
            onChange={(event, newValue) => setMaterialId(newValue?.material_id || materialId)}
            defaultValue={materials.find(material => material.material_id === bailingDetails.material_id)}
            renderInput={(params) => <TextField {...params} label="Material Name" />}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Material Quantity"
            value={materialQuantity}
            onChange={(e) => setMaterialQuantity(e.target.value)}
          />
        </Grid>
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Update Bailing
      </Button>
    </Box>
  );
}

export default EditBailing;
