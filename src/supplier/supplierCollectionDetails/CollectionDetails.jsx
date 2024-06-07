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
import { Divider, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

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

export default function CollectionDetails() {

  const [user, setUser] = useState({});
  const [userId, setUserId] = useState(0);


  const navigate = useNavigate();
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);

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
          supplierId(res.data.user.id);

        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const supplierId = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/supplier/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch supplier id");
      }
      const data = await response.json();
      setUserId(data.customer_id);
      fetchCollection(data.supplier_id); 
    } catch (error) {
      console.error("Error fetching supplier id:", error);
    }
  };
  const fetchCollection = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/supplier/collection/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch collection");
      }
      const data = await response.json();
      setRows(data); // Assuming data is an array of objects
    } catch (error) {
      console.error("Error fetching collection:", error);
    }
  };

  const filterData = (v) => {
    if (v) {
      setRows([v]);
    } else {
      setRows([]);
      fetchCollection();
      window.location.reload();
    }
  };

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Box height={20} />
        <Typography
          variant="h5"
          component="div"
          sx={{ display: "flex", justifyContent: "left", paddingLeft: "20px" }}
        >
            Collection Details 
        </Typography>
        <Box height={20} />
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
            getOptionLabel={(rows) => rows.date || ""}
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
                  Date
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
                  Admin
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
                      {row.date}
                    </TableCell>
                    <TableCell key={row.id} align={"left"}>
                      {row.material_name}
                    </TableCell>
                    <TableCell key={row.id} align={"left"}>
                      {row.quantity}
                    </TableCell>
                    <TableCell key={row.id} align={"left"}>
                      {row.price}
                    </TableCell>
                    <TableCell key={row.id} align={"left"}>
                      {row.admin_name}
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

