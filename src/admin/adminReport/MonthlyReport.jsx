// import React, { useState, useEffect } from "react";
// import { Button, TextField, Box, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import axios from "axios";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import { useNavigate } from 'react-router-dom';

// const MonthlyReport = () => {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [reportData, setReportData] = useState(null);
//   const [newUserData, setNewUserData] = useState(null);
//   const [open, setOpen] = useState(true);
//   const navigate = useNavigate();

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };

//   const fetchReportData = async () => {
//     try {
//       const response = await axios.get("http://localhost:3001/api/report/user/details");
//       setReportData(response.data);
//     } catch (error) {
//       console.error("Error fetching report data:", error);
//     }
//   };

//   const fetchNewUserData = async () => {
//     try {
//       const response = await axios.post("http://localhost:3001/api/report/new/users", {
//         date: selectedDate,
//       });
//       setNewUserData(response.data);
//     } catch (error) {
//       console.error("Error fetching new user data:", error);
//     }
//   };

//   const generatePDF = () => {
//     const doc = new jsPDF();

//     doc.setFontSize(20);
//     doc.text("Monthly Report", 14, 22);
//     doc.setFontSize(12);
//     doc.text(
//       `Month: ${selectedDate.toLocaleDateString("default", {
//         month: "long",
//         year: "numeric",
//       })}`,
//       14,
//       32
//     );

//     doc.autoTable({
//       startY: 40,
//       head: [['Metric', 'Count']],
//       body: [
//         ['Total Users', reportData.total_users],
//         ['Total Customers', reportData.total_customers],
//         ['Total Suppliers', reportData.total_suppliers],
//         ['Total Drivers', reportData.total_drivers],
//         ['Total Bailers', reportData.total_bailers],
//       ],
//     });

//     doc.addPage();

//     doc.autoTable({
//       startY: 10,
//       head: [['New Users', 'Count']],
//       body: [
//         ['Total New Customers', newUserData.new_customers],
//         ['Total New Suppliers', newUserData.new_suppliers],
//       ],
//     });

//     doc.save("MonthlyReport.pdf");
//   };

//   const handleGenerateReport = async () => {
//     await fetchReportData();
//     await fetchNewUserData();
//   };

//   useEffect(() => {
//     if (reportData && newUserData) {
//       generatePDF();
//       navigate('/admin/report');
//     }
//   }, [reportData, newUserData, navigate]);

//   const handleClose = () => {
//     setOpen(false);
//     navigate('/admin/report');
//   };

//   return (
//     <Dialog open={open} onClose={handleClose}>
//       <DialogTitle>Select Month for Report</DialogTitle>
//       <DialogContent>
//         <DatePicker
//           selected={selectedDate}
//           onChange={handleDateChange}
//           dateFormat="MM/yyyy"
//           showMonthYearPicker
//           customInput={<TextField fullWidth variant="outlined" />}
//         />
//       </DialogContent>
//       <DialogActions>
//         <Button variant="contained" color="primary" onClick={handleGenerateReport}>
//           Generate Report
//         </Button>
//         <Button
//           variant="outlined"
//           color="secondary"
//           onClick={handleClose}
//         >
//           Cancel
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default MonthlyReport;


import React, { useState, useEffect } from "react";
import { Button, TextField, Box, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useNavigate } from 'react-router-dom';

