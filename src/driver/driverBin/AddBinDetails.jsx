import { Grid, IconButton, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";
import Autocomplete from "@mui/material/Autocomplete";
import { Navigate } from "react-router-dom";

function AddBinDetails({ closeEvent, binId, driverId }) {
  const [collectionName, setCollectionName] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [materials, setMaterials] = useState([]);
  const [error, setError] = useState("");

  const handleNameChange = (event) => {
    setCollectionName(event.target.value);
  };
  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleSubmit = () => {
    const selectedMaterial = name;
    const materialId = materials.find(
      (material) => material.name === selectedMaterial
    )?.material_id;

    // Make POST request to backend
    fetch("http://localhost:3001/api/collection", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        collectionName,
        quantity,
        binId,
        driverId,
        material_id: materialId,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add Bin collection");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Bin collection created:", data);
        Swal.fire("Success!", "Bin collection added successfully.", "success");
        // Close the modal after success
        closeEvent();
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error adding bin collection:", error);
        Swal.fire("Error!", "Failed to add the bin collection.", "error");
        // Close the modal even if there's an error
        closeEvent();
      });
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

  useEffect(() => {
    fetchMaterials();
  }, []);

  return (
    <div>
      <Box sx={{ m: 2 }}></Box>
      <Typography variant="h5" align="center">
        Add Collection
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
            value={collectionName}
            onChange={handleNameChange}
            sx={{ width: "100%" }}
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
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            value={name}
            onChange={(event, newValue) => {
              setName(newValue);
            }}
            id="material-autocomplete"
            options={materials.map((material) => material.name)}
            renderInput={(params) => (
              <TextField {...params} label="Material Name" />
            )}
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

export default AddBinDetails;
