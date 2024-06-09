// import React, { useState, useEffect } from "react";
// import Paper from "@mui/material/Paper";
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
// import Modal from "@mui/material/Modal";
// import EditIcon from "@mui/icons-material/Edit";
// import AcceptBailing from "./AcceptBailing";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

// export default function PendingBailingList() {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [rows, setRows] = useState([]);
//   const [openEditModal, setOpenEditModal] = useState(false);
//   const [editBailingDetails, setEditBailingDetails] = useState(null);
//   const [materials, setMaterials] = useState([]);
//   const [products, setProducts] = useState([]);

//   const handleOpenEditModal = async (bailingDetails) => {
//     await fetchMaterials();
//     await fetchProducts();
//     setEditBailingDetails(bailingDetails);
//     setOpenEditModal(true);
//   };

//   const handleCloseEditModal = () => {
//     setOpenEditModal(false);
//     setEditBailingDetails(null);
//   };

//   useEffect(() => {
//     fetchBailingDetails();
//   }, []);

//   const fetchBailingDetails = async () => {
//     try {
//       const response = await fetch(`http://localhost:3001/api/admin/bailing/details`);
//       if (!response.ok) {
//         throw new Error("Failed to fetch bailing details");
//       }
//       const data = await response.json();
//       setRows(data);
//     } catch (error) {
//       console.error("Error fetching bailing details:", error);
//     }
//   };

//   const fetchMaterials = async () => {
//     try {
//       const response = await fetch("http://localhost:3001/api/materials");
//       if (!response.ok) {
//         throw new Error("Failed to fetch materials");
//       }
//       const data = await response.json();
//       setMaterials(data);
//     } catch (error) {
//       console.error("Error fetching materials:", error);
//     }
//   };

//   const fetchProducts = async () => {
//     try {
//       const response = await fetch("http://localhost:3001/api/products");
//       if (!response.ok) {
//         throw new Error("Failed to fetch products");
//       }
//       const data = await response.json();
//       setProducts(data);
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
//           open={openEditModal}
//           onClose={handleCloseEditModal}
//           aria-labelledby="modal-modal-title"
//           aria-describedby="modal-modal-description"
//         >
//           <Box sx={style}>
//             {editBailingDetails && (
//               <AcceptBailing
//                 closeEvent={handleCloseEditModal}
//                 bailingDetails={editBailingDetails}
//                 materials={materials}
//                 products={products}
//               />
//             )}
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
//           Convert List
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
//             getOptionLabel={(rows) => rows.bailing_name || ""}
//             renderInput={(params) => (
//               <TextField {...params} label="Search by name" />
//             )}
//           />
//         </div>

//         <TableContainer sx={{ maxHeight: 440 }}>
//           <Table stickyHeader aria-label="sticky table">
//             <TableHead>
//               <TableRow>
//                 <TableCell align="left" style={{ minWidth: "100px" }}>
//                   Bailing Name
//                 </TableCell>
//                 <TableCell align="left" style={{ minWidth: "100px" }}>
//                   Bailer Name
//                 </TableCell>
//                 <TableCell align="left" style={{ minWidth: "100px" }}>
//                   Material Name
//                 </TableCell>
//                 <TableCell align="left" style={{ minWidth: "100px" }}>
//                   Material Quantity
//                 </TableCell>
//                 <TableCell align="left" style={{ minWidth: "100px" }}>
//                   Product Name
//                 </TableCell>
//                 <TableCell align="left" style={{ minWidth: "100px" }}>
//                   Product Quantity
//                 </TableCell>
//                 <TableCell align="left" style={{ minWidth: "100px" }}>
//                   Updated Date
//                 </TableCell>
//                 <TableCell align="left" style={{ minWidth: "100px" }}>
//                   Action
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {rows
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((row) => (
//                   <TableRow hover role="checkbox" tabIndex={-1} key={row.bailing_id}>
//                     <TableCell align="left">{row.bailing_name}</TableCell>
//                     <TableCell align="left">{`${row.bailer_firstname} ${row.bailer_lastname}`}</TableCell>
//                     <TableCell align="left">{row.material_name}</TableCell>
//                     <TableCell align="left">{row.material_quantity}</TableCell>
//                     <TableCell align="left">{row.product_name}</TableCell>
//                     <TableCell align="left">{row.product_quantity}</TableCell>
//                     <TableCell align="left">{row.date}</TableCell>
//                     <TableCell align="left">
//                       <Stack spacing={2}>
//                         <EditIcon
//                           style={{
//                             fontSize: "20px",
//                             color: "#02294F",
//                             cursor: "pointer",
//                           }}
//                           className="cursor-pointer"
//                           onClick={() => handleOpenEditModal(row)}
//                         />
//                       </Stack>
//                     </TableCell>
//                   </TableRow>
//                 ))}
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
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Divider, Typography, Stack, Box, Modal, Autocomplete, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AcceptBailing from "./AcceptBailing";

const modalStyle = {
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

export default function PendingBailingList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editBailingDetails, setEditBailingDetails] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchBailingDetails();
  }, []);

  const fetchBailingDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/admin/bailing/details`);
      if (!response.ok) {
        throw new Error("Failed to fetch bailing details");
      }
      const data = await response.json();
      setRows(data);
    } catch (error) {
      console.error("Error fetching bailing details:", error);
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

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleOpenEditModal = async (bailingDetails) => {
    await fetchMaterials();
    await fetchProducts();
    setEditBailingDetails(bailingDetails);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setEditBailingDetails(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
      <Modal
        open={openEditModal}
        onClose={handleCloseEditModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          {editBailingDetails && (
            <AcceptBailing
              closeEvent={handleCloseEditModal}
              bailingDetails={editBailingDetails}
              materials={materials}
              products={products}
            />
          )}
        </Box>
      </Modal>

      <Paper sx={{ width: "100%", overflow: "hidden", p: 2, borderRadius: 2 }}>
        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}
        >
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={rows}
            sx={{ width: 300 }}
            onChange={(e, v) => filterData(v)}
            getOptionLabel={(rows) => rows.bailer_firstname || ""}
            renderInput={(params) => (
              <TextField {...params} label="Search by name" variant="outlined" />
            )}
          />
        </Stack>

        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {[ "Bailer Name", "Material Name", "Material Quantity", "Product Name", "Product Quantity", "Updated Date", "Action"].map((header) => (
                  <TableCell key={header} align="left" style={{ minWidth: "100px", fontWeight: 'bold' }}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.bailing_id}>
                    <TableCell align="left">{`${row.bailer_firstname} ${row.bailer_lastname}`}</TableCell>
                    <TableCell align="left">{row.material_name}</TableCell>
                    <TableCell align="left">{row.material_quantity}</TableCell>
                    <TableCell align="left">{row.product_name}</TableCell>
                    <TableCell align="left">{row.product_quantity}</TableCell>
                    <TableCell align="left">{row.date}</TableCell>
                    <TableCell align="left">
                      <EditIcon
                       color= "primary"
                        style={{ fontSize: "20px", cursor: "pointer" }}
                        onClick={() => handleOpenEditModal(row)}
                      />
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
      </Paper>
    </>
  );
}
