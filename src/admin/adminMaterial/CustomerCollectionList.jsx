import React, { useState, useEffect } from "react";
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
import AddCustomerCollection from "./AddCustomerCollection";

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

export default function CustomerCollectionList() {
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

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/collection/supplier");
      if (!response.ok) {
        throw new Error("Failed to fetch collections");
      }
      const data = await response.json();
      setRows(data);
    } catch (error) {
      console.error("Error fetching collections:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
        const response = await fetch(
          `http://localhost:3001/api/collection/supplier/${id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete collection");
        }

        const newRows = rows.filter((row) => row.collection_id !== id);
        setRows(newRows);

        Swal.fire("Deleted!", "Your file has been deleted.", "success").then(
          () => {
            fetchCollections(); // Refresh the data after deletion
          }
        );
      }
    } catch (error) {
      console.error("Error deleting collection:", error);
      Swal.fire("Error!", "Failed to delete the collection.", "error");
    }
  };

  const filterData = (v) => {
    if (v) {
      setRows([v]);
    } else {
      fetchCollections(); // Reload all data if filter is cleared
    }
  };

  return (
    <>
      <div>
        <Modal
          open={openAddModal}
          onClose={handleCloseAddModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AddCustomerCollection closeEvent={handleCloseAddModal} />
          </Box>
        </Modal>
      </div>
      
      <Typography
        gutterBottom
        variant="h5"
        component="div"
        sx={{ padding: "20px" }}
      >
        Add New Customer Collection
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
          getOptionLabel={(rows) => rows.collection_id.toString() || ""}
          renderInput={(params) => (
            <TextField {...params} label="Search by collection ID" />
          )}
        />
        <Button
          variant="contained"
          color="success"
          endIcon={<AddCircleIcon />}
          onClick={handleOpenAddModal}
          size="large"
        >
          Add Collection
        </Button>
      </div>

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Supplier Name
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Quantity
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Material Name
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Created Date
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Updated Date
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
                  key={row.collection_id}
                >
                  <TableCell align="left">{row.supplier_name}</TableCell>
                  <TableCell align="left">{row.quantity}</TableCell>
                  <TableCell align="left">{row.material_name}</TableCell>
                  <TableCell align="left">{row.created_at}</TableCell>
                  <TableCell align="left">{row.updated_at}</TableCell>
                  <TableCell align="left">
                    <Stack spacing={2} direction="row">
                      <DeleteIcon
                        style={{
                          fontSize: "20px",
                          color: "#02294F",
                          cursor: "pointer",
                        }}
                        onClick={() => deleteUser(row.collection_id)}
                      />
                      <EditIcon
                        style={{
                          fontSize: "20px",
                          color: "#02294F",
                          cursor: "pointer",
                        }}
                        onClick={() => handleOpenEditModal(row.collection_id)}
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
    </>
  );
}
