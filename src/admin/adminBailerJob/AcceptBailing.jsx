import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Autocomplete, IconButton, Typography } from "@mui/material";
import Swal from "sweetalert2";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AcceptBailing({ closeEvent, bailingDetails, materials, products }) {
  const [bailingName, setBailingName] = useState("");
  const [productId, setProductId] = useState(null);
  const [productQuantity, setProductQuantity] = useState("");
  const [materialId, setMaterialId] = useState(null);
  const [materialQuantity, setMaterialQuantity] = useState("");
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (bailingDetails) {
      setBailingName(bailingDetails.bailing_name);
      setProductId(bailingDetails.product_id);
      setProductQuantity(bailingDetails.product_quantity);
      setMaterialId(bailingDetails.material_id);
      setMaterialQuantity(bailingDetails.material_quantity);
    }
  }, [bailingDetails]);

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
  }, [navigate]);

  const AdminId = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/admin/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch admin id");
      }
      const data = await response.json();
      setUserId(data.admin_id);
    } catch (error) {
      console.error("Error fetching admin id:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/api/admin/bailing/details/accept`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bailing_id: bailingDetails.bailing_id,
          bailing_name: bailingName,
          product_id: productId,
          product_quantity: productQuantity,
          material_id: materialId,
          material_quantity: materialQuantity,
          admin_id: userId,
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

  const getDefaultProduct = () => {
    return products.find((product) => product.product_id === productId) || null;
  };

  const getDefaultMaterial = () => {
    return materials.find((material) => material.material_id === materialId) || null;
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Typography variant="h6">Edit Bailing</Typography>
      <IconButton
        style={{ position: "absolute", top: 0, right: 0 }}
        onClick={closeEvent}
      >
        <CloseIcon />
      </IconButton>

      <TextField
        margin="normal"
        required
        fullWidth
        label="Bailing Name"
        autoFocus
        value={bailingName}
        onChange={(e) => setBailingName(e.target.value)}
      />

      <Autocomplete
        options={products}
        getOptionLabel={(option) => option.name}
        onChange={(event, newValue) => setProductId(newValue?.product_id || null)}
        value={getDefaultProduct()}
        renderInput={(params) => <TextField {...params} label="Product Name" />}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        label="Product Quantity"
        value={productQuantity}
        onChange={(e) => setProductQuantity(e.target.value)}
      />

      <Autocomplete
        options={materials}
        getOptionLabel={(option) => option.name}
        onChange={(event, newValue) => setMaterialId(newValue?.material_id || null)}
        value={getDefaultMaterial()}
        renderInput={(params) => <TextField {...params} label="Material Name" />}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        label="Material Quantity"
        value={materialQuantity}
        onChange={(e) => setMaterialQuantity(e.target.value)}
      />

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Update Bailing
      </Button>
    </Box>
  );
}

export default AcceptBailing;
