import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Divider, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Modal from "@mui/material/Modal";
import Swal from "sweetalert2";
import AddEmployees from "./AddEmployee";
import PersonIcon from '@mui/icons-material/Person';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';

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
  borderRadius: '8px',
};

const CustomButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`,
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(105, 135, 255, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
  '&:hover': {
    background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)`,
  },
}));

export default function EmployeeInactiveList() {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/employees/inactive");
      if (!response.ok) {
        throw new Error("Failed to fetch employees");
      }
      const data = await response.json();
      setRows(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const changeStatus = async (user_id) => {
    try {
      const confirmed = await Swal.fire({
        title: "Are you sure?",
        text: "You want to set this employee as active!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, set active!",
      });

      if (confirmed.isConfirmed) {
        const response = await fetch(
          `http://localhost:3001/api/employees/status/inactive/${user_id}`,
          {
            method: "PUT",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update employee status");
        }

        const newRows = rows.map((row) =>
          row.user_id === user_id ? { ...row, status: "active" } : row
        );
        setRows(newRows);

        Swal.fire("Updated!", "Employee status has been set to active.", "success").then(
          () => {
            window.location.reload();
          }
        );
      }
    } catch (error) {
      console.error("Error updating employee status:", error);
      Swal.fire("Error!", "Failed to update the employee status.", "error");
    }
  };

  const filterData = (v) => {
    if (v) {
      setRows([v]);
    } else {
      setRows([]);
      window.location.reload();
    }
  };

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden", mt: 2 }}>
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px' }}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={rows}
            sx={{ width: 300 }}
            onChange={(e, v) => filterData(v)}
            getOptionLabel={(rows) => rows.firstname + ' ' + rows.lastname || ""}
            renderInput={(params) => <TextField {...params} label="Search by name" />}
          />
        </Box>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {['Name', 'Role', 'Phone', 'Address', 'Email', 'Created Date', 'Action'].map((header) => (
                  <TableCell
                    key={header}
                    align="left"
                    style={{ minWidth: "120px", fontWeight: 'bold', backgroundColor: theme.palette.primary.light }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    sx={{
                      '&:nth-of-type(odd)': {
                        backgroundColor: theme.palette.action.hover,
                      },
                      '&:hover': {
                        backgroundColor: theme.palette.action.selected,
                      },
                    }}
                  >
                    <TableCell align="left">{row.firstname} {row.lastname}</TableCell>
                    <TableCell align="left">{row.role}</TableCell>
                    <TableCell align="left">{row.phone}</TableCell>
                    <TableCell align="left">{row.address}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">{row.created_at}</TableCell>
                    <TableCell align="left">
                      <Stack spacing={2} direction="row">
                        <PersonIcon
                          style={{
                            fontSize: "20px",
                            color: theme.palette.error.main,
                            cursor: "pointer",
                          }}
                          onClick={() => changeStatus(row.user_id)}
                        />
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
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
