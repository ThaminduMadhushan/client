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
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export default function FinishedOrder() {

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
          fetchOrders();
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigate]);


  const fetchOrders = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/admin/finished`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await response.json();
      setRows(data); 
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

 
  const filterData = (v) => {
    if (v) {
      setRows([v]);
    } else {
      setRows([]);
      fetchOrders();
    }
  };

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Box height={10} />
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
            getOptionLabel={(rows) => rows.order_name || ""}
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
                  Name
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Customer Name
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Product Name
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Quantity
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Price
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Create Date
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Update Date
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Bailer
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  admin
                </TableCell>
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
                  >
                    <TableCell key={row.id} align={"left"}>
                      {row.order_name}
                    </TableCell>
                    <TableCell key={row.id} align={"left"}>
                      {row.customer_name}
                    </TableCell>
                    <TableCell key={row.id} align={"left"}>
                      {row.product_name}
                    </TableCell>
                    <TableCell key={row.id} align={"left"}>
                      {row.quantity}
                    </TableCell>
                    <TableCell key={row.id} align={"left"}>
                      {row.price}
                    </TableCell>
                    <TableCell key={row.id} align={"left"}>
                      {row.created_at}
                    </TableCell>
                    <TableCell key={row.id} align={"left"}>
                      {row.updated_at}
                    </TableCell>
                    <TableCell key={row.id} align={"left"}>
                      {row.bailer_name}
                    </TableCell>
                    <TableCell key={row.id} align={"left"}>
                      {row.admin_name}
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