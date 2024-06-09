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
// import Button from "@mui/material/Button";
// import AddCircleIcon from "@mui/icons-material/AddCircle";
// import Modal from "@mui/material/Modal";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import Swal from "sweetalert2";
// import AddMaterials from "./AddMaterial";
// import EditMaterials from "./EditMaterial";
// import { styled } from '@mui/system';

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


// export default function MaterialList() {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [rows, setRows] = useState([]);
//   const [openAddModal, setOpenAddModal] = useState(false);
//   const [openEditModal, setOpenEditModal] = useState(false);
//   const [editMaterialId, setEditMaterialId] = useState(null);

//   const handleOpenAddModal = () => setOpenAddModal(true);
//   const handleCloseAddModal = () => setOpenAddModal(false);

//   const handleOpenEditModal = (materialId) => {
//     setEditMaterialId(materialId);
//     setOpenEditModal(true);
//   };

//   const handleCloseEditModal = () => setOpenEditModal(false);

//   useEffect(() => {
//     fetchMaterials();
//   }, []);

//   const fetchMaterials = async () => {
//     try {
//       const response = await fetch("http://localhost:3001/api/materials");
//       if (!response.ok) {
//         throw new Error("Failed to fetch materials");
//       }
//       const data = await response.json();
//       setRows(data);
//     } catch (error) {
//       console.error("Error fetching materials:", error);
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
//           `http://localhost:3001/api/materials/${id}`,
//           {
//             method: "DELETE",
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to delete material");
//         }

//         const newRows = rows.filter((row) => row.id !== id);
//         setRows(newRows);

//         Swal.fire("Deleted!", "Your file has been deleted.", "success").then(
//           () => {
//             window.location.reload();
//           }
//         );
//       }
//     } catch (error) {
//       console.error("Error deleting material:", error);
//       Swal.fire("Error!", "Failed to delete the material.", "error");
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
//             <AddMaterials closeEvent={handleCloseAddModal} />
//           </Box>
//         </Modal>
//         <Modal
//           open={openEditModal}
//           aria-labelledby="modal-modal-title"
//           aria-describedby="modal-modal-description"
//         >
//           <Box sx={style}>
//             <EditMaterials
//               closeEvent={handleCloseEditModal}
//               materialId={editMaterialId}
//             />
//           </Box>
//         </Modal>
//       </div>
      
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
//             sx={{ width: 300 }}
//             onChange={(e, v) => {
//               filterData(v);
//             }}
//             getOptionLabel={(rows) => rows.name || ""}
//             renderInput={(params) => (
//               <TextField {...params} label="Search by name" />
//             )}
//           />
//           <CustomButton
//             variant="contained"
//             color="success"
//             endIcon={<AddCircleIcon />}
//             onClick={handleOpenAddModal}
//             size="large"
//           >
//             Add Material
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
//                   Created Date
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
//                 .map((row) => {
//                   return (
//                     <TableRow
//                       hover
//                       role="checkbox"
//                       tabIndex={-1}
//                       key={row.code}
//                     >
//                       <TableCell key={row.id} align={"left"}>
//                         {row.name}
//                       </TableCell>
//                       <TableCell key={row.id} align={"left"}>
//                         {row.unit_price}
//                       </TableCell>
//                       <TableCell key={row.id} align={"left"}>
//                         {row.total_quantity}
//                       </TableCell>
//                       <TableCell key={row.id} align={"left"}>
//                         {row.created_at}
//                       </TableCell>
//                       <TableCell key={row.id} align={"left"}>
//                         {row.updated_at}
//                       </TableCell>
//                       <TableCell align={"left"}>
//                         <Stack spacing={2} direction="row">
//                           <EditIcon
//                           color="primary"
//                             style={{
//                               fontSize: "20px",
//                               cursor: "pointer",
//                             }}
//                             className="cursor-pointer"
//                             onClick={() => handleOpenEditModal(row.material_id)} // Pass the material ID to the edit modal
//                           />
//                           <DeleteIcon
//                           color="secondary"
//                             style={{
//                               fontSize: "20px",
//                               cursor: "pointer",
//                             }}
//                             className="cursor-pointer"
//                             onClick={() => deleteUser(row.material_id)}
//                           />
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
import AddMaterials from "./AddMaterial";
import EditMaterials from "./EditMaterial";
import { styled } from '@mui/system';

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

export default function MaterialList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editMaterial, setEditMaterial] = useState(null); // Changed to store material details

  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const handleOpenEditModal = (material) => {
    setEditMaterial(material); // Set the selected material details
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => setOpenEditModal(false);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/materials");
      if (!response.ok) {
        throw new Error("Failed to fetch materials");
      }
      const data = await response.json();
      setRows(data);
    } catch (error) {
      console.error("Error fetching materials:", error);
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
          `http://localhost:3001/api/materials/${id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete material");
        }

        const newRows = rows.filter((row) => row.id !== id);
        setRows(newRows);

        Swal.fire("Deleted!", "Your file has been deleted.", "success").then(
          () => {
            window.location.reload();
          }
        );
      }
    } catch (error) {
      console.error("Error deleting material:", error);
      Swal.fire("Error!", "Failed to delete the material.", "error");
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
            <AddMaterials closeEvent={handleCloseAddModal} />
          </Box>
        </Modal>
        <Modal
          open={openEditModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <EditMaterials
              closeEvent={handleCloseEditModal}
              material={editMaterial} // Pass the material details
            />
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
            sx={{ width: 300 }}
            onChange={(e, v) => {
              filterData(v);
            }}
            getOptionLabel={(rows) => rows.name || ""}
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
            Add Material
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
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id} // Changed key to row.id
                    >
                      <TableCell align={"left"}>
                        {row.name}
                      </TableCell>
                      <TableCell align={"left"}>
                        {row.unit_price}
                      </TableCell>
                      <TableCell align={"left"}>
                        {row.total_quantity}
                      </TableCell>
                      <TableCell align={"left"}>
                        {row.created_at}
                      </TableCell>
                      <TableCell align={"left"}>
                        {row.updated_at}
                      </TableCell>
                      <TableCell align={"left"}>
                        <Stack spacing={2} direction="row">
                          <EditIcon
                            color="primary"
                            style={{
                              fontSize: "20px",
                              cursor: "pointer",
                            }}
                            className="cursor-pointer"
                            onClick={() => handleOpenEditModal(row)} // Pass the entire material object to the edit modal
                          />
                          <DeleteIcon
                            color="secondary"
                            style={{
                              fontSize: "20px",
                              cursor: "pointer",
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

    </>
  );
}
