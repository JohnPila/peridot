import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Tab, Tabs, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";
import Typography from "../../common/Typography";
import ViewBookingsAirportTransfer from "./ViewBookingsAirportTransfer";
import ViewBookingsPackage from "./ViewBookingsPackage";
import ViewBookingsCarRental from "./ViewBookingsCarRental";
import { BOOKING_STATUS, BOOKING_STATUS_LABEL } from "../../../utils/constants";

const MENU_STATUS = [{value: -1, label: "All"}].concat(Object.values(BOOKING_STATUS).map(s => ({
  value: s,
  label: BOOKING_STATUS_LABEL[s],
})));

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
  const [filter, setFilter] = useState({
    status: -1,
    date: -1,
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Grid container sx={{mb: 2}} spacing={2}>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel id="filter-status">Filter by status</InputLabel>
            <Select
              labelId="filter-status"
              value={filter.status}
              label="Filter by status"
              onChange={(e) => setFilter(f => ({...f, status: parseInt(e.target.value)}))}
            >
              {MENU_STATUS.map(status => (
                <MenuItem value={status.value}>{status.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <ToggleButtonGroup
            value={filter.date}
            exclusive
            onChange={(e, v) => setFilter(f => ({...f, date: v || -1}))}
            aria-label="text alignment"
            color="info"
          >
            <ToggleButton value={1} aria-label="centered" size="large">
              <Typography variant="body1">Upcoming</Typography>
            </ToggleButton>
            <ToggleButton value={2} aria-label="centered" size="large">
              <Typography variant="body1">Completed</Typography>
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Tour Packages" {...a11yProps(0)} />
          <Tab label="Airport Transfer" {...a11yProps(1)} />
          <Tab label="Car Rental" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ViewBookingsPackage filter={filter} /> 
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ViewBookingsAirportTransfer filter={filter} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ViewBookingsCarRental filter={filter} />
      </TabPanel>
    </>
  ); 
}

export default ViewBookings;