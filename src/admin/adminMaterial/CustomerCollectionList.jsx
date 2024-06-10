// import React, { useState, useEffect } from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TablePagination from "@mui/material/TablePagination";
// import TableRow from "@mui/material/TableRow";
// import { Divider, Typography } from "@mui/material";
// import Stack from "@mui/material/Stack";
// import Box from "@mui/material/Box";
// import Autocomplete from "@mui/material/Autocomplete";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import AddCircleIcon from "@mui/icons-material/AddCircle";
// import Modal from "@mui/material/Modal";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import Swal from "sweetalert2";
// import AddCustomerCollection from "./AddCustomerCollection";
// import { styled } from "@mui/system";
// import FileDownloadIcon from "@mui/icons-material/FileDownload";

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
//   borderRadius: "8px",
// };

// const CustomButton = styled(Button)(({ theme }) => ({
//   background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`,
//   border: 0,
//   borderRadius: 3,
//   boxShadow: "0 3px 5px 2px rgba(105, 135, 255, .3)",
//   color: "white",
//   height: 48,
//   padding: "0 30px",
//   "&:hover": {
//     background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)`,
//   },
// }));

// export default function CustomerCollectionList() {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [rows, setRows] = useState([]);
//   const [openAddModal, setOpenAddModal] = useState(false);
//   const [openEditModal, setOpenEditModal] = useState(false);
//   const [editOrderId, setEditOrderId] = useState(null);

//   const handleOpenAddModal = () => setOpenAddModal(true);
//   const handleCloseAddModal = () => setOpenAddModal(false);

//   const handleOpenEditModal = (orderId) => {
//     setEditOrderId(orderId);
//     setOpenEditModal(true);
//   };

//   const handleCloseEditModal = () => setOpenEditModal(false);

//   useEffect(() => {
//     fetchCollections();
//   }, []);

//   const fetchCollections = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:3001/api/collection/supplier"
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch collections");
//       }
//       const data = await response.json();
//       setRows(data);
//     } catch (error) {
//       console.error("Error fetching collections:", error);
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
//           `http://localhost:3001/api/collection/supplier/${id}`,
//           {
//             method: "DELETE",
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to delete collection");
//         }

//         const newRows = rows.filter((row) => row.collection_id !== id);
//         setRows(newRows);

//         Swal.fire("Deleted!", "Your file has been deleted.", "success").then(
//           () => {
//             fetchCollections(); // Refresh the data after deletion
//           }
//         );
//       }
//     } catch (error) {
//       console.error("Error deleting collection:", error);
//       Swal.fire("Error!", "Failed to delete the collection.", "error");
//     }
//   };

//   const filterData = (v) => {
//     if (v) {
//       setRows([v]);
//     } else {
//       fetchCollections(); // Reload all data if filter is cleared
//     }
//   };

//   return (
//     <>
//       <div>
//         <Modal
//           open={openAddModal}
//           onClose={handleCloseAddModal}
//           aria-labelledby="modal-modal-title"
//           aria-describedby="modal-modal-description"
//         >
//           <Box sx={style}>
//             <AddCustomerCollection closeEvent={handleCloseAddModal} />
//           </Box>
//         </Modal>
//       </div>
//       <Divider />
//       <Box height={10} />

//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginBottom: "20px",
//           marginRight: "20px",
//         }}
//       >
//         <Autocomplete
//           disablePortal
//           id="combo-box-demo"
//           options={rows}
//           sx={{ width: 300, paddingLeft: "20px" }}
//           onChange={(e, v) => {
//             filterData(v);
//           }}
//           getOptionLabel={(rows) => rows.supplier_name.toString() || ""}
//           renderInput={(params) => (
//             <TextField {...params} label="Search by Supplier Name" />
//           )}
//         />
//         <CustomButton
//           variant="contained"
//           color="success"
//           endIcon={<AddCircleIcon />}
//           onClick={handleOpenAddModal}
//           size="large"
//         >
//           Add Collection
//         </CustomButton>
//       </div>

