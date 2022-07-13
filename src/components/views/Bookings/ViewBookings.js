import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import Typography from "../../common/Typography";
import ViewBookingsAirportTransfer from "./ViewBookingsAirportTransfer";
import ViewBookingsPackage from "./ViewBookingsPackage";

function TabPanel(props) {
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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function ViewBookings(props) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Tour Packages" {...a11yProps(0)} />
          <Tab label="Airport Transfer" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ViewBookingsPackage />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ViewBookingsAirportTransfer />
      </TabPanel>
    </>
  ); 
}

export default ViewBookings;