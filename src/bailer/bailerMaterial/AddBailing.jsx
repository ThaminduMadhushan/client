// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { TextField, Button, Box, Autocomplete, Grid, Typography } from "@mui/material";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';

// export default function AddBailing({ closeEvent, bailer }) {
//   const [bailingName, setBailingName] = useState("");
//   const [productId, setProductId] = useState(null);
//   const [productQuantity, setProductQuantity] = useState("");
//   const [materialId, setMaterialId] = useState(null);
//   const [materialQuantity, setMaterialQuantity] = useState("");
//   const [products, setProducts] = useState([]);
//   const [materials, setMaterials] = useState([]);

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchProducts();
//     fetchMaterials();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get("http://localhost:3001/api/products");
//       setProducts(response.data);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   const fetchMaterials = async () => {
//     try {
//       const response = await axios.get("http://localhost:3001/api/materials");
//       setMaterials(response.data);
//     } catch (error) {
//       console.error("Error fetching materials:", error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:3001/api/bailer/add", {
//         bailer_id: bailer,
//         product_id: productId,
//         product_quantity: productQuantity,
//         material_id: materialId,
//         material_quantity: materialQuantity,
//       });

//       if (response.status === 201) {
//         Swal.fire("Success", "Bailing added successfully", "success");
//         closeEvent();
//         window.location.reload();
//       } else {
//         throw new Error("Failed to add bailing");
//       }
//     } catch (error) {
//       console.error("Error adding bailing:", error);
//       Swal.fire("Error", "Failed to add bailing", "error");
//     }
//   };

//   return (
//     <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
//       <Typography variant="h5" align="center">Add Bailing</Typography>
//       <IconButton
//         style={{ position: "absolute", top: 0, right: 0 }}
//         onClick={closeEvent}
//       >
//         <CloseIcon />
//       </IconButton>
//       <Grid container spacing={2}>
//         <Grid item xs={6}>
//           <Autocomplete
//             options={products}
//             sx={{ marginTop: 2 }}
//             getOptionLabel={(option) => option.name}
//             onChange={(event, newValue) => setProductId(newValue?.product_id || null)}
//             renderInput={(params) => <TextField {...params} label="Product Name" />}
//           />
//         </Grid>
//         <Grid item xs={6}>
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             label="Product Quantity"
//             value={productQuantity}
//             onChange={(e) => setProductQuantity(e.target.value)}
//           />
//         </Grid>
//       </Grid>
//       <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
//         Add Bailing
//       </Button>
//     </Box>
//   );
// }


import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Box, Autocomplete, Grid, Typography } from "@mui/material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function AddBailing({ closeEvent, bailer }) {
  const [bailingName, setBailingName] = useState("");
  const [productId, setProductId] = useState(null);
  const [productQuantity, setProductQuantity] = useState("");
  const [materialId, setMaterialId] = useState(null);
  const [materialQuantity, setMaterialQuantity] = useState("");
  const [products, setProducts] = useState([]);
  const [materials, setMaterials] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchMaterials();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchMaterials = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/materials");
      setMaterials(response.data);
    } catch (error) {
      console.error("Error fetching materials:", error);
    }
  };

  const handleProductChange = (event, newValue) => {
    if (newValue) {
      setProductId(newValue.product_id);
      setMaterialId(newValue.material_id);
      const materialQty = newValue.material_quantity;
      if (productQuantity) {
        setMaterialQuantity(materialQty * productQuantity);
      }
    } else {
      setProductId(null);
      setMaterialId(null);
      setMaterialQuantity("");
    }
  };

  const handleProductQuantityChange = (e) => {
    const quantity = e.target.value;
    setProductQuantity(quantity);
    const selectedProduct = products.find(product => product.product_id === productId);
    if (selectedProduct) {
      const materialQty = selectedProduct.material_quantity;
      setMaterialQuantity(materialQty * quantity);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/api/bailer/add", {
        bailer_id: bailer,
        product_id: productId,
        product_quantity: productQuantity,
        material_id: materialId,
        total_material_quantity: materialQuantity,
      });

      if (response.status === 201) {
        Swal.fire("Success", "Bailing added successfully", "success");
        closeEvent();
        window.location.reload();
      } else {
        throw new Error("Failed to add bailing");
      }
    } catch (error) {
      console.error("Error adding bailing:", error);
      Swal.fire("Error", "Failed to add bailing", "error");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Typography variant="h5" align="center">Add Bailing</Typography>
      <IconButton
        style={{ position: "absolute", top: 0, right: 0 }}
        onClick={closeEvent}
      >
        <CloseIcon />
      </IconButton>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Autocomplete
            options={products}
            sx={{ marginTop: 2 }}
            getOptionLabel={(option) => option.product_name}
            onChange={handleProductChange}
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
            onChange={handleProductQuantityChange}
          />
        </Grid>
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Add Bailing
      </Button>
    </Box>
  );
}
