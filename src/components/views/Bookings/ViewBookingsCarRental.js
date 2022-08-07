import { Grid } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { getAllBookings, getAllBookingsByCurrentUser } from "../../../services/BookingsService";
import { BOOKING_TYPE } from "../../../utils/constants";
import { combineDateTime } from "../../../utils/HelperUtils";
import Typography from "../../common/Typography";
import withLoggedUser from "../../hocs/withLoggedUser";
import ViewBookingCarRentalItem from "./ViewBookingCarRentalItem";

function ViewBookingsCarRental(props) {
  const {
    isAdmin,
    filter,
  } = props;
  
  const [bookings, setBookings] = useState(null);
  const filteredBookings = useMemo(() => {
    if (!bookings) {
      return null;
    }
    let filteredBookings = bookings;
    if (filter.status !== -1) {
      filteredBookings = filteredBookings?.filter(b => b.status === filter.status);
    }
    if (filter.date !== -1) {
      const nowTime = +new Date();
      filteredBookings = filteredBookings?.filter(b => {
        const date = b.pickupDate.toDate();
        const time = b.pickupTime.toDate();
        const pickupDateTime = combineDateTime(date, time);
        return filter.date === 1 ? pickupDateTime >= nowTime : pickupDateTime < nowTime;
      });
    }
    return filteredBookings;
  }, [bookings, filter]);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    (isAdmin ? getAllBookings(BOOKING_TYPE.CAR_RENTAL) : 
      getAllBookingsByCurrentUser(BOOKING_TYPE.CAR_RENTAL)).then(setBookings);
  }, []);

  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      spacing={2}
    >
      {filteredBookings ? 
        filteredBookings.length > 0 ?
          filteredBookings.map(booking => (
          <Grid item md={6} sm={12} xs={12} key={booking.id}>
            <ViewBookingCarRentalItem data={booking} />
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

export default withLoggedUser(ViewBookingsCarRental);