const MonthlyReport = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reportData, setReportData] = useState(null);
  const [newUserData, setNewUserData] = useState(null);
  const [materialsData, setMaterialsData] = useState(null);
  const [productsData, setProductsData] = useState(null);
  const [monthlyMaterials, setMonthlyMaterials] = useState(null);
  const [monthlyProducts, setMonthlyProducts] = useState(null);
  const [totalSalary, setTotalSalary] = useState(null);
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const fetchReportData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/report/user/details");
      setReportData(response.data);
    } catch (error) {
      console.error("Error fetching report data:", error);
    }
  };

  const fetchNewUserData = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/report/new/users", {
        date: selectedDate,
      });
      setNewUserData(response.data);
    } catch (error) {
      console.error("Error fetching new user data:", error);
    }
  };

  const fetchMaterialsData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/report/materials");
      setMaterialsData(response.data);
    } catch (error) {
      console.error("Error fetching materials data:", error);
    }
  };

  const fetchProductsData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/report/products");
      setProductsData(response.data);
    } catch (error) {
      console.error("Error fetching products data:", error);
    }
  };

  const fetchMonthlyMaterials = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/report/monthly/materials", {
        date: selectedDate,
      });
      setMonthlyMaterials(response.data);
    } catch (error) {
      console.error("Error fetching monthly materials:", error);
    }
  };

  const fetchMonthlyProducts = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/report/monthly/products", {
        date: selectedDate,
      });
      setMonthlyProducts(response.data);
    } catch (error) {
      console.error("Error fetching monthly products:", error);
    }
  };

  const fetchTotalSalary = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/report/total/salary", {
        date: selectedDate,
      });
      setTotalSalary(response.data);
    } catch (error) {
      console.error("Error fetching total salary:", error);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Monthly Report", 14, 22);
    doc.setFontSize(12);
    doc.text(
      `Month: ${selectedDate.toLocaleDateString("default", {
        month: "long",
        year: "numeric",
      })}`,
      14,
      32
    );

    // User Details
    doc.autoTable({
      startY: 40,
      head: [['Metric', 'Count']],
      body: [
        ['Total Users', reportData.total_users],
        ['Total Customers', reportData.total_customers],
        ['Total Suppliers', reportData.total_suppliers],
        ['Total Drivers', reportData.total_drivers],
        ['Total Bailers', reportData.total_bailers],
      ],
    });

    // New Users
    doc.autoTable({
      startY: doc.previousAutoTable.finalY + 10,
      head: [['New Users', 'Count']],
      body: [
        ['Total New Customers', newUserData.new_customers],
        ['Total New Suppliers', newUserData.new_suppliers],
      ],
    });

    // Materials
    doc.autoTable({
      startY: doc.previousAutoTable.finalY + 10,
      head: [['Material Name', 'Total Quantity']],
      body: materialsData.map(material => [material.material_name, material.total_quantity]),
    });

    // Products
    doc.autoTable({
      startY: doc.previousAutoTable.finalY + 10,
      head: [['Product Name', 'Total Quantity']],
      body: productsData.map(product => [product.product_name, product.total_quantity]),
    });

    // Monthly Materials Collection
    doc.autoTable({
      startY: doc.previousAutoTable.finalY + 10,
      head: [['Material Name', 'Collected Quantity']],
      body: monthlyMaterials.map(material => [material.material_name, material.collected_quantity]),
    });

    // Monthly Products Collection
    doc.autoTable({
      startY: doc.previousAutoTable.finalY + 10,
      head: [['Product Name', 'Collected Quantity']],
      body: monthlyProducts.map(product => [product.product_name, product.collected_quantity]),
    });

    // Total Salary Paid
    doc.autoTable({
      startY: doc.previousAutoTable.finalY + 10,
      head: [['Metric', 'Amount']],
      body: [['Total Salary Paid', totalSalary.total_salary]],
    });

    doc.save("MonthlyReport.pdf");
  };

  const handleGenerateReport = async () => {
    await fetchReportData();
    await fetchNewUserData();
    await fetchMaterialsData();
    await fetchProductsData();
    await fetchMonthlyMaterials();
    await fetchMonthlyProducts();
    await fetchTotalSalary();
  };

  useEffect(() => {
    if (reportData && newUserData && materialsData && productsData && monthlyMaterials && monthlyProducts && totalSalary) {
      generatePDF();
      navigate('/admin/report');
    }
  }, [reportData, newUserData, materialsData, productsData, monthlyMaterials, monthlyProducts, totalSalary, navigate]);

  const handleClose = () => {
    setOpen(false);
    navigate('/admin/report');
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Select Month for Report</DialogTitle>
      <DialogContent>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          customInput={<TextField fullWidth variant="outlined" />}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={handleGenerateReport}>
          Generate Report
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleClose}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MonthlyReport;


// import React, { useState, useEffect } from "react";
// import { Button, TextField, Box, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import axios from "axios";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import { useNavigate } from 'react-router-dom';

