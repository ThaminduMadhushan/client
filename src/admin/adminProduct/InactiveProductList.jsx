// import React, { useState, useEffect } from "react";
// import {
//   Paper, Table, TableBody, TableCell, TableContainer, TableHead,
//   TablePagination, TableRow, Divider, Typography, Stack, Box,
//   Autocomplete, TextField, Button, Modal, IconButton
// } from "@mui/material";
// import { styled } from '@mui/system';
// import AddCircleIcon from "@mui/icons-material/AddCircle";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import Swal from "sweetalert2";
// import AddProducts from "./AddProduct";
// import EditProducts from "./EditProduct";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "none",
//   boxShadow: 24,
//   p: 4,
//   borderRadius: '8px',
// };

// const CustomButton = styled(Button)(({ theme }) => ({
//   background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`,
//   border: 0,
//   borderRadius: 3,
//   boxShadow: '0 3px 5px 2px rgba(105, 135, 255, .3)',
//   color: 'white',
//   height: 48,
//   padding: '0 30px',
//   '&:hover': {
//     background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)`,
//   },
// }));

// export default function ProductList() {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [rows, setRows] = useState([]);
//   const [openAddModal, setOpenAddModal] = useState(false);
//   const [openEditModal, setOpenEditModal] = useState(false);
//   const [editProductId, setEditProductId] = useState(null);
//   const [selectedProductData, setSelectedProductData] = useState(null);

//   const handleOpenAddModal = () => setOpenAddModal(true);
//   const handleCloseAddModal = () => setOpenAddModal(false);

//   const handleOpenEditModal = (productData) => {
//     setOpenEditModal(true);
//     setProductData(productData);
//   };

//   const handleCloseEditModal = () => setOpenEditModal(false);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const response = await fetch("http://localhost:3001/api/products");
//       if (!response.ok) {
//         throw new Error("Failed to fetch products");
//       }
//       const data = await response.json();
//       setRows(data);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   const deleteUser = async (id) => {
//     try {
//       const confirmed = await Swal.fire({
//         title: "Are you sure?",
//         text: "You won't be able to revert this!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Yes, delete it!",
//       });

//       if (confirmed.isConfirmed) {
//         const response = await fetch(
//           `http://localhost:3001/api/products/${id}`,
//           {
//             method: "DELETE",
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to delete product");
//         }

//         const newRows = rows.filter((row) => row.id !== id);
//         setRows(newRows);

//         Swal.fire("Deleted!", "Your product has been deleted.", "success").then(
//           () => {
//             window.location.reload();
//           }
//         );
//       }
//     } catch (error) {
//       console.error("Error deleting product:", error);
//       Swal.fire("Error!", "Failed to delete the product.", "error");
//     }
//   };

//   const filterData = (v) => {
//     if (v) {
//       setRows([v]);
//     } else {
//       setRows([]);
//       window.location.reload();
//     }
//   };

//   return (
//     <>
//       <div>
//         <Modal
//           open={openAddModal}
//           aria-labelledby="modal-modal-title"
//           aria-describedby="modal-modal-description"
//         >
//           <Box sx={style}>
//             <AddProducts closeEvent={handleCloseAddModal} />
//           </Box>
//         </Modal>
//         <Modal
//           open={openEditModal}
//           aria-labelledby="modal-modal-title"
//           aria-describedby="modal-modal-description"
//         >
//           <Box sx={style}>
//             <EditProducts
//               closeEvent={handleCloseEditModal}
//               productId={editProductId}
//             />
//           </Box>
//         </Modal>
//       </div>
//       <Paper sx={{ width: "100%", overflow: "hidden" }}>
//         <Typography
//           gutterBottom
//           variant="h5"
//           component="div"
//           sx={{ padding: "20px" }}
//         >
//           Products
//         </Typography>
//         <Divider />
//         <Box height={10} />

