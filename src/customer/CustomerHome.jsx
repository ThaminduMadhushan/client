// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Sidenav from "../customer/customerComponents/CustomerSidenav";
// import Navbar from "../customer/customerComponents/CustomerNavbar";
// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import Typography from "@mui/material/Typography";
// import Stack from "@mui/material/Stack";
// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogActions from "@mui/material/DialogActions";
// import Button from "@mui/material/Button";
// import "../styles/Dashboard.css";
// import StorefrontIcon from "@mui/icons-material/Storefront";
// import CreditCardIcon from "@mui/icons-material/CreditCard";
// import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
// import AccordionDashboard from "../customer/customerComponents/CustomerAccordionDashboard";
// import CountUp from "react-countup";

// export default function CustomerHome() {
//   const [acceptOrders, setAcceptOrders] = useState([]);
//   const [cancelOrders, setCancelOrders] = useState([]);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [dialogContent, setDialogContent] = useState("");
//   const [dialogTitle, setDialogTitle] = useState("Order Notification");

//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get("http://localhost:3001/api/auth/authenticated", { withCredentials: true })
//       .then((res) => {
//         if (!res.data.authenticated) {
//           navigate("/login");
//         } else {
//           customerId(res.data.user.id);
//         }
//       })
//       .catch((err) => {
//         console.error(err);
//         navigate("/login");
//       });
//   }, [navigate]);

//   const customerId = async (userId) => {
//     try {
//       const response = await fetch(`http://localhost:3001/api/customer/${userId}`);
//       if (!response.ok) {
//         throw new Error("Failed to fetch customer id");
//       }
//       const data = await response.json();
//       fetchCancelledOrders(data.customer_id);
//       fetchAcceptOrders(data.customer_id);
//     } catch (error) {
//       console.error("Error fetching customer id:", error);
//     }
//   };

//   const fetchCancelledOrders = async (userId) => {
//     try {
//       const response = await fetch(`http://localhost:3001/api/customer/home/cancelled/${userId}`);
//       if (!response.ok) {
//         throw new Error("Failed to fetch cancelled orders");
//       }
//       const data = await response.json();
//       setCancelOrders(data);
//     } catch (error) {
//       console.error("Error fetching cancelled orders:", error);
//     }
//   };

//   const fetchAcceptOrders = async (userId) => {
//     try {
//       const response = await fetch(`http://localhost:3001/api/customer/home/accepted/${userId}`);
//       if (!response.ok) {
//         throw new Error("Failed to fetch accepted orders");
//       }
//       const data = await response.json();
//       setAcceptOrders(data);
//     } catch (error) {
//       console.error("Error fetching accepted orders:", error);
//     }
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setDialogContent("");
//     setDialogTitle("Order Notification");
//   };

//   const handleViewOrders = () => {
//     setOpenDialog(false);
//     navigate("/customer/order");
//   };

//   useEffect(() => {
//     const hasAcceptedOrders = acceptOrders.length > 0;
//     const hasCancelledOrders = cancelOrders.length > 0;

//     if (hasAcceptedOrders || hasCancelledOrders) {
//       let content = "";
//       if (hasAcceptedOrders) {
//         content += "You have accepted orders: ";
//         acceptOrders.forEach(order => {
//           content += order.order_name + ", ";
//         });
//         content = content.slice(0, -2) + ". ";
//       }
//       if (hasCancelledOrders) {
//         content += "You have cancelled orders: ";
//         cancelOrders.forEach(order => {
//           content += order.order_name + ", ";
//         });
//         content = content.slice(0, -2) + ".";
//       }
//       setDialogTitle("Order Notification");
//       setDialogContent(content);
//       setOpenDialog(true);
//     }
//   }, [acceptOrders, cancelOrders]);

//    return (
//     <div className="backgroundColor">
//       <Navbar />
//       <Box height={70} />
//       <Box sx={{ display: "flex" }}>
//         <Sidenav />
//         <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//           <Grid container spacing={2}>
//             <Grid item xs={8}>
//               <Stack direction="row" spacing={2}>
//                 <Card sx={{ minWidth: 49 + "%", height: 150 }} className="gradient">
//                   <CardContent>
//                     <div>
//                       <CreditCardIcon sx={{ color: "white", marginTop: 2 }} />
//                     </div>
//                     <Typography gutterBottom variant="h5" component="div">
//                       Lizard
//                     </Typography>
//                     <Typography gutterBottom variant="body2" component="div" sx={{ color: "gray" }}>
//                       Lizard
//                     </Typography>
//                   </CardContent>
//                 </Card>
//                 <Card sx={{ minWidth: 49 + "%", height: 150 }} className="gradient">
//                   <CardContent>
//                     <div>
//                       <ShoppingBagIcon sx={{ color: "white", marginTop: 2 }} />
//                     </div>
//                     <Typography gutterBottom variant="h5" component="div">
//                       $<CountUp delay={1} start={0} end={100} duration={2} />
//                     </Typography>
//                     <Typography gutterBottom variant="body2" component="div" sx={{ color: "gray" }}>
//                       Lizard
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Stack>
//             </Grid>

