import { Grid, IconButton, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Swal from 'sweetalert2';
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EditBinType({ closeEvent, binId }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [typeName, setTypeName] = useState("");
  const [error, setError] = useState("");
  const [binTypes, setBinTypes] = useState([]);
  const [userId, setUserId] = useState(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const navigate = useNavigate();

  useEffect(() => {
    fetchBinTypes();
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/auth/authenticated", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.authenticated) {
          AdminId(res.data.user.id);
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const AdminId = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/admin/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch admin id");
      }
      const data = await response.json();
      setUserId(data.admin_id);
    } catch (error) {
      console.error("Error fetching admin id:", error);
    }
  };

  const fetchBinTypes = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/binType");
      if (!response.ok) {
        throw new Error("Failed to fetch bin types");
      }
      const data = await response.json();
      setBinTypes(data);
    } catch (error) {
      console.error("Error fetching bin types:", error);
    }
  };

  const handleSubmit = () => {

    const selectedBinTypeObj = binTypes.find(
      (binType) => binType.type_name === typeName
    );

    if (!selectedBinTypeObj) {
      setError("Invalid bin type.");
      return;
    }

    // Make PUT request to backend
    fetch(`http://localhost:3001/api/bin/${binId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        address,
        type_id: selectedBinTypeObj.type_id,
        admin_id : userId,
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update bin type');
      }
      return response.json();
    })
    .then(data => {
      console.log('BinType updated:', data);
      Swal.fire(
        'Updated!',
        'Your bin type has been updated.',
        'success'
      );
      closeEvent();
      window.location.reload();
    })
    .catch((error) => {
      console.error('Error updating bin type:', error);
      Swal.fire(
        'Error!',
        'Failed to update the bin type.',
        'error'
      );
      closeEvent();
    });
  };

  return (
    <div>
      <Box sx={{ m: 2 }}></Box>
      <Typography variant="h5" align="center">
        Edit Bin 
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
            value={typeName}
            onChange={(event, newValue) => {
              setTypeName(newValue);
            }}
            id="bin-type-autocomplete"
            options={binTypes.map((binType) => binType.type_name)}
            renderInput={(params) => (
              <TextField {...params} label="Type Name" />
            )}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Address"
            variant="outlined"
            size="small"
            value={address}
            onChange={handleAddressChange}
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
              Update
            </Button>
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ m: 2 }}></Box>
    </div>
  );
}
export default EditBinType;