//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginBottom: "20px",
//             marginRight: "20px",
//           }}
//         >
//           <Autocomplete
//             disablePortal
//             id="combo-box-demo"
//             options={rows}
//             sx={{ width: 300, paddingLeft: "20px" }}
//             onChange={(e, v) => {
//               filterData(v);
//             }}
//             getOptionLabel={(rows) => rows.name || ""}
//             renderInput={(params) => (
//               <TextField {...params} label="Search by name" />
//             )}
//           />
//           <CustomButton
//             endIcon={<AddCircleIcon />}
//             onClick={handleOpenAddModal}
//             size="large"
//           >
//             Add Product
//           </CustomButton>
//         </div>

//         <TableContainer sx={{ maxHeight: 440 }}>
//           <Table stickyHeader aria-label="sticky table">
//             <TableHead>
//               <TableRow>
//                 <TableCell align="left" style={{ minWidth: "100px" }}>
//                   Name
//                 </TableCell>
//                 <TableCell align="left" style={{ minWidth: "100px" }}>
//                   Price
//                 </TableCell>
//                 <TableCell align="left" style={{ minWidth: "100px" }}>
//                   Quantity
//                 </TableCell>
//                 <TableCell align="left" style={{ minWidth: "100px" }}>
//                   Material Name
//                 </TableCell>
//                 <TableCell align="left" style={{ minWidth: "100px" }}>
//                   Material Quantity (kg)
//                 </TableCell>
//                 <TableCell align="left" style={{ minWidth: "100px" }}>
//                   Action
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {rows
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((row) => {
//                   return (
//                     <TableRow
//                       hover
//                       role="checkbox"
//                       tabIndex={-1}
//                       key={row.code}
//                     >
//                       <TableCell key={row.id} align={"left"}>
//                         {row.product_name}
//                       </TableCell>
//                       <TableCell key={row.id} align={"left"}>
//                         {row.unit_price}
//                       </TableCell>
//                       <TableCell key={row.id} align={"left"}>
//                         {row.total_quantity}
//                       </TableCell>
//                       <TableCell key={row.id} align={"left"}>
//                         {row.material_name}
//                       </TableCell>
//                       <TableCell key={row.id} align={"left"}>
//                         {row.material_quantity}
//                       </TableCell>
//                       <TableCell align={"left"}>
//                         <Stack spacing={2} direction="row">
//                           <IconButton
//                             color="primary"
//                             onClick={() => handleOpenEditModal(row.product_id)}
//                           >
//                             <EditIcon />
//                           </IconButton>
//                           <IconButton
//                             color="secondary"
//                             onClick={() => deleteUser(row.product_id)}
//                           >
//                             <DeleteIcon />
//                           </IconButton>
//                         </Stack>
//                       </TableCell>
//                     </TableRow>
//                   );
//                 })}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[10, 25, 100]}
//           component="div"
//           count={rows.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Paper>
//     </>
//   );
// }


// import React, { useState, useEffect } from "react";
// import {
//   Paper, Table, TableBody, TableCell, TableContainer, TableHead,
//   TablePagination, TableRow, Divider, Typography, Stack, Box,
//   Autocomplete, TextField, Button, Modal, IconButton
// } from "@mui/material";
// import { styled } from '@mui/system';
// import AddCircleIcon from "@mui/icons-material/AddCircle";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import Swal from "sweetalert2";
// import AddProducts from "./AddProduct";
// import EditProducts from "./EditProduct";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "none",
//   boxShadow: 24,
//   p: 4,
//   borderRadius: '8px',
// };

// const CustomButton = styled(Button)(({ theme }) => ({
//   background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`,
//   border: 0,
//   borderRadius: 3,
//   boxShadow: '0 3px 5px 2px rgba(105, 135, 255, .3)',
//   color: 'white',
//   height: 48,
//   padding: '0 30px',
//   '&:hover': {
//     background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)`,
//   },
// }));

// export default function ProductList() {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [rows, setRows] = useState([]);
//   const [openAddModal, setOpenAddModal] = useState(false);
//   const [openEditModal, setOpenEditModal] = useState(false);
//   const [selectedProductData, setSelectedProductData] = useState(null);

//   const handleOpenAddModal = () => setOpenAddModal(true);
//   const handleCloseAddModal = () => setOpenAddModal(false);

//   const handleOpenEditModal = (productData) => {
//     setSelectedProductData(productData);
//     setOpenEditModal(true);
//   };

//   const handleCloseEditModal = () => setOpenEditModal(false);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const response = await fetch("http://localhost:3001/api/products");
//       if (!response.ok) {
//         throw new Error("Failed to fetch products");
//       }
//       const data = await response.json();
//       setRows(data);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   const deleteUser = async (id) => {
//     try {
//       const confirmed = await Swal.fire({
//         title: "Are you sure?",
//         text: "You won't be able to revert this!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Yes, delete it!",
//       });

//       if (confirmed.isConfirmed) {
//         const response = await fetch(
//           `http://localhost:3001/api/products/${id}`,
//           {
//             method: "DELETE",
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to delete product");
//         }

//         const newRows = rows.filter((row) => row.id !== id);
//         setRows(newRows);

//         Swal.fire("Deleted!", "Your product has been deleted.", "success").then(
//           () => {
//             window.location.reload();
//           }
//         );
//       }
//     } catch (error) {
//       console.error("Error deleting product:", error);
//       Swal.fire("Error!", "Failed to delete the product.", "error");
//     }
//   };

//   const filterData = (v) => {
//     if (v) {
//       setRows([v]);
//     } else {
//       setRows([]);
//       window.location.reload();
//     }
//   };

//   return (
//     <>
//       <div>
//         <Modal
//           open={openAddModal}
//           aria-labelledby="modal-modal-title"
//           aria-describedby="modal-modal-description"
//         >
//           <Box sx={style}>
//             <AddProducts closeEvent={handleCloseAddModal} />
//           </Box>
//         </Modal>
//         <Modal
//           open={openEditModal}
//           aria-labelledby="modal-modal-title"
//           aria-describedby="modal-modal-description"
//         >
//           <Box sx={style}>
//             <EditProducts
//               closeEvent={handleCloseEditModal}
//               productData={selectedProductData}
//             />
//           </Box>
//         </Modal>
//       </div>
//       <Paper sx={{ width: "100%", overflow: "hidden" }}>
//         <Typography
//           gutterBottom
//           variant="h5"
//           component="div"
//           sx={{ padding: "20px" }}
//         >
//           Products
//         </Typography>
//         <Divider />
//         <Box height={10} />

//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginBottom: "20px",
//             marginRight: "20px",
//           }}
//         >
//           <Autocomplete
//             disablePortal
//             id="combo-box-demo"
//             options={rows}
//             sx={{ width: 300, paddingLeft: "20px" }}
//             onChange={(e, v) => {
//               filterData(v);
//             }}
//             getOptionLabel={(rows) => rows.product_name || ""}
//             renderInput={(params) => (
//               <TextField {...params} label="Search by name" />
//             )}
//           />
//           <CustomButton
//             endIcon={<AddCircleIcon />}
//             onClick={handleOpenAddModal}
//             size="large"
//           >
//             Add Product
//           </CustomButton>
//         </div>

//         <TableContainer sx={{ maxHeight: 440 }}>
//           <Table stickyHeader aria-label="sticky table">
//             <TableHead>
//               <TableRow>
//                 <TableCell align="left" style={{ minWidth: "100px" }}>
//                   Name
//                 </TableCell>
//                 <TableCell align="left" style={{ minWidth: "100px" }}>
//                   Price
//                 </TableCell>
//                 <TableCell align="left" style={{ minWidth: "100px" }}>
//                   Quantity
//                 </TableCell>
//                 <TableCell align="left" style={{ minWidth: "100px" }}>
//                   Material Name
//                 </TableCell>
//                 <TableCell align="left" style={{ minWidth: "100px" }}>
//                   Material Quantity (kg)
//                 </TableCell>
//                 <TableCell align="left" style={{ minWidth: "100px" }}>
//                   Action
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {rows
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((row) => {
//                   return (
//                     <TableRow
//                       hover
//                       role="checkbox"
//                       tabIndex={-1}
//                       key={row.code}
//                     >
//                       <TableCell key={row.id} align={"left"}>
//                         {row.product_name}
//                       </TableCell>
//                       <TableCell key={row.id} align={"left"}>
//                         {row.unit_price}
//                       </TableCell>
//                       <TableCell key={row.id} align={"left"}>
//                         {row.total_quantity}
//                       </TableCell>
//                       <TableCell key={row.id} align={"left"}>
//                         {row.material_name}
//                       </TableCell>
//                       <TableCell key={row.id} align={"left"}>
//                         {row.material_quantity}
//                       </TableCell>
//                       <TableCell align={"left"}>
//                         <Stack spacing={2} direction="row">
//                           <IconButton
//                             color="primary"
//                             onClick={() => handleOpenEditModal(row)}
//                           >
//                             <EditIcon />
//                           </IconButton>
//                           <IconButton
//                             color="secondary"
//                             onClick={() => deleteUser(row.id)}
//                           >
//                             <DeleteIcon />
//                           </IconButton>
//                         </Stack>
//                       </TableCell>
//                     </TableRow>
//                   );
//                 })}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[10, 25, 100]}
//           component="div"
//           count={rows.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Paper>
//     </>
//   );
// }


import React, { useState, useEffect } from "react";
import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead,
  TablePagination, TableRow, Divider, Typography, Stack, Box,
  Autocomplete, TextField, Button, Modal, IconButton
} from "@mui/material";
import { styled } from '@mui/system';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from '@mui/icons-material/Add';
import Swal from "sweetalert2";
import AddProducts from "./AddProduct";
import EditProducts from "./EditProduct";

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

export default function ProductList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedProductData, setSelectedProductData] = useState(null);

  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const handleOpenEditModal = (productData) => {
    setSelectedProductData(productData);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => setOpenEditModal(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/products/disabled");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setRows(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const disableProduct = async (id) => {
    try {
      const confirmed = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, enable it!",
      });

      if (confirmed.isConfirmed) {
        const response = await fetch(
          `http://localhost:3001/api/products/changeStatusDisable/${id}`,
          {
            method: "PUT",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to enable product");
        }

        const updatedProduct = await response.json();
        setRows(rows.map(row => row.id === id ? updatedProduct : row));

        Swal.fire("Enabled!", "Your product has been enabled.", "success");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error enabling product:", error);
      Swal.fire("Error!", "Failed to enable the product.", "error");
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
            <AddProducts closeEvent={handleCloseAddModal} />
          </Box>
        </Modal>
        <Modal
          open={openEditModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <EditProducts
              closeEvent={handleCloseEditModal}
              productData={selectedProductData}
            />
          </Box>
        </Modal>
      </div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ padding: "20px" }}
        >
          Products
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
            getOptionLabel={(rows) => rows.product_name || ""}
            renderInput={(params) => (
              <TextField {...params} label="Search by name" />
            )}
          />
          <CustomButton
            endIcon={<AddCircleIcon />}
            onClick={handleOpenAddModal}
            size="large"
          >
            Add Product
          </CustomButton>
        </div>

        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Name
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Price
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Quantity
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Material Name
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Material Quantity (kg)
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
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                    >
                      <TableCell align={"left"}>
                        {row.product_name}
                      </TableCell>
                      <TableCell align={"left"}>
                        {row.unit_price}
                      </TableCell>
                      <TableCell align={"left"}>
                        {row.total_quantity}
                      </TableCell>
                      <TableCell align={"left"}>
                        {row.material_name}
                      </TableCell>
                      <TableCell align={"left"}>
                        {row.material_quantity}
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
                            onClick={() => disableProduct(row.product_id)}
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
      </Paper>
    </>
  );
}
