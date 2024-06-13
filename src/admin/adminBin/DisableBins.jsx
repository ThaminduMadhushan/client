
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Divider,
  Typography,
  Stack,
  Box,
  Autocomplete,
  TextField,
  Button,
  Modal,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import AddBins from "./AddBins";
import EditBins from "./EditBin";
import AddIcon from '@mui/icons-material/Add';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

const CustomButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`,
  border: 0,
  borderRadius: 3,
  boxShadow: "0 3px 5px 2px rgba(105, 135, 255, .3)",
  color: "white",
  height: 48,
  padding: "0 30px",
  "&:hover": {
    background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)`,
  },
}));

export default function BinList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editBinId, setEditBinId] = useState(null);

  const [userId, setUserId] = useState();
  const [user, setUser] = useState();

  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const [editBinDetails, setEditBinDetails] = useState(null);

  const handleOpenEditModal = (bin) => {
    setEditBinId(bin.bin_id);
    setEditBinDetails(bin); // Set the bin details in the state
    setOpenEditModal(true);
  };

  const navigate = useNavigate();

  const handleCloseEditModal = () => setOpenEditModal(false);

  useEffect(() => {
    fetchBins();
  }, []);

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
      const response = await fetch(`http://localhost:3001/api/admin/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch admin id");
      }
      const data = await response.json();
      setUserId(data.admin_id);
      fetchBins(); // Fetch bins once admin id is set
    } catch (error) {
      console.error("Error fetching admin id:", error);
    }
  };

  const fetchBins = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/bin/disable");
      if (!response.ok) {
        throw new Error("Failed to fetch bins");
      }
      const data = await response.json();
      setRows(data);
    } catch (error) {
      console.error("Error fetching bins:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const disableBin = async (id) => {
    try {
      const confirmed = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, disable it!",
      });

      if (confirmed.isConfirmed) {
        const response = await fetch(`http://localhost:3001/api/bin/enable/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "enable" }),
        });

        if (!response.ok) {
          throw new Error("Failed to disable bin");
        }

        const updatedRows = rows.map((row) => {
          if (row.bin_id === id) {
            return { ...row, status: "disable" };
          }
          return row;
        });

        setRows(updatedRows);

        Swal.fire("Disabled!", "The bin has been disabled.", "success");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error disabling bin:", error);
      Swal.fire("Error!", "Failed to disable the bin.", "error");
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
          open={openAddModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AddBins closeEvent={handleCloseAddModal} AdminId={userId} />
          </Box>
        </Modal>
        <Modal
          open={openEditModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <EditBins
              closeEvent={handleCloseEditModal}
              binId={editBinId}
              binDetails={editBinDetails} // Pass the bin details here
              AdminId={userId}
            />
          </Box>
        </Modal>
      </div>
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
          getOptionLabel={(rows) => rows.bin_name || ""}
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
                Type
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Address
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Total Quantity
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Admin
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
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    <TableCell key={row.id} align={"left"}>
                      {row.bin_name}
                    </TableCell>
                    <TableCell key={row.id} align={"left"}>
                      {row.type_name}
                    </TableCell>
                    <TableCell key={row.id} align={"left"}>
                      {row.address}
                    </TableCell>
                    <TableCell key={row.id} align={"center"}>
                      {row.total_quantity}
                    </TableCell>
                    <TableCell key={row.id} align={"left"}>
                      {row.admin_name}
                    </TableCell>
                    <TableCell key={row.id} align={"left"}>
                      {row.created_at}
                    </TableCell>
                    <TableCell key={row.id} align={"left"}>
                      {row.updated_at}
                    </TableCell>
                    <TableCell align={"left"}>
                      <Stack spacing={2} direction="row">
                        {/* <IconButton
                          color="primary"
                          onClick={() => handleOpenEditModal(row)}
                        >
                          <EditIcon />
                        </IconButton> */}
                        <IconButton
                          color="secondary"
                          onClick={() => disableBin(row.bin_id)}
                        >
                          <AddIcon />
                        </IconButton>
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
    </>
  );
}
