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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import AddBailing from "./AddBailing";
import EditBailing from "./EditBailing";

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

export default function BailingList() {
  const [user, setUser] = useState();
  const [userId, setUserId] = useState();
  const [bailingDetails, setBailingDetails] = useState([]); // Renamed from rows to bailings for clarity

  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editBailingDetails, setEditBailingDetails] = useState(null); // To store the bailing details for editing

  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const handleOpenEditModal = (bailing) => {
    const now = new Date();
    const bailingDate = new Date(bailing.created_at);
    const timeDiff = now - bailingDate;

    if (timeDiff > 24 * 60 * 60 * 1000) {
      // Check if the bailing was created more than 24 hours ago
      Swal.fire(
        "Error!",
        "You have exceeded the time limit to edit the bailing.",
        "error"
      );
      return;
    }

    setEditBailingDetails(bailing);
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
        `http://localhost:3001/api/bailer/bailing/details/${userId}`
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

  const deleteUser = async (id, createdAt) => {
    const now = new Date();
    const bailingDate = new Date(createdAt);
    const timeDiff = now - bailingDate;

    if (timeDiff > 6 * 60 * 60 * 1000) {
      // Check if the bailing was created more than 24 hours ago
      Swal.fire(
        "Error!",
        "You have exceeded the time limit to delete the bailing.",
        "error"
      );
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
        const response = await fetch(
          `http://localhost:3001/api/bailer/delete/${id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete bailing");
        }

        const newBailingDetails = bailingDetails.filter(
          (bailing) => bailing.id !== id
        );
        setBailingDetails(newBailingDetails);

        Swal.fire("Deleted!", "Your bailing has been deleted.", "success");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting bailing:", error);
      Swal.fire("Error!", "Failed to delete the bailing.", "error");
    }
  };

  const filterData = (v) => {
    if (v) {
      setBailingDetails([v]);
    } else {
      setBailingDetails(userId);
    }
  };

  const isEditable = (createdAt) => {
    const bailingDate = new Date(createdAt);
    const now = new Date();
    const timeDiff = now - bailingDate;
    return timeDiff <= 6 * 60 * 60 * 1000; // 24 hours in milliseconds
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
            <AddBailing closeEvent={handleCloseAddModal} bailer={userId} />
          </Box>
        </Modal>
        <Modal
          open={openEditModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {editBailingDetails && (
              <EditBailing
                closeEvent={handleCloseEditModal}
                bailingDetails={editBailingDetails} // Pass the bailing details to the edit modal
              />
            )}
          </Box>
        </Modal>
      </div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Typography variant="h5" align="left" sx={{ m: 2 }}>
          Bailing List
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
          <Button
            sx={{ m: 1 }}
            variant="outlined"
            startIcon={<AddCircleIcon />}
            onClick={handleOpenAddModal}
          >
            Add Bailing
          </Button>

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
                <TableCell>Actions</TableCell>
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
                    <TableCell>
                      <Stack direction="row" spacing={2}>
                        <EditIcon
                          style={{
                            fontSize: "20px",
                            color: "#02294F",
                            cursor: "pointer",
                          }}
                          className="cursor-pointer"
                          onClick={() => handleOpenEditModal(bailing)}
                          disabled={!isEditable(bailing.date)}
                        />
                        <DeleteIcon
                          style={{
                            fontSize: "20px",
                            color: "#02294F",
                            cursor: "pointer",
                          }}
                          className="cursor-pointer"
                          onClick={() =>
                            deleteUser(bailing.bailing_id, bailing.date)
                          }
                          disabled={!isEditable(bailing.date)}
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
