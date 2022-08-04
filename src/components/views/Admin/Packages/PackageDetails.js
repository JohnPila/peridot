import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import withLoggedUser from "../../../hocs/withLoggedUser";
import PackageDetailsLeftContent from "./PackageDetailsLeftContent";
import PackageDetailsRightContent from "./PackageDetailsRightContent";  

function PackageDetails(props) {
  const {isAdmin} = props;
  const {id: packageId} = useParams();

  return (
    <Grid container>
      <PackageDetailsLeftContent 
        packageId={packageId} 
        containerProps={{xs: isAdmin ? 12 : 7}}
      />
      {!isAdmin && 
        <PackageDetailsRightContent 
          packageId={packageId} 
        />
      }
    </Grid>
  );
}

export default withLoggedUser(PackageDetails);