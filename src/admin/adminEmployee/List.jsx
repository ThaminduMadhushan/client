import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import EmployeeList from "./EmployeeList";
import AdminSalaryParametersList from "./AdminSalaryParametersList";
import SalaryList from "./SalaryList";
import EmployeeInactiveList from "./EmployeeInactiveList";
import PaidSalary from "./PaidSalary";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  // aa
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Card sx={{ minHeight: 84 + "vh" }}>
      <CardContent>
        <Box sx={{ width: "100%", height: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Active Employee List" {...a11yProps(0)} />
              <Tab label="Inactive Employee List" {...a11yProps(1)} />
              <Tab label="Salary Parameters" {...a11yProps(2)} />
              <Tab label="Salary Calculate" {...a11yProps(3)} />
              <Tab label="Paid Salary" {...a11yProps(4)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <EmployeeList />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <EmployeeInactiveList />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <AdminSalaryParametersList />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <SalaryList />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={4}>
            <PaidSalary />
          </CustomTabPanel>
        </Box>
      </CardContent>
    </Card>
  );
}
