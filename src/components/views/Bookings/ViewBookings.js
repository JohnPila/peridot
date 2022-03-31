import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllBookings, getAllBookingsByCurrentUser } from "../../../services/BookingsService";
import withLoggedUser from "../../hocs/withLoggedUser";
import ViewBookingsItem from "./ViewBookingsItem";

function ViewBookings(props) {
  const {
    isAdmin,
  } = props;
  const [bookings, setBookings] = useState(null);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    (isAdmin ? getAllBookings() : getAllBookingsByCurrentUser()).then(setBookings);
  }, []);

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
      >
        {bookings ? 
          bookings.map(booking => (
          <Grid item md={6} sm={12} xs={12} key={booking.id}>
            <ViewBookingsItem data={booking} />
          </Grid>
          )) :
          <></>
        }
      </Grid>
    </>
  ); 
}

export default withLoggedUser(ViewBookings);