// import React, { useState, useEffect } from "react";
// import { Paper, Button, Modal } from "@mui/material";
// import { styled } from "@mui/system";
// import MonthlyReport from "./MonthlyReport";
// import WeeklyReport from "./WeeklyReport";
// import SummarizeIcon from '@mui/icons-material/Summarize';
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Box from "@mui/material/Box";
// import Typography from "../../LandingPage/components/Typography";
// import Divider from "@mui/material/Divider";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "none",
//   boxShadow: 24,
//   p: 4,
//   borderRadius: "8px",
// };

// const CustomButton = styled(Button)(({ theme }) => ({
//   background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`,
//   border: 0,
//   borderRadius: 3,
//   boxShadow: "0 3px 5px 2px rgba(105, 135, 255, .3)",
//   color: "white",
//   height: 48,
//   padding: "0 30px",
//   "&:hover": {
//     background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)`,
//   },
// }));

// export default function ReportView() {

//   const [openAddModal, setOpenAddModal] = useState(false);
//   const [openEditModal, setOpenEditModal] = useState(false);

//   const handleOpenAddModal = () => setOpenAddModal(true);
//   const handleCloseAddModal = () => setOpenAddModal(false);

//   const handleOpenEditModal = () => {
//     setOpenEditModal(true);
//   };

//   const handleCloseEditModal = () => setOpenEditModal(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get("http://localhost:3001/api/auth/authenticated", {
//         withCredentials: true,
//       })
//       .then((res) => {
//         if (res.data.authenticated) {
//         } else {
//           navigate("/login");
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [navigate]);

//   return (
//     <>
//       <div>
//         <Modal
//           open={openAddModal}
//           aria-labelledby="modal-modal-title"
//           aria-describedby="modal-modal-description"
//         >
//           <Box sx={style}>
//             <WeeklyReport closeEvent={handleCloseAddModal} />
//           </Box>
//         </Modal>
//         <Modal
//           open={openEditModal}
//           aria-labelledby="modal-modal-title"
//           aria-describedby="modal-modal-description"
//         >
//           <Box sx={style}>
//             <MonthlyReport closeEvent={handleCloseEditModal} />
//           </Box>
//         </Modal>
//       </div>
//       <Paper sx={{ width: "100%", overflow: "hidden" }}>
//         <Typography
//           gutterBottom
//           variant="h5"
//           component="div"
//           sx={{ padding: "20px" }}
//         >
//           Reports
//         </Typography>
//         <Divider />
//         <Box height={10} />
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginBottom: "20px",
//             marginRight: "20px",
//           }}
//         >
//           <CustomButton
//             endIcon={<SummarizeIcon />}
//             onClick={handleOpenAddModal}
//             size="large"
//           >
//             Weekly Report
//           </CustomButton>
//           <CustomButton
//             endIcon={<SummarizeIcon />}
//             onClick={handleOpenEditModal}
//             size="large"
//           >
//             Monthly Report
//           </CustomButton>
//         </div>
//       </Paper>
//     </>
//   );
// }


// import React, { useEffect } from "react";
// import { Paper, Button, Box, Typography, Divider } from "@mui/material";
// import { styled } from "@mui/system";
// import SummarizeIcon from '@mui/icons-material/Summarize';
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const CustomButton = styled(Button)(({ theme }) => ({
//   background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`,
//   border: 0,
//   borderRadius: 3,
//   boxShadow: "0 3px 5px 2px rgba(105, 135, 255, .3)",
//   color: "white",
//   height: 48,
//   padding: "0 30px",
//   "&:hover": {
//     background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)`,
//   },
// }));

// export default function ReportView() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get("http://localhost:3001/api/auth/authenticated", {
//         withCredentials: true,
//       })
//       .then((res) => {
//         if (!res.data.authenticated) {
//           navigate("/login");
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [navigate]);

//   const handleMonthlyReport = () => {
//     navigate('/admin/report/monthly');
//   };

//   return (
//     <Paper sx={{ width: "100%", overflow: "hidden" }}>
//       <Typography gutterBottom variant="h5" component="div" sx={{ padding: "20px" }}>
//         Reports
//       </Typography>
//       <Divider />
//       <Box height={10} />
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginBottom: "20px",
//           marginRight: "20px",
//         }}
//       >
//         <CustomButton
//           endIcon={<SummarizeIcon />}
//           onClick={handleMonthlyReport}
//           size="large"
//         >
//           Monthly Report
//         </CustomButton>
//       </div>
//     </Paper>
//   );
// }


import React, { useEffect, useState } from "react";
import { Paper, Button, Box, Typography, Divider, CircularProgress } from "@mui/material";
import { styled } from "@mui/system";
import SummarizeIcon from '@mui/icons-material/Summarize';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CustomButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`,
  border: 0,
  borderRadius: 3,
  boxShadow: "0 3px 5px 2px rgba(105, 135, 255, .3)",
  color: "white",
  height: 48,
  padding: "0 30px",
  "&:hover": {
    background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)`,
  },
}));

export default function ReportView() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/auth/authenticated", {
        withCredentials: true,
      })
      .then((res) => {
        if (!res.data.authenticated) {
          navigate("/login");
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/login");
      });
  }, [navigate]);

  const handleMonthlyReport = () => {
    navigate('/admin/report/monthly');
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Reports
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
        <CustomButton
          endIcon={<SummarizeIcon />}
          onClick={handleMonthlyReport}
          size="large"
        >
          Monthly Report
        </CustomButton>
      </Box>
    </Paper>
  );
}
