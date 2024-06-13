import React, { useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const WeeklyReport = ({ closeEvent }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reportData, setReportData] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const fetchReportData = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/reports/weekly", {
        week: selectedDate,
      });
      setReportData(response.data);
    } catch (error) {
      console.error("Error fetching report data:", error);
    }
  };

  const generatePDF = () => {
    const input = document.getElementById("report-content");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 10, 10);
      pdf.save("WeeklyReport.pdf");
    });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Select Week for Report
      </Typography>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="MM/dd/yyyy"
        customInput={<TextField fullWidth variant="outlined" />}
      />
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={fetchReportData}>
          Generate Report
        </Button>
        <Button variant="outlined" color="secondary" onClick={closeEvent} style={{ marginLeft: "10px" }}>
          Cancel
        </Button>
      </Box>
      {reportData && (
        <Box mt={4} id="report-content">
          <Typography variant="h5" gutterBottom>
            Weekly Report for Week of {selectedDate.toLocaleDateString()}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {/* Replace with dynamic data */}
            Total Sales: {reportData.totalSales}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {/* Replace with dynamic data */}
            Total Customers: {reportData.totalCustomers}
          </Typography>
          {/* Add more data as needed */}
        </Box>
      )}
      {reportData && (
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={generatePDF}>
            Download PDF
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default WeeklyReport;
