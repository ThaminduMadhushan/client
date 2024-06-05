// import { Grid, IconButton, Typography } from "@mui/material";
// import React, { useState, useEffect } from "react";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import CloseIcon from "@mui/icons-material/Close";
// import Swal from "sweetalert2";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const GeneratingSalaries = ({ closeEvent, fetchSalaries }) => {
//   const [adminId, setAdminId] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get("http://localhost:3001/api/auth/authenticated", {
//         withCredentials: true,
//       })
//       .then((res) => {
//         if (res.data.authenticated) {
//           setAdminId(res.data.user.id);
//         } else {
//           navigate("/login");
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//         navigate("/login");
//       });
//   }, [navigate]);

//   const fetchCollections = async (role) => {
//     try {
//       const response = await fetch(`http://localhost:3001/api/salary/collection/${role}`);
//       if (!response.ok) {
//         throw new Error(`Failed to fetch ${role} collection`);
//       }
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error(`Error fetching ${role} collection:`, error);
//       return [];
//     }
//   };

//   const fetchSalaryParameters = async () => {
//     try {
//       const response = await fetch(`http://localhost:3001/api/salary/parameters`);
//       if (!response.ok) {
//         throw new Error("Failed to fetch salary parameters");
//       }
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error("Error fetching salary parameters:", error);
//       return [];
//     }
//   };

//   const calculateSalaries = (collections, parameters) => {
//     const salaries = [];
//     const groupedCollections = collections.reduce((acc, curr) => {
//       acc[curr.user_id] = (acc[curr.user_id] || 0) + curr.quantity;
//       return acc;
//     }, {});

//     Object.keys(groupedCollections).forEach((userId) => {
//       const totalCollection = groupedCollections[userId];
//       parameters.forEach((param) => {
//         const isTargetMet = totalCollection > param.monthly_target;
//         const targetBonus = isTargetMet
//           ? (totalCollection - param.monthly_target) * param.target_bonus
//           : 0;
//         const fullPayment =
//           parseFloat(param.basic_salary) -
//           (parseFloat(param.basic_salary) * param.epf) / 100 +
//           parseFloat(param.bonus) +
//           targetBonus;

//         const salary = {
//           employee_id: userId,
//           admin_id: param.admin_id,
//           full_payment: fullPayment.toFixed(2),
//           total_quantity: totalCollection,
//           target_bonus: targetBonus.toFixed(2),
//           status: "calculated",
//         };

//         // Ensure no duplicate salaries for the same employee_id in the same calculation
//         const existingSalaryIndex = salaries.findIndex(
//           (s) => s.employee_id === userId
//         );
//         if (existingSalaryIndex === -1) {
//           salaries.push(salary);
//         } else {
//           salaries[existingSalaryIndex] = salary;
//         }
//       });
//     });

//     return salaries;
//   };

//   const saveSalaries = async (salaries) => {
//     try {
//       await Promise.all(
//         salaries.map((salary) =>
//           fetch("http://localhost:3001/api/salary/save", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(salary),
//           })
//         )
//       );
//       Swal.fire("Success!", "Salaries added successfully.", "success");
//       fetchSalaries(); // Fetch the updated list of salaries
//       closeEvent();
//     } catch (error) {
//       console.error("Error saving salaries:", error);
//       Swal.fire("Error!", "Failed to save salaries.", "error");
//       closeEvent();
//     }
//   };

//   const handleSubmit = async () => {
//     const driverCollections = await fetchCollections("driver");
//     const bailerCollections = await fetchCollections("bailer");
//     const allCollections = [...driverCollections, ...bailerCollections];
//     const parameters = await fetchSalaryParameters();
//     const salaries = calculateSalaries(allCollections, parameters);
//     await saveSalaries(salaries);
//   };

//   return (
//     <div>
//       <Box sx={{ m: 2 }}></Box>
//       <Typography variant="h5" align="center">
//         Save Salaries
//       </Typography>
//       <IconButton
//         style={{ position: "absolute", top: 0, right: 0 }}
//         onClick={closeEvent}
//       >
//         <CloseIcon />
//       </IconButton>
//       <Box height={20}></Box>
//       <Grid container spacing={2}>
//         <Grid item xs={12}>
//           <Typography variant="h5" align="center">
//             <Button variant="contained" onClick={handleSubmit}>
//               Submit
//             </Button>
//           </Typography>
//         </Grid>
//       </Grid>
//       <Box sx={{ m: 2 }}></Box>
//     </div>
//   );
// };

