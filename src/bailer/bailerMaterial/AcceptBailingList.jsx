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
import { Divider, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";


export default function BailingList() {

  const [userId, setUserId] = useState();
  const [bailingDetails, setBailingDetails] = useState([]); // Renamed from rows to bailings for clarity

  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
      fetchBailingDetails(data.bailer_id);
    } catch (error) {
      console.error("Error fetching bailer id:", error);
    }
  };

  const fetchBailingDetails = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/bailer/details/accept/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch bailing details");
      }
      const data = await response.json();
      setBailingDetails(data);
    } catch (error) {
      console.error("Error fetching bailing details:", error);
    }
  };

  const filterData = (v) => {
    if (v) {
      setBailingDetails([v]);
    } else {
      setBailingDetails(userId);
    }
  };

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Typography variant="h5" align="left" sx={{ m: 2 }}>
          Accept Bailing List
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Box p={2}>
            <Autocomplete
              onChange={(e, v) => filterData(v)}
              id="free-solo-demo"
              sx={{ width: 300 }}
              freeSolo
              options={bailingDetails.map((option) => option.bailing_name)}
              renderInput={(params) => (
                <TextField {...params} label="Search Bailing" />
              )}
            />
          </Box>
        </Stack>
        
        <Divider />
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Bailing Name</TableCell>
                <TableCell>Material Name</TableCell>
                <TableCell>Material Quantity</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Product Quantity</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bailingDetails
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((bailing) => (
                  <TableRow key={bailing.bailing_id}>
                    <TableCell>{bailing.bailing_name}</TableCell>
                    <TableCell>{bailing.material_name}</TableCell>
                    <TableCell>{bailing.material_quantity}</TableCell>
                    <TableCell>{bailing.product_name}</TableCell>
                    <TableCell>{bailing.product_quantity}</TableCell>
                    <TableCell>{bailing.date}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={bailingDetails.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