// const MonthlyReport = () => {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [reportData, setReportData] = useState(null);
//   const [newUserData, setNewUserData] = useState(null);
//   const [materialsData, setMaterialsData] = useState(null);
//   const [productsData, setProductsData] = useState(null);
//   const [monthlyMaterials, setMonthlyMaterials] = useState(null);
//   const [monthlyProducts, setMonthlyProducts] = useState(null);
//   const [totalSalary, setTotalSalary] = useState(null);
//   const [totalOrders, setTotalOrders] = useState(null);
//   const [totalFinishedOrders, setTotalFinishedOrders] = useState(null);
//   const [totalCancelledOrders, setTotalCancelledOrders] = useState(null);
//   const [totalProductQuantity, setTotalProductQuantity] = useState(null);
//   const [totalMaterialCollected, setTotalMaterialCollected] = useState(null);
//   const [totalCollectionBins, setTotalCollectionBins] = useState(null);
//   const [monthlyCollectionBins, setMonthlyCollectionBins] = useState(null);
//   const [mostCollectedDriver, setMostCollectedDriver] = useState(null);
//   const [mostCollectedSupplier, setMostCollectedSupplier] = useState(null);
//   const [open, setOpen] = useState(true);
//   const navigate = useNavigate();

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };

//   const fetchReportData = async () => {
//     try {
//       const response = await axios.get("http://localhost:3001/api/report/user/details");
//       setReportData(response.data);
//     } catch (error) {
//       console.error("Error fetching report data:", error);
//     }
//   };

//   const fetchNewUserData = async () => {
//     try {
//       const response = await axios.post("http://localhost:3001/api/report/new/users", {
//         date: selectedDate,
//       });
//       setNewUserData(response.data);
//     } catch (error) {
//       console.error("Error fetching new user data:", error);
//     }
//   };

//   const fetchMaterialsData = async () => {
//     try {
//       const response = await axios.get("http://localhost:3001/api/report/materials");
//       setMaterialsData(response.data);
//     } catch (error) {
//       console.error("Error fetching materials data:", error);
//     }
//   };

//   const fetchProductsData = async () => {
//     try {
//       const response = await axios.get("http://localhost:3001/api/report/products");
//       setProductsData(response.data);
//     } catch (error) {
//       console.error("Error fetching products data:", error);
//     }
//   };

//   const fetchMonthlyMaterials = async () => {
//     try {
//       const response = await axios.post("http://localhost:3001/api/report/monthly/materials", {
//         date: selectedDate,
//       });
//       setMonthlyMaterials(response.data);
//     } catch (error) {
//       console.error("Error fetching monthly materials:", error);
//     }
//   };

//   const fetchMonthlyProducts = async () => {
//     try {
//       const response = await axios.post("http://localhost:3001/api/report/monthly/products", {
//         date: selectedDate,
//       });
//       setMonthlyProducts(response.data);
//     } catch (error) {
//       console.error("Error fetching monthly products:", error);
//     }
//   };

//   const fetchTotalSalary = async () => {
//     try {
//       const response = await axios.post("http://localhost:3001/api/report/total/salary", {
//         date: selectedDate,
//       });
//       setTotalSalary(response.data);
//     } catch (error) {
//       console.error("Error fetching total salary:", error);
//     }
//   };

//   const fetchTotalOrders = async () => {
//     try {
//       const response = await axios.post("http://localhost:3001/api/report/total/orders", {
//         date: selectedDate,
//       });
//       setTotalOrders(response.data);
//     } catch (error) {
//       console.error("Error fetching total orders:", error);
//     }
//   };

//   const fetchTotalFinishedOrders = async () => {
//     try {
//       const response = await axios.post("http://localhost:3001/api/report/total/finished/orders", {
//         date: selectedDate,
//       });
//       setTotalFinishedOrders(response.data);
//     } catch (error) {
//       console.error("Error fetching finished orders:", error);
//     }
//   };

//   const fetchTotalCancelledOrders = async () => {
//     try {
//       const response = await axios.post("http://localhost:3001/api/report/total/cancelled/orders", {
//         date: selectedDate,
//       });
//       setTotalCancelledOrders(response.data);
//     } catch (error) {
//       console.error("Error fetching cancelled orders:", error);
//     }
//   };

//   const fetchTotalProductQuantity = async () => {
//     try {
//       const response = await axios.post("http://localhost:3001/api/report/total/product/quantity", {
//         date: selectedDate,
//       });
//       setTotalProductQuantity(response.data);
//     } catch (error) {
//       console.error("Error fetching product quantity:", error);
//     }
//   };