// export default GeneratingSalaries;


// import React, { useState, useEffect } from "react";
// import { Grid, IconButton, Typography, Box, Button, TextField } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import Swal from "sweetalert2";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// const GeneratingSalaries = ({ closeEvent, fetchSalaries }) => {
//   const [adminId, setAdminId] = useState(null);
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get("http://localhost:3001/api/auth/authenticated", {
//         withCredentials: true,
//       })
//       .then((res) => {
//         if (res.data.authenticated) {
//           setAdminId(res.data.user.id);
//         } else {
//           navigate("/login");
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//         navigate("/login");
//       });
//   }, [navigate]);

//   const fetchCollections = async (role) => {
//     try {
//       const response = await fetch(`http://localhost:3001/api/salary/collection/${role}?startDate=${startDate}&endDate=${endDate}`);
//       if (!response.ok) {
//         throw new Error(`Failed to fetch ${role} collection`);
//       }
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error(`Error fetching ${role} collection:`, error);
//       return [];
//     }
//   };

//   const fetchSalaryParameters = async () => {
//     try {
//       const response = await fetch(`http://localhost:3001/api/salary/parameters`);
//       if (!response.ok) {
//         throw new Error("Failed to fetch salary parameters");
//       }
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error("Error fetching salary parameters:", error);
//       return [];
//     }
//   };

//   const calculateSalaries = (collections, parameters) => {
//     const salaries = [];
//     const groupedCollections = collections.reduce((acc, curr) => {
//       acc[curr.user_id] = (acc[curr.user_id] || 0) + curr.quantity;
//       return acc;
//     }, {});

//     Object.keys(groupedCollections).forEach((userId) => {
//       const totalCollection = groupedCollections[userId];
//       parameters.forEach((param) => {
//         const isTargetMet = totalCollection > param.monthly_target;
//         const targetBonus = isTargetMet
//           ? (totalCollection - param.monthly_target) * param.target_bonus
//           : 0;
//         const fullPayment =
//           parseFloat(param.basic_salary) -
//           (parseFloat(param.basic_salary) * param.epf) / 100 +
//           parseFloat(param.bonus) +
//           targetBonus;

//         const salary = {
//           employee_id: userId,
//           admin_id: param.admin_id,
//           full_payment: fullPayment.toFixed(2),
//           total_quantity: totalCollection,
//           target_bonus: targetBonus.toFixed(2),
//           status: "calculated",
//         };

//         // Ensure no duplicate salaries for the same employee_id in the same calculation
//         const existingSalaryIndex = salaries.findIndex(
//           (s) => s.employee_id === userId
//         );
//         if (existingSalaryIndex === -1) {
//           salaries.push(salary);
//         } else {
//           salaries[existingSalaryIndex] = salary;
//         }
//       });
//     });

//     return salaries;
//   };

//   const saveSalaries = async (salaries) => {
//     try {
//       await Promise.all(
//         salaries.map((salary) =>
//           fetch("http://localhost:3001/api/salary/save", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(salary),
//           })
//         )
//       );
//       Swal.fire("Success!", "Salaries added successfully.", "success");
//       fetchSalaries(); // Fetch the updated list of salaries
//       closeEvent();
//     } catch (error) {
//       console.error("Error saving salaries:", error);
//       Swal.fire("Error!", "Failed to save salaries.", "error");
//       closeEvent();
//     }
//   };

//   const handleSubmit = async () => {
//     if (!startDate || !endDate) {
//       Swal.fire("Error!", "Please select both start and end dates.", "error");
//       return;
//     }

//     const driverCollections = await fetchCollections("driver");
//     const bailerCollections = await fetchCollections("bailer");
//     const allCollections = [...driverCollections, ...bailerCollections];
//     const parameters = await fetchSalaryParameters();
//     const salaries = calculateSalaries(allCollections, parameters);
//     await saveSalaries(salaries);
//   };

//   return (
//     <div>
//       <Box sx={{ m: 2 }}></Box>
//       <Typography variant="h5" align="center">
//         Save Salaries
//       </Typography>
//       <IconButton
//         style={{ position: "absolute", top: 0, right: 0 }}
//         onClick={closeEvent}
//       >
//         <CloseIcon />
//       </IconButton>
//       <Box height={20}></Box>
//       <Grid container spacing={2}>
//         <Grid item xs={12} md={6}>
//           <DatePicker
//             selected={startDate}
//             onChange={(date) => setStartDate(date)}
//             dateFormat="yyyy-MM-dd"
//             placeholderText="Select Start Date"
//             className="form-control"
//           />
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <DatePicker
//             selected={endDate}
//             onChange={(date) => setEndDate(date)}
//             dateFormat="yyyy-MM-dd"
//             placeholderText="Select End Date"
//             className="form-control"
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <Typography variant="h5" align="center">
//             <Button variant="contained" onClick={handleSubmit}>
//               Submit
//             </Button>
//           </Typography>
//         </Grid>
//       </Grid>
//       <Box sx={{ m: 2 }}></Box>
//     </div>
//   );
// };

// export default GeneratingSalaries;

import React, { useState, useEffect } from "react";
import { Grid, IconButton, Typography, Box, Button, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const GeneratingSalaries = ({ closeEvent, fetchSalaries }) => {
  const [adminId, setAdminId] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
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
        navigate("/login");
      });
  }, [navigate]);

  const fetchCollections = async (role) => {
    try {
      const response = await fetch(`http://localhost:3001/api/salary/collection/${role}?startDate=${startDate.toISOString().split('T')[0]}&endDate=${endDate.toISOString().split('T')[0]}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${role} collection`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching ${role} collection:`, error);
      return [];
    }
  };

  const fetchSalaryParameters = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/salary/parameters`);
      if (!response.ok) {
        throw new Error("Failed to fetch salary parameters");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching salary parameters:", error);
      return [];
    }
  };

  const calculateSalaries = (collections, parameters) => {
    const salaries = [];
    const groupedCollections = collections.reduce((acc, curr) => {
      acc[curr.user_id] = (acc[curr.user_id] || 0) + curr.quantity;
      return acc;
    }, {});

    Object.keys(groupedCollections).forEach((userId) => {
      const totalCollection = groupedCollections[userId];
      parameters.forEach((param) => {
        const isTargetMet = totalCollection > param.monthly_target;
        const targetBonus = isTargetMet
          ? (totalCollection - param.monthly_target) * param.target_bonus
          : 0;
        const fullPayment =
          parseFloat(param.basic_salary) -
          (parseFloat(param.basic_salary) * param.epf) / 100 +
          parseFloat(param.bonus) +
          targetBonus;

        const salary = {
          employee_id: userId,
          admin_id: param.admin_id,
          full_payment: fullPayment.toFixed(2),
          total_quantity: totalCollection,
          target_bonus: targetBonus.toFixed(2),
          status: "calculated",
        };

        // Ensure no duplicate salaries for the same employee_id in the same calculation
        const existingSalaryIndex = salaries.findIndex(
          (s) => s.employee_id === userId
        );
        if (existingSalaryIndex === -1) {
          salaries.push(salary);
        } else {
          salaries[existingSalaryIndex] = salary;
        }
      });
    });

    return salaries;
  };

  const saveSalaries = async (salaries) => {
    try {
      await Promise.all(
        salaries.map((salary) =>
          fetch("http://localhost:3001/api/salary/save", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(salary),
          })
        )
      );
      Swal.fire("Success!", "Salaries added successfully.", "success");
      fetchSalaries(); // Fetch the updated list of salaries
      closeEvent();
    } catch (error) {
      console.error("Error saving salaries:", error);
      Swal.fire("Error!", "Failed to save salaries.", "error");
      closeEvent();
    }
  };

  const handleSubmit = async () => {
    if (!startDate || !endDate) {
      Swal.fire("Error!", "Please select both start and end dates.", "error");
      return;
    }

    const driverCollections = await fetchCollections("driver");
    const bailerCollections = await fetchCollections("bailer");
    const allCollections = [...driverCollections, ...bailerCollections];
    const parameters = await fetchSalaryParameters();
    const salaries = calculateSalaries(allCollections, parameters);
    await saveSalaries(salaries);
  };

  return (
    <div>
      <Box sx={{ m: 2 }}></Box>
      <Typography variant="h5" align="center">
        Save Salaries
      </Typography>
      <IconButton
        style={{ position: "absolute", top: 0, right: 0 }}
        onClick={closeEvent}
      >
        <CloseIcon />
      </IconButton>
      <Box height={20}></Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select Start Date"
            className="form-control"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select End Date"
            className="form-control"
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
};

export default GeneratingSalaries;
