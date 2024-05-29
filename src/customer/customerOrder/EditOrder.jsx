import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  IconButton,
  Autocomplete,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";

function EditOrder({ closeEvent, orderDetails }) {
  const [name, setName] = useState(orderDetails.order_name || "");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(orderDetails.quantity || "");
  const [price, setPrice] = useState(orderDetails.price || "");
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const [isEditable, setIsEditable] = useState(true);

  useEffect(() => {
    fetchProducts();
    checkIfEditable(orderDetails.created_at);
  }, [orderDetails]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
      setInitialSelectedProduct(data, orderDetails.product_id);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const setInitialSelectedProduct = (products, productId) => {
    const product = products.find(product => product.product_id === productId);
    setSelectedProduct(product);
  };

  const checkIfEditable = (createdAt) => {
    const orderDate = new Date(createdAt);
    const now = new Date();
    const timeDiff = now - orderDate;
    setIsEditable(timeDiff <= 24 * 60 * 60 * 1000); // 24 hours in milliseconds
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
    calculatePrice(event.target.value, selectedProduct);
  };

  const calculatePrice = (quantity, selectedProduct) => {
    if (selectedProduct) {
      const totalPrice = selectedProduct.unit_price * parseInt(quantity, 10);
      setPrice(totalPrice);
    }
  };

  const handleSubmit = () => {
    if (!isEditable) {
      Swal.fire("Error!", "You can't edit this order after one day.", "error");
      return;
    }

    const quantityValue = parseInt(quantity, 10);

    if (isNaN(quantityValue)) {
      setError("Quantity must be a number.");
      return;
    }

    if (!selectedProduct) {
      setError("Please select a product.");
      return;
    }

    fetch(`http://localhost:3001/api/orders/${orderDetails.order_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        product_id: selectedProduct.product_id,
        quantity: quantityValue,
        price,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update order");
        }
        return response.json();
      })
      .then((data) => {
        Swal.fire("Updated!", "Your order has been updated.", "success");
        closeEvent();
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating order:", error);
        Swal.fire("Error!", "Failed to update the order.", "error");
        closeEvent();
      });
  };

  return (
    <div>
      <Box sx={{ m: 2 }}></Box>
      <Typography variant="h5" align="center">
        Edit Order
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
            label="Order Name"
            variant="outlined"
            size="small"
            value={name}
            onChange={handleNameChange}
            sx={{ width: "100%" }}
            disabled={!isEditable}
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            value={selectedProduct}
            onChange={(event, newValue) => {
              setSelectedProduct(newValue);
              calculatePrice(quantity, newValue);
            }}
            id="product-autocomplete"
            options={products}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label="Product" />}
            fullWidth
            disabled={!isEditable}
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
            disabled={!isEditable}
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
        {error && (
          <Grid item xs={12}>
            <Typography variant="body2" color="error" align="center">
              {error}
            </Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            <Button variant="contained" onClick={handleSubmit} disabled={!isEditable}>
              Update
            </Button>
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ m: 2 }}></Box>
    </div>
  );
}

export default EditOrder;