//   const fetchTotalMaterialCollected = async () => {
//     try {
//       const response = await axios.get("http://localhost:3001/api/report/total/material/collected");
//       setTotalMaterialCollected(response.data);
//     } catch (error) {
//       console.error("Error fetching material collected:", error);
//     }
//   };

//   const fetchTotalCollectionBins = async () => {
//     try {
//       const response = await axios.get("http://localhost:3001/api/report/total/collection/bins");
//       setTotalCollectionBins(response.data);
//     } catch (error) {
//       console.error("Error fetching collection bins:", error);
//     }
//   };

//   const fetchMonthlyCollectionBins = async () => {
//     try {
//       const response = await axios.post("http://localhost:3001/api/report/monthly/collection/bins", {
//         date: selectedDate,
//       });
//       setMonthlyCollectionBins(response.data);
//     } catch (error) {
//       console.error("Error fetching monthly collection bins:", error);
//     }
//   };

//   const fetchMostCollectedDriver = async () => {
//     try {
//       const response = await axios.post("http://localhost:3001/api/report/most/collected/driver", {
//         date: selectedDate,
//       });
//       setMostCollectedDriver(response.data);
//     } catch (error) {
//       console.error("Error fetching most collected driver:", error);
//     }
//   };

//   const fetchMostCollectedSupplier = async () => {
//     try {
//       const response = await axios.post("http://localhost:3001/api/report/most/collected/supplier", {
//         date: selectedDate,
//       });
//       setMostCollectedSupplier(response.data);
//     } catch (error) {
//       console.error("Error fetching most collected supplier:", error);
//     }
//   };

//   const generatePDF = () => {
//     const doc = new jsPDF();

//     doc.setFontSize(20);
//     doc.text("Monthly Report", 14, 22);
//     doc.setFontSize(12);
//     doc.text(
//       `Month: ${selectedDate.toLocaleDateString("default", {
//         month: "long",
//         year: "numeric",
//       })}`,
//       14,
//       32
//     );

//     // User Details
//     doc.autoTable({
//       startY: 40,
//       head: [['Metric', 'Count']],
//       body: [
//         ['Total Users', reportData.total_users],
//         ['Total Customers', reportData.total_customers],
//         ['Total Suppliers', reportData.total_suppliers],
//         ['Total Drivers', reportData.total_drivers],
//         ['Total Bailers', reportData.total_bailers],
//       ],
//     });

//     // New Users
//     doc.autoTable({
//       startY: doc.previousAutoTable.finalY + 10,
//       head: [['New Users', 'Count']],
//       body: [
//         ['Total New Customers', newUserData.new_customers],
//         ['Total New Suppliers', newUserData.new_suppliers],
//       ],
//     });

//     // Materials
//     doc.autoTable({
//       startY: doc.previousAutoTable.finalY + 10,
//       head: [['Material Name', 'Total Quantity']],
//       body: materialsData.map(material => [material.material_name, material.total_quantity]),
//     });

//     // Products
//     doc.autoTable({
//       startY: doc.previousAutoTable.finalY + 10,
//       head: [['Product Name', 'Total Quantity']],
//       body: productsData.map(product => [product.product_name, product.total_quantity]),
//     });

//     // Monthly Materials Collection
//     doc.autoTable({
//       startY: doc.previousAutoTable.finalY + 10,
//       head: [['Material Name', 'Collected Quantity']],
//       body: monthlyMaterials.map(material => [material.material_name, material.collected_quantity]),
//     });

//     // Monthly Products Collection
//     doc.autoTable({
//       startY: doc.previousAutoTable.finalY + 10,
//       head: [['Product Name', 'Collected Quantity']],
//       body: monthlyProducts.map(product => [product.product_name, product.collected_quantity]),
//     });

//     // Total Salary Paid
//     doc.autoTable({
//       startY: doc.previousAutoTable.finalY + 10,
//       head: [['Metric', 'Amount']],
//       body: [['Total Salary Paid', totalSalary.total_salary]],
//     });

//     // Orders
//     doc.autoTable({
//       startY: doc.previousAutoTable.finalY + 10,
//       head: [['Metric', 'Count']],
//       body: [
//         ['Total Orders', totalOrders.total_orders],
//         ['Total Finished Orders', totalFinishedOrders.total_finished_orders],
//         ['Total Cancelled Orders', totalCancelledOrders.total_cancelled_orders],
//       ],
//     });

