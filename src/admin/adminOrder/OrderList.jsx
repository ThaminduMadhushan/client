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
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Modal from "@mui/material/Modal";
import Swal from "sweetalert2";
import AddOrders from "./AddOrder";
import EditOrders from "./EditOrder";
import DoneIcon from '@mui/icons-material/Done';
import CancelIcon from '@mui/icons-material/Cancel';

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

export default function OrderList( closeEvent) {
  const [user, setUser] = useState();
  const [userId, setUserId] = useState();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editOrderId, setEditOrderId] = useState(null);

  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const handleOpenEditModal = (orderId) => {
    setEditOrderId(orderId);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => setOpenEditModal(false);

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
          AdminId(res.data.user.id);
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const AdminId = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/admin/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch admin id");
      }
      const data = await response.json();
      setUserId(data.admin_id);
      fetchOrders(); // Fetch orders once admin id is set
    } catch (error) {
      console.error("Error fetching admin id:", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/admin/pending`
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

  const cancelOrder = async (id) => {
    try {
      const confirmed = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, cancel it!",
      });
  
      if (confirmed.isConfirmed) {
        const response = await fetch(`http://localhost:3001/api/orders/cancel/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ adminId: userId }), // Pass the admin ID here
        });
  
        const responseData = await response.json(); // Parse the response JSON
  
        if (!response.ok) {
          throw new Error(responseData.error || "Failed to cancel order");
        }
  
        const newRows = rows.filter((row) => row.id !== id);
        setRows(newRows);
  
        Swal.fire("Canceled!", "The order has been cancelled.", "success");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      Swal.fire("Error!", error.message || "Failed to cancel the order.", "error");
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
      <div>
        <Modal
          open={openAddModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AddOrders closeEvent={handleCloseAddModal} customerId={userId} />
          </Box>
        </Modal>
        <Modal
          open={openEditModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <EditOrders
              closeEvent={handleCloseEditModal}
              orderId={editOrderId}
              adminId={userId} // Pass adminId to EditOrder component
            />
          </Box>
        </Modal>
      </div>
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
                    <TableCell align={"left"}>
                      <Stack spacing={2}>
                        <DoneIcon
                          style={{
                            fontSize: "20px",
                            color: "#02294F",
                            cursor: "pointer",
                          }}
                          className="cursor-pointer"
                          onClick={() => handleOpenEditModal(row.order_id)} // Pass the order ID to the edit modal
                        />
                        <CancelIcon
                          style={{
                            fontSize: "20px",
                            color: "#02294F",
                            cursor: "pointer",
                          }}
                          className="cursor-pointer"
                          onClick={() => cancelOrder(row.order_id)}
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