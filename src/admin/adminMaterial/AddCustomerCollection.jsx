import React, { useState, useEffect } from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddCustomerCollection({ closeEvent }) {
  const [material, setMaterial] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [materials, setMaterials] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [adminId, setAdminId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/auth/authenticated", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.authenticated) {
          setAdminId(res.data.user.id);
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigate]);

  useEffect(() => {
    fetchMaterials();
    fetchSuppliers();
  }, []);

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
    calculatePrice(event.target.value, material);
  };

  const calculatePrice = (quantity, materialName) => {
    const selectedMaterial = materials.find((m) => m.name === materialName);
    if (selectedMaterial) {
      const totalPrice = selectedMaterial.unit_price * parseInt(quantity, 10);
      setPrice(totalPrice);
    }
  };

  const handleSubmit = async () => {
    try {
      const materialId = materials.find((m) => m.name === material)?.material_id;

      if (!materialId || !selectedSupplier?.supplier_id) {
        throw new Error("Invalid material or supplier data");
      }

      const response = await fetch("http://localhost:3001/api/supplier/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          supplierId: selectedSupplier.supplier_id,
          adminId: adminId,
          quantity: quantity,
          price: price,
          material_id: materialId,
          collectorId: selectedSupplier.user_id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add customer collection");
      }

      const data = await response.json();
      console.log("Customer collection created:", data);
      Swal.fire("Success!", "Customer collection added successfully.", "success");
      closeEvent();
      window.location.reload();
    } catch (error) {
      console.error("Error adding customer collection:", error);
      if (error.message === "Collector ID not found") {
        Swal.fire("Error!", "Collector ID not found. Please select a valid supplier.", "error");
        closeEvent();
      } else {
        Swal.fire("Error!", error.message, "error");
        closeEvent();
      }
    }
  };


  const fetchMaterials = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/materials");
      if (!response.ok) {
        throw new Error("Failed to fetch materials");
      }
      const data = await response.json();
      setMaterials(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching materials:", error);
      setMaterials([]);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/supplier/get");
      if (!response.ok) {
        throw new Error("Failed to fetch suppliers");
      }
      const data = await response.json();
      setSuppliers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
      setSuppliers([]);
    }
  };

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
          <Autocomplete
            value={selectedSupplier}
            onChange={(event, newValue) => {
              setSelectedSupplier(newValue);
            }}
            id="supplier-autocomplete"
            options={suppliers}
            getOptionLabel={(option) => option.firstname}
            renderInput={(params) => (
              <TextField {...params} label="Supplier Name" variant="outlined" size="small" />
            )}
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
            options={materials.map((material) => material.name)}
            renderInput={(params) => (
              <TextField {...params} label="Material Type" variant="outlined" size="small" />
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

export default AddCustomerCollection;
