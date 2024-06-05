import { Grid, IconButton, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const roles = ["Driver", "Bailer"];

function AddEmployees({ closeEvent }) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState(roles[0]); // Set initial role to the first option
  const [address, setAddress] = useState("");
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

  const handleFirstnameChange = (event) => {
    setFirstname(event.target.value);
  };

  const handleLastnameChange = (event) => {
    setLastname(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };
  const handleRoleChange = (event, value) => {
    setRole(value);
  };

  const validateEmail = async (email) => {
    try {
      const response = await fetch("http://localhost:3001/api/validate/email");
      const emails = await response.json();
      return emails.some((user) => user.email === email);
    } catch (error) {
      console.error("Error checking email:", error);
      return false;
    }
  };

  const validateFields = async () => {
    if (!firstname || !lastname || !email || !phone || !role || !address) {
      setError("All fields are required");
      return false;
    }

    const nameRegex = /^[a-zA-Z]+$/;
    if (!nameRegex.test(firstname) || !nameRegex.test(lastname)) {
      setError("Name fields must contain only letters");
      return false;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      setError("Phone number must be 10 digits long");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return false;
    }

    const emailExists = await validateEmail(email);
    if (emailExists) {
      setError("Email already exists");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async () => {
    const isValid = await validateFields();
    if (!isValid) return;

    fetch("http://localhost:3001/api/employees/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        phone,
        address,
        role,
        admin_id: admin_id,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add employee");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Employee created:", data);
        Swal.fire("Success!", "Employee added successfully.", "success");
        closeEvent();
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error adding employee:", error);
        Swal.fire("Error!", "Failed to add the employee.", "error");
        closeEvent();
      });
  };

  return (
    <div>
      <Box sx={{ m: 2 }}></Box>
      <Typography variant="h5" align="center">
        Add Employee
      </Typography>
      <IconButton
        style={{ position: "absolute", top: 0, right: 0 }}
        onClick={closeEvent}
      >
        <CloseIcon />
      </IconButton>
      <Box height={20}></Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            size="small"
            value={firstname}
            onChange={handleFirstnameChange}
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            size="small"
            value={lastname}
            onChange={handleLastnameChange}
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            size="small"
            value={email}
            onChange={handleEmailChange}
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Phone"
            variant="outlined"
            size="small"
            value={phone}
            onChange={handlePhoneChange}
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Address"
            variant="outlined"
            size="small"
            value={address}
            onChange={handleAddressChange}
            sx={{ width: "100%" }}
          />
        </Grid>
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

export default AddEmployees;
