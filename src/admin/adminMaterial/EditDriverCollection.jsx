import React, { useState, useEffect } from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";
import Autocomplete from "@mui/material/Autocomplete";

function EditDriverCollection({ closeEvent, collectionId, collectionDetails, materials, adminId, userId, binId }) {
  const [collectionName, setCollectionName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [price, setPrice] = useState(0);
  const [driverName, setDriverName] = useState("");
  const [driverId, setDriverId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (collectionDetails && materials.length > 0) {
      setCollectionName(collectionDetails.collection_name);
      setQuantity(collectionDetails.quantity);
      setSelectedMaterial(collectionDetails.material_name);
      setDriverName(collectionDetails.driver_name);
      setDriverId(collectionDetails.driver_id);
      calculatePrice(collectionDetails.quantity, collectionDetails.material_name);
    }
  }, [collectionDetails, materials]);

  useEffect(() => {
    if (driverId) {
      fetchCollectorId(driverId);
    }
  }, [driverId]);

  const handleNameChange = (event) => {
    setCollectionName(event.target.value);
  };

  const handleQuantityChange = (event) => {
    const newQuantity = event.target.value;
    setQuantity(newQuantity);
    calculatePrice(newQuantity, selectedMaterial);
  };

  const handleMaterialChange = (event, newValue) => {
    setSelectedMaterial(newValue);
    calculatePrice(quantity, newValue);
  };

  const handleDriverChange = (event) => {
    setDriverName(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      // Fetch material_id using material name
      const selectedMaterial = selectedMaterial;
      const materialId = materials.find(
        (material) => material.name === selectedMaterial
      )?.material_id;

      // Make POST request to backend
      const response = await fetch("http://localhost:3001/api/collection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          admin_id: adminId,
          user_id: driverId,
          material_id: materialId,
          quantity,
          price
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add Collection");
      }

      const data = await response.json();
      console.log("Collection created:", data);
      Swal.fire("Success!", "Collection added successfully.", "success");
      // Close the modal after success
      closeEvent();
      window.location.reload();
    } catch (error) {
      console.error("Error adding Collection:", error);
      Swal.fire("Error!", "Failed to add the Collection.", "error");
      // Close the modal even if there's an error
      closeEvent();
    }
  };

  const calculatePrice = (quantity, selectedMaterial) => {
    if (selectedMaterial) {
      const material = materials.find((mat) => mat.name === selectedMaterial);
      if (material) {
        const totalPrice = material.unit_price * parseInt(quantity);
        setPrice(totalPrice);
      }
    }
  };

  const fetchCollectorId = async (driverId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/driver/user/${driverId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch driver ID");
      }
      const data = await response.json();
      if (data.length > 0) {
        setDriverId(data[0].driver_id);
      } else {
        setDriverId(""); // Reset driver ID if no driver found
      }
    } catch (error) {
      console.error("Error fetching driver ID:", error);
    }
  };

  return (
    <div>
      <Box sx={{ m: 2 }}></Box>
      <Typography variant="h5" align="center">
        Edit Collection
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
            id="collection-name"
            label="Collection Name"
            variant="outlined"
            size="small"
            value={collectionName}
            onChange={handleNameChange}
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="quantity"
            label="Quantity"
            variant="outlined"
            size="small"
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            InputProps={{
              endAdornment: "Kg",
            }}
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            value={selectedMaterial}
            onChange={handleMaterialChange}
            id="material-name"
            disabled
            options={materials.map((material) => material.name)}
            renderInput={(params) => (
              <TextField {...params} label="Material Name" />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="driver-name"
            label="Driver Name"
            variant="outlined"
            size="small"
            value={driverName}
            onChange={handleDriverChange}
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="price"
            label="Price"
            variant="outlined"
            size="small"
            type="text"
            value={price}
            readOnly
            fullWidth
            disabled
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

export default EditDriverCollection;
