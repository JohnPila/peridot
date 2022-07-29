import { Grid } from "@mui/material";
import Typography from "../../../common/Typography";
import withLoggedUser from "../../../hocs/withLoggedUser";
import { makeStyles } from "@mui/styles";
import AddIcon from '@mui/icons-material/Add';
import Button from "../../../common/Button";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { listenAllCars } from "../../../../services/CarRentalService";
import AllCarBookingItem from "./AllCarBookingItem";

const useStyles = makeStyles(theme => ({
  typo: {
    flexGrow: 1,
    textAlign: "center",
    marginBottom: 15,
  }
}));

function ViewCarRentals(props) {
  const {isAdmin} = props;
  const classes = useStyles();
  
  const unsubscribeRef = useRef(null);
  const [cars, setCars] = useState(null);
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    getAllCars();
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, []);
  
  const getAllCars = async () => {
    unsubscribeRef.current = await listenAllCars(isAdmin, setCars);
  };

	return (
    <>
      <Typography variant="h2"className={classes.typo}>Car Rentals</Typography>
      {isAdmin && 
        <Button component={Link} color="warning" sx={{mb: 2}} variant="contained" to="/admin/car-rentals/add">
          <AddIcon sx={{mr: 1}}/> Add new car
        </Button>
      }
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
      >
        {cars ? cars.map((data) => (
          <AllCarBookingItem data={data} key={data.id} />
        )) : <>...</>}
      </Grid>
    </>
	);
}

export default withLoggedUser(ViewCarRentals);