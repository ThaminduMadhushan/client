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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import EditDriverCollection from "./EditDriverCollection";

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

export default function DriverCollectionList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editCollectionId, setEditCollectionId] = useState(null);
  const [editCollection, setEditCollection] = useState(null); // State variable to store collection details for editing
  const [materials, setMaterials] = useState([]); // State variable to store materials

  useEffect(() => {
    fetchDriverCollection();
    fetchMaterials(); // Fetch materials on component mount
  }, []);

  const fetchDriverCollection = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/collection/driver");
      if (!response.ok) {
        throw new Error("Failed to fetch collections");
      }
      const data = await response.json();
      setRows(data);
    } catch (error) {
      console.error("Error fetching collections:", error);
    }
  };

  const fetchMaterials = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/materials");
      if (!response.ok) {
        throw new Error("Failed to fetch materials");
      }
      const data = await response.json();
      setMaterials(data);
    } catch (error) {
      console.error("Error fetching materials:", error);
    }
  };

  const handleOpenEditModal = (collectionId, collection) => {
    setEditCollectionId(collectionId);
    setEditCollection(collection);
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
          `http://localhost:3001/api/collection/driver/${id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete collection");
        }

        const newRows = rows.filter((row) => row.id !== id);
        setRows(newRows);

        Swal.fire("Deleted!", "Driver collection has been deleted.", "success").then(
          () => {
            window.location.reload();
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
      setRows([]);
      window.location.reload();
    }
  };

  return (
    <>
      <div>
        <Modal
          open={openEditModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {editCollection && (
              <EditDriverCollection
                closeEvent={handleCloseEditModal}
                collectionId={editCollectionId}
                collectionDetails={editCollection} // Pass collection details to EditDriverCollection
                materials={materials} // Pass materials to EditDriverCollection
              />
            )}
          </Box>
        </Modal>
      </div>
      
      <Typography
        gutterBottom
        variant="h5"
        component="div"
        sx={{ padding: "20px" }}
      >
        Accept Driver Collection
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
          getOptionLabel={(rows) => rows.collection_name || ""}
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
                Driver Name
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Collection Name
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Bin Name
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Quantity (Kg)
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Material Name
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
                    {row.driver_name}
                  </TableCell>
                  <TableCell key={row.id} align={"left"}>
                    {row.collection_name}
                  </TableCell>
                  <TableCell key={row.id} align={"left"}>
                    {row.bin_name}
                  </TableCell>
                  <TableCell key={row.id} align={"left"}>
                    {row.quantity}
                  </TableCell>
                  <TableCell key={row.id} align={"left"}>
                    {row.material_name}
                  </TableCell>
                  <TableCell key={row.id} align={"left"}>
                    {row.created_at}
                  </TableCell>
                  <TableCell key={row.id} align={"left"}>
                    {row.updated_at}
                  </TableCell>
                  <TableCell align={"center"}>
                    <Stack spacing={2} direction="row">
                      <DeleteIcon
                        style={{
                          fontSize: "20px",
                          color: "#02294F",
                          cursor: "pointer",
                        }}
                        className="cursor-pointer"
                        onClick={() => deleteUser(row.collection_id)}
                      />
                      <EditIcon
                        style={{
                          fontSize: "20px",
                          color: "#02294F",
                          cursor: "pointer",
                        }}
                        className="cursor-pointer"
                        onClick={() => handleOpenEditModal(row.collection_id, row)} // Pass the collection details to the edit modal
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
    </>
  );
}
