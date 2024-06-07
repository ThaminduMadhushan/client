import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export default function SalaryList() {
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState(0);
  const navigate = useNavigate();
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/auth/authenticated", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.authenticated) {
          setUser(res.data.user);
          driverId(res.data.user.id);
          fetchSalary(res.data.user.id);
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const driverId = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/driver/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch driver id");
      }
      const data = await response.json();
      setUserId(data.driver_id);
    } catch (error) {
      console.error("Error fetching driver id:", error);
    }
  };

  const fetchSalary = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/driver/salary/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch salary");
      }
      const data = await response.json();
      // Check if the fetched data is an array or a single object
      if (Array.isArray(data)) {
        setRows(data);
      } else if (data !== null && typeof data === 'object') {
        setRows([data]);
      } else {
        console.error("Fetched data is not in expected format:", data);
      }
    } catch (error) {
      console.error("Error fetching salary:", error);
    }
  };

  const filterData = (v) => {
    if (v) {
      setRows([v]);
    } else {
      setRows([]);
      fetchSalary(userId);
    }
  };

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Box height={20} />
        <Typography
          variant="h5"
          component="div"
          sx={{ display: "flex", justifyContent: "left", paddingLeft: "20px" }}
        >
            Salary Details
        </Typography>
        <Box height={20} />
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
            options={rows}
            sx={{ width: 300, paddingLeft: "20px" }}
            onChange={(e, v) => {
              filterData(v);
            }}
            getOptionLabel={(row) => row.created_at || ""}
            renderInput={(params) => (
              <TextField {...params} label="Search by name" />
            )}
          />
        </div>

        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Date
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Full Payment
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Admin Name 
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Status
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Basic Salary
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  EPF
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Bonus
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Total Collection
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Monthly Target
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Target Bonus for Unit
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Target Bonus
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={index}
                  >
                    <TableCell key={row.salary_id} align={"left"}>
                      {row.created_at}
                    </TableCell>
                    <TableCell key={row.salary_id} align={"left"}>
                      {row.full_payment}
                    </TableCell>
                    <TableCell key={row.salary_id} align={"left"}>
                      {row.admin_name}
                    </TableCell>
                    <TableCell key={row.salary_id} align={"left"}>
                      {row.status}
                    </TableCell>
                    <TableCell key={row.salary_id} align={"left"}>
                      {row.basic_salary}
                    </TableCell>
                    <TableCell key={row.salary_id} align={"left"}>
                      {row.epf}
                    </TableCell>
                    <TableCell key={row.salary_id} align={"left"}>
                      {row.bonus}
                    </TableCell>
                    <TableCell key={row.salary_id} align={"left"}>
                      {row.total_quantity}
                    </TableCell>
                    <TableCell key={row.salary_id} align={"left"}>
                      {row.monthly_target}
                    </TableCell>
                    <TableCell key={row.salary_id} align={"left"}>
                      {row.unit_target_bonus}
                    </TableCell>
                    <TableCell key={row.salary_id} align={"left"}>
                      {row.target_bonus}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
