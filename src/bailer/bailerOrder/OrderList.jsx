import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Divider, Typography } from '@mui/material';
import Stack from "@mui/material/Stack";
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Modal from '@mui/material/Modal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import AddProducts from './AddOrder';
import EditProducts from './EditOrder'; 

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function OrderList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editProductId, setEditProductId] = useState(null); 

  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const handleOpenEditModal = (productId) => {
    setEditProductId(productId);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => setOpenEditModal(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setRows(data);
    } catch (error) {
      console.error('Error fetching products:', error);
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
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });

      if (confirmed.isConfirmed) {
        const response = await fetch(`http://localhost:3001/api/products/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error('Failed to delete product');
        }

        const newRows = rows.filter((row) => row.id !== id);
        setRows(newRows);

        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        ).then(() => {
          // Optionally, you can perform additional actions after the user clicks "OK"
        });
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      Swal.fire(
        'Error!',
        'Failed to delete the product.',
        'error'
      );
    }
  };

  const filterData = (v) => {
    if (v) {
      setRows([v]);
    } else {
      setRows([]);
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
          <AddProducts closeEvent={handleCloseAddModal} />
        </Box>
      </Modal>
      <Modal
        open={openEditModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EditProducts closeEvent={handleCloseEditModal} productId={editProductId} />
        </Box>
      </Modal>
    </div>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Typography gutterBottom variant="h5" component="div" sx={{padding: "20px"}}>
          Products
        </Typography>
        <Divider />
        <Box height={10} />
        <Stack direction="row" spacing={2} className="my-2 mb-2">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={rows}
          sx={{ width: 300 }}
          onChange={(e,v) => {filterData(v)}}
          getOptionLabel={(rows) => rows.name || ''}
          renderInput={(params) => <TextField {...params} label="Search by name" />}
        />
        <Typography variant="h6" component="div" sx={{flexGrow: 1}}></Typography>
        <Button variant="contained" color="success" endIcon ={<AddCircleIcon />} onClick={handleOpenAddModal} >Add Product</Button>
      </Stack>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
                <TableCell align= "left" style={{ minWidth: "100px" }}>Name</TableCell>
                <TableCell align= "left" style={{ minWidth: "100px" }}>Price</TableCell>
                <TableCell align= "left" style={{ minWidth: "100px" }}>Quantity</TableCell>
                <TableCell align= "left" style={{ minWidth: "100px" }}>Date</TableCell>
                <TableCell align= "left" style={{ minWidth: "100px" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        <TableCell key={row.id} align={"left"}>
                          {row.name}
                        </TableCell>
                        <TableCell key={row.id} align={"left"}>
                          {row.price}
                        </TableCell>
                        <TableCell key={row.id} align={"left"}>
                          {row.quantity}
                        </TableCell>
                        <TableCell key={row.id} align={"left"}>
                          {row.date}
                        </TableCell>
                        <TableCell align={"left"}>
                          <Stack spacing={2}>
                            <EditIcon 
                              style={{
                                fontSize: "20px",
                                color: "#02294F",
                                cursor: "pointer"
                              }}
                              className="cursor-pointer"
                              onClick={() => handleOpenEditModal(row.id)} // Pass the product ID to the edit modal
                            />
                            <DeleteIcon 
                              style={{
                                fontSize: "20px",
                                color: "#02294F",
                                cursor: "pointer"
                              }}
                              className="cursor-pointer"
                              onClick={() => deleteUser(row.id)}
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
