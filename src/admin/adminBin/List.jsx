import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import BinList from "./BinList";
import BinTypeList from "./BinTypesList";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

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

export default function List() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    // Check if there's a stored tab index in localStorage and set it as the initial active tab index
    const storedTabIndex = localStorage.getItem("activeTabIndex");
    if (storedTabIndex !== null) {
      setValue(parseInt(storedTabIndex));
    }
  }, []);

  const handleChange = (event, newValue) => {
    // Update active tab index in state and store it in localStorage
    setValue(newValue);
    localStorage.setItem("activeTabIndex", newValue);
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
              <Tab label="Bin Details" {...a11yProps(0)} />
              <Tab label="Bin Types" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <BinList />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <BinTypeList />
          </CustomTabPanel>
        </Box>
      </CardContent>
    </Card>
  );
}
