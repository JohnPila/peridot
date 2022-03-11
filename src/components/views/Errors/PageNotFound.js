import { Grid } from "@mui/material";
import Typography from "../../common/Typography";

export default function PageNotFound() {
  return (
    <Grid container>
      <Grid item xs textAlign="center">
        <Typography variant="h1">Oops! Page not found!</Typography>
      </Grid>
    </Grid>
  );
}