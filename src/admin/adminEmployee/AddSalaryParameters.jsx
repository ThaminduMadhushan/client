import React, { useState, useEffect } from "react";
import { Grid, IconButton, Typography, Box, TextField, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const roles = ["driver", "bailer"]; // Adjust as necessary for your roles

function AddSalaryParameters({ closeEvent }) {
  const [role, setRole] = useState(roles[0]);
  const [basicSalary, setBasicSalary] = useState("");
  const [epf, setEpf] = useState("");
  const [bonus, setBonus] = useState("");
  const [monthlyTarget, setMonthlyTarget] = useState("");
  const [targetBonus, setTargetBonus] = useState("");
  const [error, setError] = useState("");
  const [admin_id, setAdminId] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/auth/authenticated", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.authenticated) {
          AdminId(res.data.user.id);
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/login");
      });
  }, [navigate]);

  const AdminId = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/admin/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch admin id");
      }
      const data = await response.json();
      setAdminId(data.admin_id);
    } catch (error) {
      console.error("Error fetching admin id:", error);
    }
  };

  const handleRoleChange = (event, value) => {
    setRole(value);
  };

  const validateFields = () => {
    if (!role || !basicSalary || !epf || !bonus || !monthlyTarget || !targetBonus) {
      setError("All fields are required");
      return false;
    }

    if (isNaN(basicSalary) || isNaN(epf) || isNaN(bonus) || isNaN(monthlyTarget) || isNaN(targetBonus)) {
      setError("Numeric fields must contain only numbers");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async () => {
    const isValid = validateFields();
    if (!isValid) return;

    fetch("http://localhost:3001/api/salary/parameters/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role,
        basic_salary: basicSalary,
        epf,
        bonus,
        monthly_target: monthlyTarget,
        target_bonus: targetBonus,
        admin_id: admin_id,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add salary parameter");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Salary parameter added:", data);
        Swal.fire("Success!", "Salary parameter added successfully.", "success");
        closeEvent();
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error adding salary parameter:", error);
        Swal.fire("Error!", "Failed to add the salary parameter.", "error");
        closeEvent();
      });
  };

  return (
    <div>
      <Box sx={{ m: 2 }}></Box>
      <Typography variant="h5" align="center">
        Add Salary Parameter
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
          <Autocomplete
            options={roles}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Role"
                variant="outlined"
                size="small"
              />
            )}
            value={role}
            onChange={handleRoleChange}
            sx={{ width: "100%" }}
            isOptionEqualToValue={(option, value) =>
              option === value || value === ""
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Basic Salary"
            variant="outlined"
            size="small"
            value={basicSalary}
            onChange={(e) => setBasicSalary(e.target.value)}
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="EPF %"
            variant="outlined"
            size="small"
            value={epf}
            onChange={(e) => setEpf(e.target.value)}
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Bonus"
            variant="outlined"
            size="small"
            value={bonus}
            onChange={(e) => setBonus(e.target.value)}
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Monthly Target"
            variant="outlined"
            size="small"
            value={monthlyTarget}
            onChange={(e) => setMonthlyTarget(e.target.value)}
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Target Bonus per Unit"
            variant="outlined"
            size="small"
            value={targetBonus}
            onChange={(e) => setTargetBonus(e.target.value)}
            sx={{ width: "100%" }}
          />
        </Grid>
        {error && (
          <Typography variant="body2" color="error" align="center">
            {error}
          </Typography>
        )}
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
}

export default AddSalaryParameters;
