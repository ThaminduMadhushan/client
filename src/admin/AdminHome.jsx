import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidenav from "../admin/adminComponents/AdminSidenav";
import Navbar from "../admin/adminComponents/AdminNavbar";
import AccordionDashboard from "../admin/adminComponents/AdminAccordionDashboard";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import "../styles/Dashboard.css";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CountUp from "react-countup";

export default function AdminHome() {

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
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Stack direction="row" spacing={2}>
                <Card sx={{ minWidth: 49 + "%", height: 150 }} className="gradient">
                  <CardContent>
                    <div>
                      <CreditCardIcon sx={{ color: "white", marginTop: 2 }}/>
                    </div>
                    <Typography gutterBottom variant="h5" component="div">
                      Lizard
                    </Typography>
                    <Typography gutterBottom variant="body2" component="div" sx ={{ color: "gray" }}>
                      Lizard
                    </Typography>
                  </CardContent>
                </Card>
                <Card sx={{ minWidth: 49 + "%", height: 150 }} className="gradient">
                  <CardContent>
                    <div>
                      <ShoppingBagIcon sx={{ color: "white", marginTop: 2}}/>
                    </div>
                    <Typography gutterBottom variant="h5" component="div">
                      $<CountUp delay={1} start={0} end={100} duration={2} />
                    </Typography>
                    <Typography gutterBottom variant="body2" component="div" sx ={{ color: "gray" }}>
                      Lizard
                    </Typography>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>

            <Grid item xs={4}>
              <Stack spacing={2}>
                <Card sx={{ maxWidth: 345 }}>
                  <Stack spacing={2} direction="row">
                    <div className="priceImage">
                      <StorefrontIcon />
                    </div>
                    <div className="priceCard">
                      <span className="priceTitle">Card</span>
                      <br />
                      <span className="priceSubTitle">Card1</span>
                    </div>
                  </Stack>
                </Card>
                <Card sx={{ maxWidth: 345 }}>
                  <Stack spacing={2} direction="row">
                    <div className="priceImage">
                      <StorefrontIcon />
                    </div>
                    <div className="priceCard">
                      <span className="priceTitle">Card</span>
                      <br />
                      <span className="priceSubTitle">Card1</span>
                    </div>
                  </Stack>
                </Card>
              </Stack>
            </Grid>
          </Grid>
          <Box height={30} />
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Card sx={{ height: 60 + "vh" }}>
                <CardContent>
                  
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card sx={{ height: 60 + "vh" }}>
                <CardContent>
                <div className="priceCard">
                      <span className="priceTitle">Popular Products</span>
                    </div>
                <AccordionDashboard />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
}