//     // Total Product Quantity
//     doc.autoTable({
//       startY: doc.previousAutoTable.finalY + 10,
//       head: [['Metric', 'Quantity']],
//       body: [['Total Product Quantity', totalProductQuantity.total_quantity]],
//     });

//     // Total Material Collected
//     doc.autoTable({
//       startY: doc.previousAutoTable.finalY + 10,
//       head: [['Metric', 'Quantity']],
//       body: [['Total Material Collected', totalMaterialCollected.total_material_collected]],
//     });

//     // Total Collection Bins
//     doc.autoTable({
//       startY: doc.previousAutoTable.finalY + 10,
//       head: [['Metric', 'Count']],
//       body: [['Total Collection Bins', totalCollectionBins.total_bins]],
//     });

//     // Monthly Collection Bins
//     doc.autoTable({
//       startY: doc.previousAutoTable.finalY + 10,
//       head: [['Metric', 'Count']],
//       body: [['Monthly Collection Bins', monthlyCollectionBins.monthly_bins]],
//     });

//     // Most Collected Driver
//     doc.autoTable({
//       startY: doc.previousAutoTable.finalY + 10,
//       head: [['Metric', 'Driver']],
//       body: [['Most Collected Driver', mostCollectedDriver.driver_name]],
//     });

//     // Most Collected Supplier
//     doc.autoTable({
//       startY: doc.previousAutoTable.finalY + 10,
//       head: [['Metric', 'Supplier']],
//       body: [['Most Collected Supplier', mostCollectedSupplier.supplier_name]],
//     });

//     doc.save("MonthlyReport.pdf");
//   };

//   const handleGenerateReport = async () => {
//     await fetchReportData();
//     await fetchNewUserData();
//     await fetchMaterialsData();
//     await fetchProductsData();
//     await fetchMonthlyMaterials();
//     await fetchMonthlyProducts();
//     await fetchTotalSalary();
//     await fetchTotalOrders();
//     await fetchTotalFinishedOrders();
//     await fetchTotalCancelledOrders();
//     await fetchTotalProductQuantity();
//     await fetchTotalMaterialCollected();
//     await fetchTotalCollectionBins();
//     await fetchMonthlyCollectionBins();
//     await fetchMostCollectedDriver();
//     await fetchMostCollectedSupplier();
//   };

//   useEffect(() => {
//     if (
//       reportData &&
//       newUserData &&
//       materialsData &&
//       productsData &&
//       monthlyMaterials &&
//       monthlyProducts &&
//       totalSalary &&
//       totalOrders &&
//       totalFinishedOrders &&
//       totalCancelledOrders &&
//       totalProductQuantity &&
//       totalMaterialCollected &&
//       totalCollectionBins &&
//       monthlyCollectionBins &&
//       mostCollectedDriver &&
//       mostCollectedSupplier
//     ) {
//       generatePDF();
//       navigate('/admin/report');
//     }
//   }, [
//     reportData,
//     newUserData,
//     materialsData,
//     productsData,
//     monthlyMaterials,
//     monthlyProducts,
//     totalSalary,
//     totalOrders,
//     totalFinishedOrders,
//     totalCancelledOrders,
//     totalProductQuantity,
//     totalMaterialCollected,
//     totalCollectionBins,
//     monthlyCollectionBins,
//     mostCollectedDriver,
//     mostCollectedSupplier,
//     navigate
//   ]);

//   const handleClose = () => {
//     setOpen(false);
//     navigate('/admin/report');
//   };

//   return (
//     <Dialog open={open} onClose={handleClose}>
//       <DialogTitle>Select Month for Report</DialogTitle>
//       <DialogContent>
//         <DatePicker
//           selected={selectedDate}
//           onChange={handleDateChange}
//           dateFormat="MM/yyyy"
//           showMonthYearPicker
//           customInput={<TextField fullWidth variant="outlined" />}
//         />
//       </DialogContent>
//       <DialogActions>
//         <Button variant="contained" color="primary" onClick={handleGenerateReport}>
//           Generate Report
//         </Button>
//         <Button
//           variant="outlined"
//           color="secondary"
//           onClick={handleClose}
//         >
//           Cancel
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default MonthlyReport;
