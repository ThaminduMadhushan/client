// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import Typography from "@mui/material/Typography";
// import Stack from "@mui/material/Stack";
// import CreditCardIcon from "@mui/icons-material/CreditCard";
// import Autocomplete from "@mui/material/Autocomplete";
// import TextField from "@mui/material/TextField";
// import Modal from "@mui/material/Modal";
// import AddBinDetails from "./AddBinDetails";
// import Button from "@mui/material/Button";
// import AddCircleIcon from "@mui/icons-material/AddCircle";


// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

// export default function BinList( closeEvent ) {
//   const [driverId, setDriverId] = useState(null);
//   const [cardData, setCardData] = useState([]);
//   const [openAddModal, setOpenAddModal] = useState(false);
//   const [addBinId, setAddBinId] = useState(null);

//   const navigate = useNavigate();

//   const handleCloseAddModal = () => setOpenAddModal(false);

//   const handleOpenAddModal = (binId) => {
//     setAddBinId(binId);
//     setOpenAddModal(true);
//   };

//   useEffect(() => {
//     fetchBins();
//   }, []);

//   useEffect(() => {
//     axios
//       .get("http://localhost:3001/api/auth/authenticated", {
//         withCredentials: true,
//       })
//       .then((res) => {
//         if (res.data.authenticated) {
//           fetchDriverId(res.data.user.id);
//         } else {
//           navigate("/login");
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   const fetchDriverId = async (userId) => {
//     try {
//       const response = await fetch(
//         `http://localhost:3001/api/driver/${userId}`
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch driver id");
//       }
//       const data = await response.json();
//       setDriverId(data.driver_id);
//     } catch (error) {
//       console.error("Error fetching driver id:", error);
//     }
//   };

//   const fetchBins = async () => {
//     try {
//       const response = await fetch("http://localhost:3001/api/driver/bin");
//       if (!response.ok) {
//         throw new Error("Failed to fetch bins");
//       }
//       const data = await response.json();
//       setCardData(data);
//     } catch (error) {
//       console.error("Error fetching bins:", error);
//     }
//   };

//   const filterData = (v) => {
//     if (v) {
//       setCardData([v]);
//     } else {
//       setCardData([]);
//       window.location.reload();
//     }
//   };

//   return (
//     <>
//     <div>
//         <Modal
//           open={openAddModal}
//           aria-labelledby="modal-modal-title"
//           aria-describedby="modal-modal-description"
//         >
//           <Box sx={style}>
//             <AddBinDetails closeEvent={handleCloseAddModal} />
//           </Box>
//         </Modal>
//       </div>
//       <div>
//       <Box height={30} />
//       <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginBottom: "20px",
//             marginRight: "20px",
//           }}
//         >
//           <Autocomplete
//             disablePortal
//             id="combo-box-demo"
//             options={cardData}
//             sx={{ width: 300, marginLeft: "20px"}}
//             onChange={(e, v) => {
//               filterData(v);
//             }}
//             getOptionLabel={(rows) => rows.bin_name || ""}
//             renderInput={(params) => (
//               <TextField {...params} label="Search by name" />
//             )}
//           />

//         </div>
//         <Box sx={{ display: "flex" }}>
//           <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
//             <Grid container spacing={2}>
//               {cardData.map((bin) => (
//                 <Grid item xs={12} sm={6} md={4} key={bin.bin_id}>
//                   <Stack direction="row" spacing={2}>
//                     <Card sx={{ width: "100%" }} className="gradient" onClick={() => handleOpenAddModal(bin.bin_id)}>
//                       <CardContent>
//                         <div>
//                           <CreditCardIcon sx={{ color: "white", marginTop: 2 }} />
//                         </div>
//                         <Typography gutterBottom variant="h5" component="div" align="center">
//                           {bin.bin_name}
//                         </Typography>
//                         <Typography gutterBottom variant="body2" component="div">
//                           {bin.type_name}
//                         </Typography>
//                         <Typography gutterBottom variant="body2" component="div" sx={{ color: "gray" }}>
//                           {bin.address}
//                         </Typography>
//                       </CardContent>
//                     </Card>          
//                   </Stack>
//                 </Grid>
//               ))}
//             </Grid>
//             <Box height={30} />
//           </Box>
//         </Box>
//       </div>
//     </>
//   );
// }



import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import AddBinDetails from "./AddBinDetails";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BinList() {
  const [driverId, setDriverId] = useState(null);
  const [cardData, setCardData] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [selectedBinId, setSelectedBinId] = useState(null);
  const navigate = useNavigate();

  const handleCloseAddModal = () => setOpenAddModal(false);

  const handleOpenAddModal = (binId) => {
    setSelectedBinId(binId);
    setOpenAddModal(true);
  };

  useEffect(() => {
    fetchBins();
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/auth/authenticated", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.authenticated) {
          fetchDriverId(res.data.user.id);
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const fetchDriverId = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/driver/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch driver id");
      }
      const data = await response.json();
      setDriverId(data.driver_id);
    } catch (error) {
      console.error("Error fetching driver id:", error);
    }
  };

  const fetchBins = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/driver/bin");
      if (!response.ok) {
        throw new Error("Failed to fetch bins");
      }
      const data = await response.json();
      setCardData(data);
    } catch (error) {
      console.error("Error fetching bins:", error);
    }
  };
  
  

  const filterData = (v) => {
    if (v) {
      setCardData([v]);
    } else {
      setCardData([]);
      window.location.reload();
    }
  };

  return (
    <>
      <div>
        <Modal
          open={openAddModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AddBinDetails
              closeEvent={handleCloseAddModal}
              binId={selectedBinId}
              driverId={driverId}
            />
          </Box>
        </Modal>
      </div>
      <div>
        <Box height={30} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            marginRight: "20px",
          }}
        >
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={cardData}
            sx={{ width: 300, marginLeft: "20px" }}
            onChange={(e, v) => {
              filterData(v);
            }}
            getOptionLabel={(rows) => rows.bin_name || ""}
            renderInput={(params) => (
              <TextField {...params} label="Search by name" />
            )}
          />
        </div>
        <Box sx={{ display: "flex" }}>
          <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
            <Grid container spacing={2}>
              {cardData.map((bin) => (
                <Grid item xs={12} sm={6} md={4} key={bin.bin_id}>
                  <Stack direction="row" spacing={2}>
                    <Card
                      sx={{ width: "100%" }}
                      className="gradient"
                      onClick={() => handleOpenAddModal(bin.bin_id)}
                    >
                      <CardContent>
                        <div>
                          <CreditCardIcon
                            sx={{ color: "white", marginTop: 2 }}
                          />
                        </div>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          align="center"
                        >
                          {bin.bin_name}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="body2"
                          component="div"
                        >
                          {bin.type_name}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="body2"
                          component="div"
                          sx={{ color: "gray" }}
                        >
                          {bin.address}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Stack>
                </Grid>
              ))}
            </Grid>
            <Box height={30} />
          </Box>
        </Box>
      </div>
    </>
  );
}
