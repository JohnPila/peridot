import { Grid } from "@mui/material";
import Button from "../../../common/Button";
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllPackages } from "../../../../services/PackageService";
import ViewPackagesItem from "./ViewPackagesItem";
import ViewPackagesSkeletonItem from "./ViewPackagesSkeletonItem";
import withLoggedUser from "../../../hocs/withLoggedUser";

function ViewPackages(props) {
  const {
    isAdmin,
  } = props;
  const [packages, setPackages] = useState(null);

  useEffect(() => {
    getAllPackages().then(setPackages);
  }, []);

  return (
    <>
      {isAdmin && 
        <Button component={Link} color="warning" sx={{mb: 2}} variant="contained" to="/admin/packages/add">
          <AddIcon sx={{mr: 1}}/> Add new package
        </Button>
      }
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
      >
        {packages ? packages.map((data) => (
          <ViewPackagesItem data={data} key={data.id} />
        )) : <ViewPackagesSkeletonItem/>}
      </Grid>
    </>
  ); 
}

export default withLoggedUser(ViewPackages);