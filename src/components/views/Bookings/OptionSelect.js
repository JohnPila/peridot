import * as React from "react";
import { Box } from "@mui/system";
import { InputLabel } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function OptionsSelect() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{width: "100%", mt: 1}}>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel >Status</InputLabel>
        <Select
         
         
          value={age}
          label="Status"
          onChange={handleChange}
        >
          <MenuItem value={10}>Cancelled</MenuItem>
          <MenuItem value={20}>Paid</MenuItem>
          <MenuItem value={30}>Complete</MenuItem>
          <MenuItem value={40}>Verfication</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}