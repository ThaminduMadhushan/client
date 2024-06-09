import React, { useState, useEffect } from "react";
import { Grid, IconButton, Typography, Box, Button, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Autocomplete from "@mui/material/Autocomplete";

const SalaryForOneEmployee = ({ closeEvent, fetchSalaries }) => {
  const [adminId, setAdminId] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [employees, setEmployees] = useState([]);
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

    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/employees/all');
        if (!response.ok) {
          throw new Error('Failed to fetch employees');
        }
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, [navigate]);

  const fetchCollections = async (employeeId) => {
    const start = new Date(startDate).toISOString().split('T')[0];
    const end = new Date(endDate).toISOString().split('T')[0];

    try {
      const response = await fetch(
        `http://localhost:3001/api/salary/all/collection/${employeeId}?startDate=${start}&endDate=${end}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch collections');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching collections:', error);
      return [];
    }
  };

  const fetchSalaryParameters = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/salary/parameters');
      if (!response.ok) {
        throw new Error('Failed to fetch salary parameters');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching salary parameters:', error);
      return [];
    }
  };

  const calculateSalary = (collections, parameters, daysInMonth) => {
    const totalCollection = collections.reduce((sum, collection) => sum + collection.quantity, 0);

    const employeeRole = collections.length > 0 ? collections[0].role : selectedEmployee.role;
    const param = parameters.find((param) => param.role.toLowerCase() === employeeRole.toLowerCase());

    if (param) {
      const basicSalary = (Number(param.basic_salary) / daysInMonth) * daysInMonth;
      const isTargetMet = totalCollection > Number(param.monthly_target);
      const targetBonus = isTargetMet ? (totalCollection - Number(param.monthly_target)) * Number(param.target_bonus) : 0;
      const fullPayment = 
        Number(basicSalary) - 
        (Number(basicSalary) * Number(param.epf) / 100) +
        Number(param.bonus) + 
        targetBonus;

      return {
        employee_id: selectedEmployee.user_id, // Use user_id as employee_id
        admin_id: adminId,
        basic_salary: Number(basicSalary).toFixed(2),
        epf: Number(param.epf).toFixed(2),
        bonus: Number(param.bonus).toFixed(2),
        monthly_target: Number(param.monthly_target).toFixed(2),
        unit_target_bonus: Number(param.target_bonus).toFixed(2),
        full_payment: Number(fullPayment).toFixed(2),
        total_quantity: totalCollection,
        target_bonus: Number(targetBonus).toFixed(2),
        status: "unpaid",
        month: `${startDate.getFullYear()}-${(startDate.getMonth() + 1).toString().padStart(2, '0')}` // YYYY-MM format
      };
    }

    return null;
  };

  const handleSubmit = async () => {
    if (!selectedEmployee) {
      Swal.fire("Error!", "Please select an employee.", "error");
      return;
    }

    if (!startDate || !endDate) {
      Swal.fire("Error!", "Please select a date range.", "error");
      return;
    }

    const daysInMonth = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) + 1;

    const collections = await fetchCollections(selectedEmployee.user_id); // Use user_id as employee_id
    const parameters = await fetchSalaryParameters();
    const salary = calculateSalary(collections, parameters, daysInMonth);

    if (salary) {
      try {
        const response = await fetch("http://localhost:3001/api/salary/save", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(salary),
        });

        if (!response.ok) {
          throw new Error('Failed to save salary');
        }

        Swal.fire("Success!", "Salary added successfully.", "success");
        fetchSalaries();
        closeEvent();
      } catch (error) {
        console.error("Error saving salary:", error);
        Swal.fire("Error!", "Failed to save salary.", "error");
      }
    } else {
      Swal.fire("Error!", "Failed to calculate salary.", "error");
    }
  };

  return (
    <div>
      <Box sx={{ m: 2 }}></Box>
      <Typography variant="h5" align="center">
        Save Salary for One Employee
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
            disablePortal
            options={employees}
            getOptionLabel={(option) => `${option.firstname} ${option.lastname}`}
            onChange={(event, value) => setSelectedEmployee(value)}
            renderInput={(params) => <TextField {...params} label="Employee" />}
            fullWidth
          />
        </Grid>
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

export default SalaryForOneEmployee;
