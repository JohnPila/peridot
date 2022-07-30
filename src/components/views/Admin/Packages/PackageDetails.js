import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import PackageDetailsLeftContent from "./PackageDetailsLeftContent";
import PackageDetailsRightContent from "./PackageDetailsRightContent";
import Feedback from "./Feedback";

function PackageDetails() {
  const {id: packageId} = useParams();

  return (
    <Grid container>
      <PackageDetailsLeftContent 
        packageId={packageId} 
      />
      <PackageDetailsRightContent 
        packageId={packageId} 
      />
      <Feedback/>
    </Grid>
  );
}

export default PackageDetails;