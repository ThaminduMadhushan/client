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
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Modal from "@mui/material/Modal";
import AddSalaryParameters from "./AddSalaryParameters";
import EditIcon from "@mui/icons-material/Edit";
import EditParameter from "./EditParameters";
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';

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
  borderRadius: '8px',
};

const CustomButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`,
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(105, 135, 255, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
  '&:hover': {
    background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)`,
  },
}));

export default function AdminSalaryParametersList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedParameter, setSelectedParameter] = useState(null);

  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);
  const handleOpenEditModal = (parameter) => {
    setSelectedParameter(parameter);
    setOpenEditModal(true);
  };
  const handleCloseEditModal = () => setOpenEditModal(false);

  useEffect(() => {
    fetchParameters();
  }, []);

  const fetchParameters = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/salary/parameters");
      if (!response.ok) {
        throw new Error("Failed to fetch parameters");
      }
      const data = await response.json();
      setRows(data);
    } catch (error) {
      console.error("Error fetching parameters:", error);
    }
  };

  useEffect(() => {
    if (selectedParameter !== null) {
      setOpenEditModal(true);
    }
  }, [selectedParameter]);

  const handleParameterUpdate = () => {
    setOpenEditModal(false);
    fetchParameters(); // Refetch parameters after edit
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
            <AddSalaryParameters closeEvent={handleCloseAddModal} />
          </Box>
        </Modal>
        <Modal
          open={openEditModal}
          onClose={handleCloseEditModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {selectedParameter && (
              <EditParameter
                closeEvent={handleCloseEditModal}
                parameter={selectedParameter}
                onUpdate={handleParameterUpdate}
              />
            )}
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
          <CustomButton
            variant="contained"
            color="success"
            endIcon={<AddCircleIcon />}
            onClick={handleOpenAddModal}
            size="large"
            sx={{ marginLeft: "20px" }}
          >
            Add Parameters
          </CustomButton>
        </div>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Role
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Basic Salary
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  EPF %
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Bonus
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Monthly Target
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Target Bonus per unit
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
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      <TableCell align="left">{row.role}</TableCell>
                      <TableCell align="left">{row.basic_salary}</TableCell>
                      <TableCell align="left">{row.epf}</TableCell>
                      <TableCell align="left">{row.bonus}</TableCell>
                      <TableCell align="left">{row.monthly_target}</TableCell>
                      <TableCell align="left">{row.target_bonus}</TableCell>
                      <TableCell align="left">
                        <Stack spacing={2} direction="row">
                          <EditIcon
                          color = "primary"
                            style={{
                              fontSize: "20px",
                              cursor: "pointer",
                            }}
                            className="cursor-pointer"
                            onClick={() => handleOpenEditModal(row)}
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
