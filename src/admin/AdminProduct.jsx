import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidenav from "../admin/adminComponents/AdminSidenav";
import Navbar from "../admin/adminComponents/AdminNavbar";
import Box from "@mui/material/Box";
import "../styles/Dashboard.css";
import ProductList from "./adminProduct/ProductList";

function AdminProduct() {

  const [user, setUser] = useState({ firstname: '', email: '', id: '' });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/api/auth/authenticated', { withCredentials: true })
      .then(res => {
        if (res.data.authenticated) {
          setUser(res.data.user);
        } else {
          navigate('/login');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [navigate]);


  return (
    <div className="backgroundColor">
      <Navbar />
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <ProductList />
        </Box>
      </Box>
    </div>
  );
}

export default AdminProduct;
