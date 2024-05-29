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
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";


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

export default function CancelOrder() {
  const [user, setUser] = useState();
  const [userId, setUserId] = useState();

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

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/auth/authenticated", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.authenticated) {
          setUser(res.data.user);
          customerId(res.data.user.id);

        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const customerId = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/customer/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch customer id");
      }
      const data = await response.json();
      setUserId(data.customer_id);
      fetchOrders(data.customer_id); // Assuming data is an array of objects
    } catch (error) {
      console.error("Error fetching customer id:", error);
    }
  };
  const fetchOrders = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/customer/cancelled/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await response.json();
      setRows(data); // Assuming data is an array of objects
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  const deleteUser = async (id) => {
    try {
      const confirmed = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (confirmed.isConfirmed) {
        const response = await fetch(`http://localhost:3001/api/orders/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete order");
        }

        const newRows = rows.filter((row) => row.id !== id);
        setRows(newRows);

        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      Swal.fire("Error!", "Failed to delete the order.", "error");
    }
  };

  const filterData = (v) => {
    if (v) {
      setRows([v]);
    } else {
      setRows([]);
      fetchOrders();
      window.location.reload();
    }
  };

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ padding: "20px" }}
        >
          ORDER
        </Typography>
        <Divider />
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
                  Action
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
                      {row.price}
                    </TableCell>
                    <TableCell key={row.id} align={"left"}>
                      {row.created_at}
                    </TableCell>
                    <TableCell key={row.id} align={"left"}>
                      {row.updated_at}
                    </TableCell>
                    <TableCell align={"left"}>
                      <Stack spacing={2} direction="row">
                        <DeleteIcon
                          style={{
                            fontSize: "20px",
                            color: "#02294F",
                            cursor: "pointer",
                          }}
                          className="cursor-pointer"
                          onClick={() => deleteUser(row.order_id)}
                        />
                      </Stack>
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

