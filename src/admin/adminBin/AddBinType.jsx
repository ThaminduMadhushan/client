import { Grid, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Swal from 'sweetalert2';
import { Navigate } from "react-router-dom";

function AddBinType({ closeEvent, adminId }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };


  const handleSubmit = () => {
    
    // Make POST request to backend
    fetch('http://localhost:3001/api/binType', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        admin_id : adminId,
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to add bin type');
      }
      return response.json();
    })
    .then(data => {
      console.log('Bin Type created:', data);
      Swal.fire(
        'Success!',
        'Bin Type added successfully.',
        'success'
      );
      // Close the modal after success
      closeEvent();
      window.location.reload();
    })
    .catch((error) => {
      console.error('Error adding bin type:', error);
      Swal.fire(
        'Error!',
        'Failed to add the bin type.',
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
        Add Bin Type
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

export default AddBinType;
