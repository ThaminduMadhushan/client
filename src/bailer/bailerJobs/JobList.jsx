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
import DoneIcon from '@mui/icons-material/Done';
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

export default function JobList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);

  const [userId, setUserId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/auth/authenticated", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.authenticated) {
          bailerId(res.data.user.id);
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const bailerId = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/bailer/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch bailer id");
      }
      const data = await response.json();
      setUserId(data.bailer_id);
      fetchJobs(data.bailer_id); // Assuming data is an array of objects
    } catch (error) {
      console.error("Error fetching bailer id:", error);
    }
  };

  const fetchJobs = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/bailer/jobs/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setRows(data); // Assuming data is an array of objects
      } else {
        console.error("Fetched jobs is not an array:", data);
        setRows([]);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setRows([]);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const completeJob = async (id) => {
    try {
      const confirmed = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, complete it!",
      });

      if (confirmed.isConfirmed) {
        const response = await fetch(
          `http://localhost:3001/api/bailer/complete/${id}`,
          {
            method: "PUT",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update job");
        }

        const newRows = rows.filter((row) => row.id !== id);
        setRows(newRows);

        Swal.fire("Updated!", "Your job has been completed.", "success").then(
          () => {
            window.location.reload();
          }
        );
      }
    } catch (error) {
      console.error("Error updating job :", error);
      Swal.fire("Error!", "Failed to update job.", "error");
      
    }
  };

  const filterData = (v) => {
    if (v) {
      setRows([v]);
    } else {
      setRows([]);
    }
  };

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden",  }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ padding: "20px" }}
        >
          Jobs
        </Typography>
        <Divider />
        <Box height={10} />
        <Stack direction="row" spacing={2} className="my-2 mb-2">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={rows}
            sx={{ width: 300 }}
            onChange={(e, v) => {
              filterData(v);
            }}
            getOptionLabel={(rows) => rows.order_name || ""}
            renderInput={(params) => (
              <TextField {...params} label="Search by order name" />
            )}
          />
        </Stack>
        <Box height={20} />
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Order Name
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Product
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Quantity
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Accept Date
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(rows) &&
                rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        <TableCell key={row.id} align={"left"}>
                          {row.order_name}
                        </TableCell>
                        <TableCell key={row.id} align={"left"}>
                          {row.product_name}
                        </TableCell>
                        <TableCell key={row.id} align={"left"}>
                          {row.quantity}
                        </TableCell>
                        <TableCell key={row.id} align={"left"}>
                          {row.accept_date}
                        </TableCell>
                        <TableCell align={"left"}>
                          <Stack spacing={2}>
                            <DoneIcon
                              style={{
                                fontSize: "20px",
                                color: "#02294F",
                                cursor: "pointer",
                              }}
                              className="cursor-pointer"
                              onClick={() => completeJob(row.order_id)}
                            />
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })}
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
