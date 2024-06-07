// import React, { useState, useEffect } from "react";
// import { Box, TextField, Button, Grid, Typography, Autocomplete } from "@mui/material";
// import Swal from "sweetalert2";
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';

// function EditBailing({ closeEvent, bailingDetails }) {

//   const [productId, setProductId] = useState(bailingDetails.product_id);
//   const [productQuantity, setProductQuantity] = useState(bailingDetails.product_quantity);
//   const [materialId, setMaterialId] = useState(bailingDetails.material_id);
//   const [materialQuantity, setMaterialQuantity] = useState(bailingDetails.material_quantity);
//   const [products, setProducts] = useState([]);
//   const [materials, setMaterials] = useState([]);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const response = await fetch("http://localhost:3001/api/products");
//       const data = await response.json();
//       setProducts(data);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`http://localhost:3001/api/bailings/${bailingDetails.bailing_id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           product_id: productId,
//           product_quantity: productQuantity,
//           material_id: materialId,
//           material_quantity: materialQuantity,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to update bailing");
//       }

//       Swal.fire("Updated!", "Your bailing has been updated.", "success");
//       closeEvent();
//       window.location.reload();
//     } catch (error) {
//       console.error("Error updating bailing:", error);
//       Swal.fire("Error!", "Failed to update the bailing.", "error");
//     }
//   };

//   return (
//     <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
//       <Typography variant="h5" align="center">Edit Bailing</Typography>
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
//             onChange={(event, newValue) => setProductId(newValue?.product_id || productId)}
//             defaultValue={products.find(product => product.product_id === bailingDetails.product_id)}
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
//         Update Bailing
//       </Button>
//     </Box>
//   );
// }

// export default EditBailing;


// import React, { useState, useEffect } from "react";
// import { Box, TextField, Button, Grid, Typography, Autocomplete } from "@mui/material";
// import Swal from "sweetalert2";
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';