//       <TableContainer sx={{ maxHeight: 440 }}>
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead>
//             <TableRow>
//               <TableCell align="left" style={{ minWidth: "100px" }}>
//                 Supplier Name
//               </TableCell>
//               <TableCell align="left" style={{ minWidth: "100px" }}>
//               Material Name
//               </TableCell>
//               <TableCell align="left" style={{ minWidth: "100px" }}>
//                 Quantity (kg)
//               </TableCell>
//               <TableCell align="left" style={{ minWidth: "100px" }}>
//                 Price (Rs)
//               </TableCell>
//               <TableCell align="left" style={{ minWidth: "100px" }}>
//                 Created Date
//               </TableCell>
//               <TableCell align="left" style={{ minWidth: "100px" }}>
//                 Action
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((row) => (
//                 <TableRow
//                   hover
//                   role="checkbox"
//                   tabIndex={-1}
//                   key={row.collection_id}
//                 >
//                   <TableCell align="left">{row.supplier_name}</TableCell>
//                   <TableCell align="left">{row.material_name}</TableCell>
//                   <TableCell align="left">{row.quantity}</TableCell>
//                   <TableCell align="left">{row.price}</TableCell>
//                   <TableCell align="left">{row.created_at}</TableCell>
//                   <TableCell align="left">
//                     <Stack spacing={2} direction="row">
//                       <EditIcon
//                         color="primary"
//                         style={{
//                           fontSize: "20px",
//                           cursor: "pointer",
//                         }}
//                         onClick={() => handleOpenEditModal(row.collection_id)}
//                       />
//                       <DeleteIcon
//                         color="secondary"
//                         style={{
//                           fontSize: "20px",
//                           cursor: "pointer",
//                         }}
//                         onClick={() => deleteUser(row.collection_id)}
//                       />
//                       <FileDownloadIcon
//                         color="secondary"
//                         style={{
//                           fontSize: "20px",
//                           cursor: "pointer",
//                         }}
//                       />
//                     </Stack>
//                   </TableCell>
//                 </TableRow>
//               ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[10, 25, 100]}
//         component="div"
//         count={rows.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </>
//   );
// }


// import React, { useState, useEffect } from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TablePagination from "@mui/material/TablePagination";
// import TableRow from "@mui/material/TableRow";
// import { Divider, Typography } from "@mui/material";
// import Stack from "@mui/material/Stack";
// import Box from "@mui/material/Box";
// import Autocomplete from "@mui/material/Autocomplete";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import AddCircleIcon from "@mui/icons-material/AddCircle";
// import Modal from "@mui/material/Modal";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import Swal from "sweetalert2";
// import AddCustomerCollection from "./AddCustomerCollection";
// import { styled } from "@mui/system";
// import FileDownloadIcon from "@mui/icons-material/FileDownload";
// import jsPDF from "jspdf"; // Import jsPDF

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
//   borderRadius: "8px",
// };

// const CustomButton = styled(Button)(({ theme }) => ({
//   background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`,
//   border: 0,
//   borderRadius: 3,
//   boxShadow: "0 3px 5px 2px rgba(105, 135, 255, .3)",
//   color: "white",
//   height: 48,
//   padding: "0 30px",
//   "&:hover": {
//     background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)`,
//   },
// }));

// export default function CustomerCollectionList() {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [rows, setRows] = useState([]);
//   const [openAddModal, setOpenAddModal] = useState(false);
//   const [openEditModal, setOpenEditModal] = useState(false);
//   const [editOrderId, setEditOrderId] = useState(null);

//   const handleOpenAddModal = () => setOpenAddModal(true);
//   const handleCloseAddModal = () => setOpenAddModal(false);

//   const handleOpenEditModal = (orderId) => {
//     setEditOrderId(orderId);
//     setOpenEditModal(true);
//   };

//   const handleCloseEditModal = () => setOpenEditModal(false);

//   useEffect(() => {
//     fetchCollections();
//   }, []);

//   const fetchCollections = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:3001/api/collection/supplier"
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch collections");
//       }
//       const data = await response.json();
//       setRows(data);
//     } catch (error) {
//       console.error("Error fetching collections:", error);
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
//           `http://localhost:3001/api/collection/supplier/${id}`,
//           {
//             method: "DELETE",
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to delete collection");
//         }

//         const newRows = rows.filter((row) => row.collection_id !== id);
//         setRows(newRows);

//         Swal.fire("Deleted!", "Your file has been deleted.", "success").then(
//           () => {
//             fetchCollections(); // Refresh the data after deletion
//           }
//         );
//       }
//     } catch (error) {
//       console.error("Error deleting collection:", error);
//       Swal.fire("Error!", "Failed to delete the collection.", "error");
//     }
//   };

//   const filterData = (v) => {
//     if (v) {
//       setRows([v]);
//     } else {
//       fetchCollections(); // Reload all data if filter is cleared
//     }
//   };

//   const downloadCollectionFile = (row) => {
//     const doc = new jsPDF();
//     doc.text("Company Name", 10, 10);
//     doc.text(`Supplier Name: ${row.supplier_name}`, 10, 80);
//     doc.text(`Material Name: ${row.material_name}`, 10, 90);
//     doc.text(`Quantity: ${row.quantity} kg`, 10, 100);
//     doc.text(`Price: Rs ${row.price}`, 10, 110);
//     doc.text(`Created Date: ${row.created_at}`, 10, 120);
//     doc.save(`collection_${row.collection_id}.pdf`);
//   };

//   return (
//     <>
//       <div>
//         <Modal
//           open={openAddModal}
//           onClose={handleCloseAddModal}
//           aria-labelledby="modal-modal-title"
//           aria-describedby="modal-modal-description"
//         >
//           <Box sx={style}>
//             <AddCustomerCollection closeEvent={handleCloseAddModal} />
//           </Box>
//         </Modal>
//       </div>
//       <Divider />
//       <Box height={10} />

//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginBottom: "20px",
//           marginRight: "20px",
//         }}
//       >
//         <Autocomplete
//           disablePortal
//           id="combo-box-demo"
//           options={rows}
//           sx={{ width: 300, paddingLeft: "20px" }}
//           onChange={(e, v) => {
//             filterData(v);
//           }}
//           getOptionLabel={(rows) => rows.supplier_name.toString() || ""}
//           renderInput={(params) => (
//             <TextField {...params} label="Search by Supplier Name" />
//           )}
//         />
//         <CustomButton
//           variant="contained"
//           color="success"
//           endIcon={<AddCircleIcon />}
//           onClick={handleOpenAddModal}
//           size="large"
//         >
//           Add Collection
//         </CustomButton>
//       </div>

//       <TableContainer sx={{ maxHeight: 440 }}>
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead>
//             <TableRow>
//               <TableCell align="left" style={{ minWidth: "100px" }}>
//                 Supplier Name
//               </TableCell>
//               <TableCell align="left" style={{ minWidth: "100px" }}>
//                 Material Name
//               </TableCell>
//               <TableCell align="left" style={{ minWidth: "100px" }}>
//                 Quantity (kg)
//               </TableCell>
//               <TableCell align="left" style={{ minWidth: "100px" }}>
//                 Price (Rs)
//               </TableCell>
//               <TableCell align="left" style={{ minWidth: "100px" }}>
//                 Created Date
//               </TableCell>
//               <TableCell align="left" style={{ minWidth: "100px" }}>
//                 Action
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((row) => (
//                 <TableRow
//                   hover
//                   role="checkbox"
//                   tabIndex={-1}
//                   key={row.collection_id}
//                 >
//                   <TableCell align="left">{row.supplier_name}</TableCell>
//                   <TableCell align="left">{row.material_name}</TableCell>
//                   <TableCell align="left">{row.quantity}</TableCell>
//                   <TableCell align="left">{row.price}</TableCell>
//                   <TableCell align="left">{row.created_at}</TableCell>
//                   <TableCell align="left">
//                     <Stack spacing={2} direction="row">
//                       <EditIcon
//                         color="primary"
//                         style={{
//                           fontSize: "20px",
//                           cursor: "pointer",
//                         }}
//                         onClick={() => handleOpenEditModal(row.collection_id)}
//                       />
//                       <DeleteIcon
//                         color="secondary"
//                         style={{
//                           fontSize: "20px",
//                           cursor: "pointer",
//                         }}
//                         onClick={() => deleteUser(row.collection_id)}
//                       />
//                       <FileDownloadIcon
//                         color="secondary"
//                         style={{
//                           fontSize: "20px",
//                           cursor: "pointer",
//                         }}
//                         onClick={() => downloadCollectionFile(row)}
//                       />
//                     </Stack>
//                   </TableCell>
//                 </TableRow>
//               ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[10, 25, 100]}
//         component="div"
//         count={rows.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </>
//   );
// }

// import React, { useState, useEffect } from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TablePagination from "@mui/material/TablePagination";
// import TableRow from "@mui/material/TableRow";
// import { Divider } from "@mui/material";
// import Stack from "@mui/material/Stack";
// import Box from "@mui/material/Box";
// import Autocomplete from "@mui/material/Autocomplete";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import AddCircleIcon from "@mui/icons-material/AddCircle";
// import Modal from "@mui/material/Modal";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import Swal from "sweetalert2";
// import AddCustomerCollection from "./AddCustomerCollection";
// import { styled } from "@mui/system";
// import FileDownloadIcon from "@mui/icons-material/FileDownload";
// import jsPDF from "jspdf";
// import "jspdf-autotable";

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
//   borderRadius: "8px",
// };

// const CustomButton = styled(Button)(({ theme }) => ({
//   background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`,
//   border: 0,
//   borderRadius: 3,
//   boxShadow: "0 3px 5px 2px rgba(105, 135, 255, .3)",
//   color: "white",
//   height: 48,
//   padding: "0 30px",
//   "&:hover": {
//     background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)`,
//   },
// }));

// export default function CustomerCollectionList() {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [rows, setRows] = useState([]);
//   const [openAddModal, setOpenAddModal] = useState(false);
//   const [openEditModal, setOpenEditModal] = useState(false);
//   const [editOrderId, setEditOrderId] = useState(null);

//   const handleOpenAddModal = () => setOpenAddModal(true);
//   const handleCloseAddModal = () => setOpenAddModal(false);

//   const handleOpenEditModal = (orderId) => {
//     setEditOrderId(orderId);
//     setOpenEditModal(true);
//   };

//   const handleCloseEditModal = () => setOpenEditModal(false);

//   useEffect(() => {
//     fetchCollections();
//   }, []);

//   const fetchCollections = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:3001/api/collection/supplier"
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch collections");
//       }
//       const data = await response.json();
//       setRows(data);
//     } catch (error) {
//       console.error("Error fetching collections:", error);
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
//           `http://localhost:3001/api/collection/supplier/${id}`,
//           {
//             method: "DELETE",
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to delete collection");
//         }

//         const newRows = rows.filter((row) => row.collection_id !== id);
//         setRows(newRows);

//         Swal.fire("Deleted!", "Your file has been deleted.", "success").then(
//           () => {
//             fetchCollections(); // Refresh the data after deletion
//           }
//         );
//       }
//     } catch (error) {
//       console.error("Error deleting collection:", error);
//       Swal.fire("Error!", "Failed to delete the collection.", "error");
//     }
//   };

//   const filterData = (v) => {
//     if (v) {
//       setRows([v]);
//     } else {
//       fetchCollections(); // Reload all data if filter is cleared
//     }
//   };

//   const downloadCollectionFile = (row) => {
//     const doc = new jsPDF();

//     // Set PDF metadata
//     doc.setProperties({
//       title: `Collection Receipt - ${row.supplier_name}`,
//     });

//     // Add a header
//     doc.setFontSize(22);
//     doc.text("Collection Receipt", 105, 20, null, null, "center");

//     // Add a border
//     doc.setLineWidth(0.5);
//     doc.rect(10, 30, 190, 140);

//     // Add collection details
//     doc.setFontSize(12);
//     doc.text(`Supplier Name: ${row.supplier_name}`, 20, 50);
//     doc.text(`Material Name: ${row.material_name}`, 20, 60);
//     doc.text(`Quantity: ${row.quantity} kg`, 20, 70);
//     doc.text(`Price: Rs ${row.price}`, 20, 80);
//     doc.text(`Created Date: ${row.created_at}`, 20, 90);

//     // Add a footer
//     doc.setFontSize(10);
//     doc.text("Thank you for your business!", 105, 160, null, null, "center");

//     // Save the PDF
//     doc.save(`collection_${row.collection_id}.pdf`);
//   };

//   return (
//     <>
//       <div>
//         <Modal
//           open={openAddModal}
//           onClose={handleCloseAddModal}
//           aria-labelledby="modal-modal-title"
//           aria-describedby="modal-modal-description"
//         >
//           <Box sx={style}>
//             <AddCustomerCollection closeEvent={handleCloseAddModal} />
//           </Box>
//         </Modal>
//       </div>
//       <Divider />
//       <Box height={10} />

//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginBottom: "20px",
//           marginRight: "20px",
//         }}
//       >
//         <Autocomplete
//           disablePortal
//           id="combo-box-demo"
//           options={rows}
//           sx={{ width: 300, paddingLeft: "20px" }}
//           onChange={(e, v) => {
//             filterData(v);
//           }}
//           getOptionLabel={(rows) => rows.supplier_name.toString() || ""}
//           renderInput={(params) => (
//             <TextField {...params} label="Search by Supplier Name" />
//           )}
//         />
//         <CustomButton
//           variant="contained"
//           color="success"
//           endIcon={<AddCircleIcon />}
//           onClick={handleOpenAddModal}
//           size="large"
//         >
//           Add Collection
//         </CustomButton>
//       </div>

//       <TableContainer sx={{ maxHeight: 440 }}>
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead>
//             <TableRow>
//               <TableCell align="left" style={{ minWidth: "100px" }}>
//                 Supplier Name
//               </TableCell>
//               <TableCell align="left" style={{ minWidth: "100px" }}>
//                 Material Name
//               </TableCell>
//               <TableCell align="left" style={{ minWidth: "100px" }}>
//                 Quantity (kg)
//               </TableCell>
//               <TableCell align="left" style={{ minWidth: "100px" }}>
//                 Price (Rs)
//               </TableCell>
//               <TableCell align="left" style={{ minWidth: "100px" }}>
//                 Created Date
//               </TableCell>
//               <TableCell align="left" style={{ minWidth: "100px" }}>
//                 Action
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((row) => (
//                 <TableRow
//                   hover
//                   role="checkbox"
//                   tabIndex={-1}
//                   key={row.collection_id}
//                 >
//                   <TableCell align="left">{row.supplier_name}</TableCell>
//                   <TableCell align="left">{row.material_name}</TableCell>
//                   <TableCell align="left">{row.quantity}</TableCell>
//                   <TableCell align="left">{row.price}</TableCell>
//                   <TableCell align="left">{row.created_at}</TableCell>
//                   <TableCell align="left">
//                     <Stack spacing={2} direction="row">
//                       <EditIcon
//                         color="primary"
//                         style={{
//                           fontSize: "20px",
//                           cursor: "pointer",
//                         }}
//                         onClick={() => handleOpenEditModal(row.collection_id)}
//                       />
//                       <DeleteIcon
//                         color="secondary"
//                         style={{
//                           fontSize: "20px",
//                           cursor: "pointer",
//                         }}
//                         onClick={() => deleteUser(row.collection_id)}
//                       />
//                       <FileDownloadIcon
//                         color="secondary"
//                         style={{
//                           fontSize: "20px",
//                           cursor: "pointer",
//                         }}
//                         onClick={() => downloadCollectionFile(row)}
//                       />
//                     </Stack>
//                   </TableCell>
//                 </TableRow>
//               ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[10, 25, 100]}
//         component="div"
//         count={rows.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
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
import AddCustomerCollection from "./AddCustomerCollection";
import { styled } from "@mui/system";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import jsPDF from "jspdf";
import "jspdf-autotable";

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
      const response = await fetch(
        "http://localhost:3001/api/collection/supplier"
      );
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

  const downloadCollectionFile = (row) => {
    const doc = new jsPDF();

    // Set PDF metadata
    doc.setProperties({
      title: `Collection Receipt - ${row.supplier_name}`,
    });

    // Add a header
    doc.setFontSize(22);
    doc.text("Collection Receipt", 105, 20, null, null, "center");

    // Add a border
    doc.setLineWidth(0.5);
    doc.rect(10, 30, 190, 100);

    // Add collection details
    doc.setFontSize(12);
    doc.text(`Supplier Name  : ${row.supplier_name}`, 20, 50);
    doc.text(`Material Name  : ${row.material_name}`, 20, 60);
    doc.text(`Quantity            : ${row.quantity} kg`, 20, 70);
    doc.text(`Price                 : Rs ${row.price}`, 20, 80);
    doc.text(`Created Date   : ${row.created_at}`, 20, 90);

    // Add a footer
    doc.setFontSize(10);
    doc.text("Thank you for your business!", 105, 120, null, null, "center");
    doc.text("Eko Plasco", 105, 125, null, null, "center");

    // Save the PDF
    doc.save(`collection_${row.collection_id}.pdf`);
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
          getOptionLabel={(rows) => rows.supplier_name.toString() || ""}
          renderInput={(params) => (
            <TextField {...params} label="Search by Supplier Name" />
          )}
        />
        <CustomButton
          variant="contained"
          color="success"
          endIcon={<AddCircleIcon />}
          onClick={handleOpenAddModal}
          size="large"
        >
          Add Collection
        </CustomButton>
      </div>

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Supplier Name
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Material Name
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Quantity (kg)
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Price (Rs)
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Created Date
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
                  <TableCell align="left">{row.material_name}</TableCell>
                  <TableCell align="left">{row.quantity}</TableCell>
                  <TableCell align="left">{row.price}</TableCell>
                  <TableCell align="left">{row.created_at}</TableCell>
                  <TableCell align="left">
                    <Stack spacing={2} direction="row">
                      {/* <EditIcon
                        color="primary"
                        style={{
                          fontSize: "20px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleOpenEditModal(row.collection_id)}
                      />
                      <DeleteIcon
                        color="secondary"
                        style={{
                          fontSize: "20px",
                          cursor: "pointer",
                        }}
                        onClick={() => deleteUser(row.collection_id)}
                      /> */}
                      <FileDownloadIcon
                        color="secondary"
                        style={{
                          fontSize: "20px",
                          cursor: "pointer",
                        }}
                        onClick={() => downloadCollectionFile(row)}
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
