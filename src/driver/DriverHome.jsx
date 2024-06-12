import React, { useState, useEffect } from "react";
import Sidenav from "../driver/driverComponents/DriverSidenav";
import Navbar from "../driver/driverComponents/DriverNavbar";
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
import DriverCollection from "./driverCharts/DriverCollection";
import axios from "axios";
import { styled } from "@mui/system";

const StyledCard = styled(Card)(({ theme }) => ({
  minWidth: "49%",
  height: 150,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
}));

const DriverHome = () => {
  const [driverDetails, setDriverDetails] = useState({});
  const [parameters, setParameters] = useState([]);
  const [collections, setCollections] = useState([]);
  const [monthlyCollection, setMonthlyCollection] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/auth/authenticated", {
          withCredentials: true,
        });
        if (res.data.authenticated) {
          const userId = res.data.user.id;
          const role = res.data.user.role;
          console.log(role);
          await fetchDriverDetails(userId);
          await fetchParameters(role);
        } else {
          // Handle authentication failure
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle error
      }
    };

    const fetchDriverDetails = async (userId) => {
      try {
        const response = await axios.get(`http://localhost:3001/api/driver/${userId}`);
        setDriverDetails(response.data);
        fetchData(response.data.driver_id);
      } catch (error) {
        console.error("Error fetching driver details:", error);
        // Handle error
      }
    };

    const fetchParameters = async (role) => {
      try {
        const response = await axios.get(`http://localhost:3001/api/chart/employee/salary/parameters/${role}`);
        if (response.data.length > 0) {
          setParameters(response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching parameters:", error);
        // Handle error
      }
    };

    const fetchData = async (userId) => {
      // Pass userId as a parameter
      try {
        const response = await fetch(
          `http://localhost:3001/api/chart/driver/bin/collection/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch collections data");
        }
        const data = await response.json();
        setCollections(data);
        calculateMonthlyCollection(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setCollections([]); // Set collections to empty array in case of error
      }
    };

    const calculateMonthlyCollection = (data) => {
      const currentMonth = new Date().getMonth() + 1; // getMonth() is zero-based
      const currentYear = new Date().getFullYear();
      const monthlyTotal = data
        .filter((collection) => {
          const collectionDate = new Date(collection.date);
          return (
            collectionDate.getMonth() + 1 === currentMonth &&
            collectionDate.getFullYear() === currentYear
          );
        })
        .reduce((total, collection) => total + collection.quantity, 0);
      setMonthlyCollection(monthlyTotal);
    };

    fetchUserData();
  }, []);

  return (
    <div className="backgroundColor">
      <Navbar />
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: "background.default" }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Stack direction="row" spacing={2}>
                <StyledCard>
                  <CardContent>
                    <div>
                      <CreditCardIcon sx={{ color: "primary.main", marginTop: 1 }} />
                    </div>
                    <Typography gutterBottom variant="h5" component="div">
                      Monthly Target
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      <CountUp delay={1} start={0} end={parameters.monthly_target} duration={2} /> Kg
                    </Typography>
                  </CardContent>
                </StyledCard>
                <StyledCard>
                  <CardContent>
                    <div>
                      <ShoppingBagIcon sx={{ color: "primary.main", marginTop: 1 }} />
                    </div>
                    <Typography gutterBottom variant="h5" component="div">
                      Monthly Collection
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      <CountUp delay={1} start={0} end={monthlyCollection} duration={2} /> Kg
                    </Typography>
                  </CardContent>
                </StyledCard>
              </Stack>
            </Grid>
            <Grid item xs={4}>
              <Stack spacing={2}>
                <Card sx={{ maxWidth: 345, height: 150, backgroundColor: "background.paper", color: "text.primary" }}>
                  <Stack spacing={2} direction="row">
                    <div className="priceImage">
                      <StorefrontIcon sx={{ color: "secondary.main" }} />
                    </div>
                    <div className="priceCard">
                      <span className="priceTitle">Hi... {driverDetails.firstname}</span>
                      <br />
                      <span className="price">{driverDetails.lastname}</span>
                    </div>
                  </Stack>
                </Card>
              </Stack>
            </Grid>
          </Grid>
          <Box height={30} />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card sx={{ height: "90vh", backgroundColor: "background.paper", color: "text.primary" }}>
                <CardContent>
                  <DriverCollection />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default DriverHome;
