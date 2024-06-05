import React, { useState, useEffect } from "react";
import { Grid, IconButton, Typography, Box, TextField, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";
import Autocomplete from "@mui/material/Autocomplete";

const roles = ["driver", "bailer"]; // Adjust as necessary for your roles

function EditParameter({ closeEvent, parameter }) {
  const [role, setRole] = useState(parameter.role);
  const [basicSalary, setBasicSalary] = useState(parameter.basic_salary);
  const [epf, setEpf] = useState(parameter.epf);
  const [bonus, setBonus] = useState(parameter.bonus);
  const [monthlyTarget, setMonthlyTarget] = useState(parameter.monthly_target);
  const [targetBonus, setTargetBonus] = useState(parameter.target_bonus);
  const [error, setError] = useState("");

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

    fetch(`http://localhost:3001/api/salary/parameters/update/${parameter.id}`, {
      method: "PUT",
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
        admin_id: parameter.admin_id,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update salary parameter");
        }
        return response.json();
      })
      .then((data) => {
        Swal.fire("Success", "Salary parameter updated successfully", "success");
        closeEvent();
        window.location.reload();
      })
      .catch((error) => {
        Swal.fire("Error", "Failed to update salary parameter", "error");
        console.error("Error updating salary parameter:", error);
        closeEvent();
      });
  };

  return (
    <Box>
      <Grid container spacing={2} justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Salary Parameter
          </Typography>
        </Grid>
        <Grid item>
          <IconButton onClick={closeEvent}>
            <CloseIcon />
          </IconButton>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Autocomplete
            options={roles}
            value={role}
            onChange={handleRoleChange}
            renderInput={(params) => <TextField {...params} label="Role" />}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Basic Salary"
            type="number"
            value={basicSalary}
            onChange={(e) => setBasicSalary(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="EPF (%)"
            type="number"
            value={epf}
            onChange={(e) => setEpf(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Bonus"
            type="number"
            value={bonus}
            onChange={(e) => setBonus(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Monthly Target"
            type="number"
            value={monthlyTarget}
            onChange={(e) => setMonthlyTarget(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Target Bonus per unit"
            type="number"
            value={targetBonus}
            onChange={(e) => setTargetBonus(e.target.value)}
          />
        </Grid>
      </Grid>

      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}

      <Grid container justifyContent="flex-end" spacing={2} sx={{ marginTop: 2 }}>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default EditParameter;