//             <Grid item xs={4}>
//               <Stack spacing={2}>
//                 <Card sx={{ maxWidth: 345 }}>
//                   <Stack spacing={2} direction="row">
//                     <div className="priceImage">
//                       <StorefrontIcon />
//                     </div>
//                     <div className="priceCard">
//                       <span className="priceTitle">Card</span>
//                       <br />
//                       <span className="priceSubTitle">Card1</span>
//                     </div>
//                   </Stack>
//                 </Card>
//                 <Card sx={{ maxWidth: 345 }}>
//                   <Stack spacing={2} direction="row">
//                     <div className="priceImage">
//                       <StorefrontIcon />
//                     </div>
//                     <div className="priceCard">
//                       <span className="priceTitle">Card</span>
//                       <br />
//                       <span className="priceSubTitle">Card1</span>
//                     </div>
//                   </Stack>
//                 </Card>
//               </Stack>
//             </Grid>
//           </Grid>
//           <Box height={30} />
//           <Grid container spacing={2}>
//             <Grid item xs={8}>
//               <Card sx={{ height: 60 + "vh" }}>
//                 <CardContent>
//                   {/* Content */}
//                 </CardContent>
//               </Card>
//             </Grid>
//             <Grid item xs={4}>
//               <Card sx={{ height: 60 + "vh" }}>
//                 <CardContent>
//                   <div className="priceCard">
//                     <span className="priceTitle">Popular Products</span>
//                   </div>
//                   <AccordionDashboard />
//                 </CardContent>
//               </Card>
//             </Grid>
//           </Grid>
//         </Box>
//       </Box>

//       <Dialog open={openDialog} onClose={handleCloseDialog}>
//         <DialogTitle>{dialogTitle}</DialogTitle>
//         <DialogContent>
//           <DialogContentText>{dialogContent}</DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleViewOrders}>View Orders</Button>
//           <Button onClick={handleCloseDialog}>Close</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidenav from "../customer/customerComponents/CustomerSidenav";
import Navbar from "../customer/customerComponents/CustomerNavbar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import "../styles/Dashboard.css";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AccordionDashboard from "../customer/customerComponents/CustomerAccordionDashboard";
import CountUp from "react-countup";

export default function CustomerHome() {
  const [acceptOrders, setAcceptOrders] = useState([]);
  const [cancelOrders, setCancelOrders] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState("");
  const [dialogTitle, setDialogTitle] = useState("Order Notification");

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/api/auth/authenticated", { withCredentials: true })
      .then((res) => {
        if (!res.data.authenticated) {
          navigate("/login");
        } else {
          customerId(res.data.user.id);
        }
      })
      .catch((err) => {
        console.error(err);
        navigate("/login");
      });
  }, [navigate]);

  const customerId = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/customer/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch customer id");
      }
      const data = await response.json();
      fetchCancelledOrders(data.customer_id);
      fetchAcceptOrders(data.customer_id);
    } catch (error) {
      console.error("Error fetching customer id:", error);
    }
  };

  const fetchCancelledOrders = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/customer/home/cancelled/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch cancelled orders");
      }
      const data = await response.json();
      setCancelOrders(data);
    } catch (error) {
      console.error("Error fetching cancelled orders:", error);
    }
  };

  const fetchAcceptOrders = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/customer/home/accepted/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch accepted orders");
      }
      const data = await response.json();
      setAcceptOrders(data);
    } catch (error) {
      console.error("Error fetching accepted orders:", error);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    updateOrdersSeen();
  };

  const handleViewOrders = () => {
    setOpenDialog(false);
    navigate("/customer/order");
    updateOrdersSeen();
  };

  const updateOrdersSeen = async () => {
    const orderIds = [
      ...acceptOrders.map(order => order.order_id),
      ...cancelOrders.map(order => order.order_id)
    ];

    if (orderIds.length > 0) {
      try {
        await axios.post("http://localhost:3001/api/customer/seen", { orderIds });
        console.log("Orders updated successfully");
      } catch (error) {
        console.error("Error updating orders:", error);
      }
    }
  };

  useEffect(() => {
    const hasAcceptedOrders = acceptOrders.length > 0;
    const hasCancelledOrders = cancelOrders.length > 0;

    if (hasAcceptedOrders || hasCancelledOrders) {
      let content = "";
      if (hasAcceptedOrders) {
        content += "You have accepted orders: ";
        acceptOrders.forEach(order => {
          content += order.order_name + ", ";
        });
        content = content.slice(0, -2) + ". ";
      }
      if (hasCancelledOrders) {
        content += "You have cancelled orders: ";
        cancelOrders.forEach(order => {
          content += order.order_name + ", ";
        });
        content = content.slice(0, -2) + ".";
      }
      setDialogTitle("Order Notification");
      setDialogContent(content);
      setOpenDialog(true);
    }
  }, [acceptOrders, cancelOrders]);

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
                      <CreditCardIcon sx={{ color: "white", marginTop: 2 }} />
                    </div>
                    <Typography gutterBottom variant="h5" component="div">
                      Lizard
                    </Typography>
                    <Typography gutterBottom variant="body2" component="div" sx={{ color: "gray" }}>
                      Lizard
                    </Typography>
                  </CardContent>
                </Card>
                <Card sx={{ minWidth: 49 + "%", height: 150 }} className="gradient">
                  <CardContent>
                    <div>
                      <ShoppingBagIcon sx={{ color: "white", marginTop: 2 }} />
                    </div>
                    <Typography gutterBottom variant="h5" component="div">
                      $<CountUp delay={1} start={0} end={100} duration={2} />
                    </Typography>
                    <Typography gutterBottom variant="body2" component="div" sx={{ color: "gray" }}>
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
                  {/* Content */}
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

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogContent}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleViewOrders}>View Orders</Button>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
