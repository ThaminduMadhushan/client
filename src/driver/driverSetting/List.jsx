import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import PersonDetails from "./PersonDetails";
import Person from "./Person";

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

export default function List() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Card sx ={{ minHeight: 84 + "vh"  }}>
      <CardContent>
        <Box sx={{ width: "100%",  height : "100%"}}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="User Details" {...a11yProps(0)} />
              <Tab label="Edit Details" {...a11yProps(1)} />    
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Person />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <PersonDetails />
          </CustomTabPanel>
        </Box>
      </CardContent>
    </Card>
  );
}
