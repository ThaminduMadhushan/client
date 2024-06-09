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
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Modal from "@mui/material/Modal";
import Swal from "sweetalert2";
import DoneIcon from '@mui/icons-material/Done';
import GenerateSalaries from "./GenerateSalaries";
import EditSalary from "./EditSalary";
import SalaryForOneEmployee from "./SalaryForOneEmployee";
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

export default function SalaryList() {
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

  const handleOpenEditModal = (salaryId) => {
    setEditOrderId(salaryId);
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
    } catch (error) {
      console.error("Error fetching admin id:", error);
    }
  };

  const fetchSalaries = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/salary/get/unpaid`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch salaries");
      }
      const data = await response.json();
      setRows(data);
    } catch (error) {
      console.error("Error fetching salaries:", error);
    }
  };

  const salaryPaid = async (id) => {
    try {
      const confirmed = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, pay it!",
      });
  
      if (confirmed.isConfirmed) {
        const response = await fetch(`http://localhost:3001/api/salary/pay/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            adminId: userId,
            status: "paid"
          }), 
        });
  
        const responseData = await response.json(); // Parse the response JSON
  
        if (!response.ok) {
          throw new Error(responseData.error || "Failed to pay salary");
        }
  
        const newRows = rows.map((row) => 
          row.salary_id === id ? { ...row, status: "paid" } : row
        );
        setRows(newRows);
  
        Swal.fire("Paid!", "The salary has been paid.", "success");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error paying salary:", error);
      Swal.fire("Error!", error.message || "Failed to pay salary.", "error");
    }
  };
  
  useEffect(() => {
    fetchSalaries();
  }, []);

  const filterData = (v) => {
    if (v) {
      setRows([v]);
    } else {
      setRows([]);
      fetchSalaries();
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
            <GenerateSalaries closeEvent={handleCloseAddModal} fetchSalaries={fetchSalaries} />
          </Box>
        </Modal>
        <Modal
          open={openAddModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <SalaryForOneEmployee closeEvent={handleCloseAddModal} fetchSalaries={fetchSalaries} />
          </Box>
        </Modal>
        <Modal
          open={openEditModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <EditSalary
              closeEvent={handleCloseEditModal}
              orderId={editOrderId}
              adminId={userId} 
            />
          </Box>
        </Modal>
      </div>
      <Paper sx={{ width: "100%", overflow: "hidden", mt: 2 }}>
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
            getOptionLabel={(rows) => rows.employee_id || ""}
            renderInput={(params) => (
              <TextField {...params} label="Search by name" />
            )}
          />
          <CustomButton
            variant="contained"
            color="success"
            endIcon={<AddCircleIcon />}
            onClick={handleOpenAddModal}
            size="large"
          >
            Generate Salary
          </CustomButton>
          <CustomButton
            variant="contained"
            color="success"
            endIcon={<AddCircleIcon />}
            onClick={handleOpenAddModal}
            size="large"
          >
            Generate All Salary
          </CustomButton>
        </div>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Employee Name
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Admin Name
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Full Payment (Rs)
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Total Quantity (kg)
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Target Bonus (Rs)
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Payment Month
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.salary_id}>
                    <TableCell align="left">{row.driver_name || row.bailer_name}</TableCell>
                    <TableCell align="left">{row.admin_name}</TableCell>
                    <TableCell align="left">{row.full_payment}</TableCell>
                    <TableCell align="left">{row.total_quantity}</TableCell>
                    <TableCell align="left">{row.target_bonus}</TableCell>
                    <TableCell align="left">{row.month}</TableCell>
                    <TableCell align="left">
                      <DoneIcon
                        color="primary"
                        style={{
                          fontSize: "20px",
                          color: "#02294F",
                          cursor: "pointer",
                        }}
                        onClick={() => salaryPaid(row.salary_id)}
                      />
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
