import { Grid, IconButton, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Swal from 'sweetalert2';
import Autocomplete from "@mui/material/Autocomplete";

function EditOrder({ closeEvent, orderId, adminId }) {
  const [name, setName] = useState("");
  const [bailers, setBailers] = useState([]);

  useEffect(() => {
    fetchEmployee();
  }, [orderId]);

  const fetchEmployee = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/employees/bailers"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch employees");
      }
      const data = await response.json();
      setBailers(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleSubmit = () => {
    const selectedBailer = name;
    const bailerId = bailers.find(bailer => bailer.firstname === selectedBailer)?.bailer_id;

    fetch(`http://localhost:3001/api/orders/accept/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bailer_id: bailerId,
        admin_id: adminId,
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
      });
  };

  return (
    <div>
      <Box sx={{ m: 2 }}></Box>
      <Typography variant="h5" align="center">
        Accept Order
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
          <Autocomplete
            value={name}
            onChange={(event, newValue) => {
              setName(newValue);
            }}
            id="material-autocomplete"
            options={bailers.map((bailer) => bailer.firstname)}
            renderInput={(params) => (
              <TextField {...params} label="Bailer Name" />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            <Button variant="contained" onClick={handleSubmit}>
              Accept Order
            </Button>
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ m: 2 }}></Box>
    </div>
  );
}

export default EditOrder;