// function EditBailing({ closeEvent, bailingDetails, products }) {
//   const [productId, setProductId] = useState(bailingDetails.product_id);
//   const [productQuantity, setProductQuantity] = useState(bailingDetails.product_quantity);
//   const [materialId, setMaterialId] = useState(bailingDetails.material_id);
//   const [materialQuantity, setMaterialQuantity] = useState(bailingDetails.material_quantity);
//   const [products, setProducts] = useState([]);
//   const [materials, setMaterials] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null); 

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     if (bailingDetails && products.length > 0) {
//       setSelectedProduct(collectionDetails.product_name);
//       setProductQuantity(collectionDetails.product_quantity);
//     }
//   }, [bailingDetails, products]);

//   const handleMaterialChange = (event, newValue) => {
//     setSelectedProduct(newValue);

//   };


//   const fetchProducts = async () => {
//     try {
//       const response = await fetch("http://localhost:3001/api/products");
//       const data = await response.json();
//       setProducts(data);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   const handleProductChange = (event, newValue) => {
//     console.log("Product changed:", newValue);
//     if (newValue) {
//       setProductId(newValue.product_id);
//       setSelectedProduct(newValue);
//       setMaterialId(newValue.material_id);
//       const materialQty = newValue.material_quantity;
//       if (productQuantity) {
//         setMaterialQuantity(materialQty * productQuantity);
//       }
//     } else {
//       setProductId(null);
//       setMaterialId(null);
//       setMaterialQuantity("");
//       setSelectedProduct(null); 
//     }
//   };

//   const handleProductQuantityChange = (e) => {
//     const quantity = e.target.value;
//     setProductQuantity(quantity);
//     const selectedProduct = products.find(product => product.product_id === productId);
//     if (selectedProduct) {
//       const materialQty = selectedProduct.material_quantity;
//       setMaterialQuantity(materialQty * quantity);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`http://localhost:3001/api/bailer/details/update/${bailingDetails.bailing_id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           product_id: productId,
//           product_quantity: productQuantity,
//           material_id: materialId,
//           totalmaterial_quantity: materialQuantity,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to update bailing");
//       }

//       Swal.fire("Updated!", "Your bailing has been updated.", "success");
//       closeEvent();
//       window.location.reload();
//     } catch (error) {
//       console.error("Error updating bailing:", error);
//       Swal.fire("Error!", "Failed to update the bailing.", "error");
//     }
//   };

//   return (
//     <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
//       <Typography variant="h5" align="center">Edit Bailing</Typography>
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
//             getOptionLabel={(option) => option.product_name} 
//             onChange={handleProductChange}
//             value={selectedProduct} // Display the selected product
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
//             onChange={handleProductQuantityChange}
//           />
//         </Grid>
//       </Grid>
//       <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
//         Update Bailing
//       </Button>
//     </Box>
//   );
// }

// export default EditBailing;


// import React, { useState, useEffect } from "react";
// import { Box, TextField, Button, Grid, Typography, Autocomplete } from "@mui/material";
// import Swal from "sweetalert2";
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';

// function EditBailing({ closeEvent, bailingDetails, products }) {
//   const [productId, setProductId] = useState(bailingDetails.product_id);
//   const [productQuantity, setProductQuantity] = useState(bailingDetails.product_quantity);
//   const [materialId, setMaterialId] = useState(bailingDetails.material_id);
//   const [materialQuantity, setMaterialQuantity] = useState(bailingDetails.material_quantity);
//   const [materials, setMaterials] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null); 

//   useEffect(() => {
//     fetchMaterials();
//     if (bailingDetails && products.length > 0) {
//       setSelectedProduct(bailingDetails.product_name);
//       setProductQuantity(bailingDetails.product_quantity);
//     }
//   }, [bailingDetails, products]);

//   const fetchMaterials = async () => {
//     try {
//       const response = await fetch("http://localhost:3001/api/materials");
//       const data = await response.json();
//       setMaterials(data);
//     } catch (error) {
//       console.error("Error fetching materials:", error);
//     }
//   };

//   const handleProductChange = (event, newValue) => {
//     console.log("Product changed:", newValue);
//     if (newValue) {
//       setProductId(newValue.product_id);
//       setSelectedProduct(newValue);
//       setMaterialId(newValue.material_id);
//       const materialQty = newValue.material_quantity;
//       if (productQuantity) {
//         setMaterialQuantity(materialQty * productQuantity);
//       }
//     } else {
//       setProductId(null);
//       setMaterialId(null);
//       setMaterialQuantity("");
//       setSelectedProduct(null); 
//     }
//   };

//   const handleProductQuantityChange = (e) => {
//     const quantity = e.target.value;
//     setProductQuantity(quantity);
//     const selectedProduct = products.find(product => product.product_id === productId);
//     if (selectedProduct) {
//       const materialQty = selectedProduct.material_quantity;
//       setMaterialQuantity(materialQty * quantity);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`http://localhost:3001/api/bailer/details/update/${bailingDetails.bailing_id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           product_id: productId,
//           product_quantity: productQuantity,
//           material_id: materialId,
//           material_quantity: materialQuantity,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to update bailing");
//       }

//       Swal.fire("Updated!", "Your bailing has been updated.", "success");
//       closeEvent();
//       window.location.reload();
//     } catch (error) {
//       console.error("Error updating bailing:", error);
//       Swal.fire("Error!", "Failed to update the bailing.", "error");
//     }
//   };

//   return (
//     <Box>
//       <Grid container spacing={2}>
//         <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//           <Typography variant="h6">Edit Bailing</Typography>
//           <IconButton onClick={closeEvent}>
//             <CloseIcon />
//           </IconButton>
//         </Grid>
//         <Grid item xs={12}>
//           <Autocomplete
//             value={selectedProduct}
//             onChange={handleProductChange}
//             options={products}
//             getOptionLabel={(option) => option.product_name}
//             renderInput={(params) => <TextField {...params} label="Product" />}
//             isOptionEqualToValue={(option, value) => option.product_id === value.product_id}
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             label="Product Quantity"
//             type="number"
//             value={productQuantity}
//             onChange={handleProductQuantityChange}
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             label="Material Quantity"
//             type="number"
//             value={materialQuantity}
//             disabled
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <Button variant="contained" color="primary" onClick={handleSubmit}>
//             Update
//           </Button>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }

// export default EditBailing;


import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Grid, Typography, Autocomplete } from "@mui/material";
import Swal from "sweetalert2";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function EditBailing({ closeEvent, bailingDetails, products }) {
  const [productId, setProductId] = useState(bailingDetails.product_id);
  const [productQuantity, setProductQuantity] = useState(bailingDetails.product_quantity);
  const [materialId, setMaterialId] = useState(bailingDetails.material_id);
  const [materialQuantity, setMaterialQuantity] = useState(bailingDetails.material_quantity);
  const [materials, setMaterials] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchMaterials();
    if (bailingDetails && products.length > 0) {
      const selectedProduct = products.find(product => product.product_id === bailingDetails.product_id);
      setSelectedProduct(selectedProduct);
    }
  }, [bailingDetails, products]);

  const fetchMaterials = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/materials");
      const data = await response.json();
      setMaterials(data);
    } catch (error) {
      console.error("Error fetching materials:", error);
    }
  };

  const handleProductChange = (event, newValue) => {
    if (newValue) {
      setProductId(newValue.product_id);
      setSelectedProduct(newValue);
      setMaterialId(newValue.material_id);
      const materialQty = newValue.material_quantity;
      if (productQuantity) {
        setMaterialQuantity(materialQty * productQuantity);
      }
    } else {
      setProductId(null);
      setMaterialId(null);
      setMaterialQuantity("");
      setSelectedProduct(null);
    }
  };

  const handleProductQuantityChange = (e) => {
    const quantity = e.target.value;
    setProductQuantity(quantity);
    if (selectedProduct) {
      const materialQty = selectedProduct.material_quantity;
      setMaterialQuantity(materialQty * quantity);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/api/bailer/details/update/${bailingDetails.bailing_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6">Edit Bailing</Typography>
          <IconButton onClick={closeEvent}>
            <CloseIcon />
          </IconButton>
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            value={selectedProduct}
            onChange={handleProductChange}
            options={products}
            getOptionLabel={(option) => option.product_name}
            renderInput={(params) => <TextField {...params} label="Product" />}
            isOptionEqualToValue={(option, value) => option.product_id === value.product_id}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Product Quantity"
            type="number"
            value={productQuantity}
            onChange={handleProductQuantityChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Material Quantity"
            type="number"
            value={materialQuantity}
            disabled
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Update
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default EditBailing;
