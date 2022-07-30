import { Grid } from "@mui/material";
import { useState } from "react";
import AvailabilityCalendar from "../../../common/AvailabilityCalendar";
import FormButton from "../../../common/form/FormButton";
import PackageDetailsOptions from "./PackageDetailsOptions";
import PropTypes from 'prop-types';
import withDialog from "../../../hocs/withDialog";
import withLoggedUser from "../../../hocs/withLoggedUser";
import { createSearchParams, useNavigate } from "react-router-dom";
import { BOOKING_TYPE } from "../../../../utils/constants";


function PackageDetailsRightContent(props) {
  const {
    packageId,
    isLoggedIn,
    isEmailVerified,
    confirmDialog,
  } = props;
  
  const navigate = useNavigate();
  const [bookingDate, setBookingDate] = useState(null);
  const [packageOption, setPackageOption] = useState(null);
  const [error, setError] = useState({
    bookingDate: "",
    packageOption: "",
  });
  
  const bookNow = () => {
    if (isValid()) {
      // book now...
      if (isLoggedIn && !isEmailVerified) {
        confirmDialog("Email not verified", "Your email is not verified yet. Do you still want to proceed with your booking?", (ok) => {
          if (ok) {
            goToBookPage();
          }
        });
      } else if (!isLoggedIn) {
        confirmDialog("You are not signed in", "You need to sign in first before you can make a booking. Go to sign in page?", (ok) => {
          if (ok) {
            goToSignInPage();
          }
        });
      } else {
        goToBookPage();
      }
    }
  };

  const goToSignInPage = () => {
    navigate({
      pathname: "/sign-in",
      search: `?${createSearchParams({redirectTo: "/packages/" + packageId})}`
    });
  }

  const goToBookPage = () => {
    navigate("book", {
      state: {
        type: BOOKING_TYPE.PACKAGE,
        data: {
          bookingDate, 
          packageOption: {
            id: packageOption.id,
            options: packageOption.options.map((opt) => ({
              id: opt.id,
              quantity: opt.quantity,
            })),
          },
        },
      },
    });
  };

  const isValid = () => {
    const errMsg = {};
    if (!bookingDate) {
      errMsg.bookingDate = "Booking date is required.";
    }
    if (!packageOption) {
      errMsg.packageOption = "Package option(s) is required.";
    }
    if (Object.keys(errMsg).length > 0) {
      setError(errMsg);
      return false;
    }
    return true;
  };
  
  const setValue = (field, value) => {
    switch (field) {
      case "bookingDate":
        setBookingDate(value);
        setError((err) => ({...err, bookingDate: ""}));
        break;
      case "packageOption":
        setPackageOption(value);
        setError((err) => ({...err, packageOption: ""}));
        break;
      default:
        break;
    }
  };

  return (
    <Grid item xs={5} paddingLeft={2}>
      <AvailabilityCalendar 
        packageId={packageId} 
        value={bookingDate} 
        error={error.bookingDate}
        onChange={(v) => setValue("bookingDate", v)} 
        datePickerProps={{
          minDate: new Date(),
        }}
      />
      <PackageDetailsOptions 
        packageId={packageId} 
        error={error.packageOption}
        onSelect={(v) => setValue("packageOption", v)} 
      />
      <br/>
      <FormButton
        sx={{width: "100%"}}
        aria-label="book"
        color="secondary"
        onClick={bookNow}
      >
        Book Now
      </FormButton>
    </Grid>
   
  );
}

PackageDetailsRightContent.propTypes = {
  packageId: PropTypes.string.isRequired,
};

export default withLoggedUser(withDialog(PackageDetailsRightContent));