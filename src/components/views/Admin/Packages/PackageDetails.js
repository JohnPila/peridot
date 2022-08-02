import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import PackageDetailsLeftContent from "./PackageDetailsLeftContent";
import PackageDetailsRightContent from "./PackageDetailsRightContent";

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
    </Grid>
  );
}

export default PackageDetails;