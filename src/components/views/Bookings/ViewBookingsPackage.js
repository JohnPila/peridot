import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllBookings, getAllBookingsByCurrentUser } from "../../../services/BookingsService";
import Typography from "../../common/Typography";
import withLoggedUser from "../../hocs/withLoggedUser";
import ViewBookingsItem from "./ViewBookingsItem";

function ViewBookingsPackage(props) {
  const {
    isAdmin,
  } = props;
  
  const [bookings, setBookings] = useState(null);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    (isAdmin ? getAllBookings() : getAllBookingsByCurrentUser()).then(setBookings);
  }, []);

  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      spacing={2}
    >
      {bookings ? 
        bookings.length > 0 ?
          bookings.map(booking => (
          <Grid item md={6} sm={12} xs={12} key={booking.id}>
            <ViewBookingsItem data={booking} />
          </Grid>
          )) :
          <Grid container>
            <Grid item xs sx={{textAlign: "center", mt: 3}}>
              <Typography variant="h4">No Bookings Available</Typography>
            </Grid>
          </Grid> :
        <></>
      }
    </Grid>
  );
}

export default withLoggedUser(ViewBookingsPackage);