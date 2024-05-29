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
import { Divider } from "@mui/material";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import AddOrders from "./AddOrder";
import EditOrders from "./EditOrder";

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

export default function OrderList() {
  const [user, setUser] = useState();
  const [userId, setUserId] = useState();
  const [orders, setOrders] = useState([]); // Renamed from rows to orders for clarity

  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editOrderDetails, setEditOrderDetails] = useState(null); // To store the order details for editing

  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const handleOpenEditModal = (order) => {
    const now = new Date();
    const orderDate = new Date(order.created_at);
    const timeDiff = now - orderDate;

    if (timeDiff > 24 * 60 * 60 * 1000) { // Check if the order was created more than 24 hours ago
      Swal.fire("Error!", "You have exceeded the time limit to edit the order.", "error");
      return;
    }

    setEditOrderDetails(order);
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
          customerId(res.data.user.id);
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigate]);

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
      fetchOrders(data.customer_id);
    } catch (error) {
      console.error("Error fetching customer id:", error);
    }
  };

  const fetchOrders = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/customer/pending/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const deleteUser = async (id, createdAt) => {
    const now = new Date();
    const orderDate = new Date(createdAt);
    const timeDiff = now - orderDate;

    if (timeDiff > 24 * 60 * 60 * 1000) { // Check if the order was created more than 24 hours ago
      Swal.fire("Error!", "You have exceeded the time limit to delete the order.", "error");
      return;
    }

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

        const newOrders = orders.filter((order) => order.id !== id);
        setOrders(newOrders);

        Swal.fire("Deleted!", "Your order has been deleted.", "success");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      Swal.fire("Error!", "Failed to delete the order.", "error");
    }
  };

  const filterData = (v) => {
    if (v) {
      setOrders([v]);
    } else {
      fetchOrders(userId);
    }
  };

  const isEditable = (createdAt) => {
    const orderDate = new Date(createdAt);
    const now = new Date();
    const timeDiff = now - orderDate;
    return timeDiff <= 24 * 60 * 60 * 1000; // 24 hours in milliseconds
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
            {editOrderDetails && (
              <EditOrders
                closeEvent={handleCloseEditModal}
                orderDetails={editOrderDetails} // Pass the order details to the edit modal
              />
            )}
          </Box>
        </Modal>
      </div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
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
            options={orders}
            sx={{ width: 300, paddingLeft: "20px" }}
            onChange={(e, v) => {
              filterData(v);
            }}
            getOptionLabel={(order) => order.order_name || ""}
            renderInput={(params) => (
              <TextField {...params} label="Search by name" />
            )}
          />
          <Button
            variant="contained"
            color="success"
            endIcon={<AddCircleIcon />}
            onClick={handleOpenAddModal}
            size="large"
          >
            Add Order
          </Button>
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
              {orders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={order.id}>
                    <TableCell align="left">{order.order_name}</TableCell>
                    <TableCell align="left">{order.product_name}</TableCell>
                    <TableCell align="left">{order.quantity}</TableCell>
                    <TableCell align="left">{order.price}</TableCell>
                    <TableCell align="left">
                      {new Date(order.created_at).toLocaleDateString("en-GB")}
                    </TableCell>
                    <TableCell align="left">
                      {new Date(order.updated_at).toLocaleDateString("en-GB")}
                    </TableCell>
                    <TableCell align="left">
                      <Stack spacing={2} direction="row">
                        <EditIcon
                          style={{
                            fontSize: "20px",
                            color: isEditable(order.created_at) ? "#02294F" : "#d3d3d3",
                            cursor: isEditable(order.created_at) ? "pointer" : "not-allowed",
                          }}
                          className="cursor-pointer"
                          onClick={() => handleOpenEditModal(order)} // Pass the order to the edit modal
                        />
                        <DeleteIcon
                          style={{
                            fontSize: "20px",
                            color: isEditable(order.created_at) ? "#02294F" : "#d3d3d3",
                            cursor: isEditable(order.created_at) ? "pointer" : "not-allowed",
                          }}
                          className="cursor-pointer"
                          onClick={() => deleteUser(order.order_id, order.created_at)}
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
          count={orders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
