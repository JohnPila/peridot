import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { LocalizationProvider, StaticDatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';
import { FormHelperText, Skeleton } from '@mui/material';
import Typography from './Typography';
import { formatDate } from '../../utils/HelperUtils';
import { getAllBookingsByPackageAndDateRange } from '../../services/BookingsService';

const AvailabilityLayout = styled('div')(({ theme }) => ({
  "> div > div, > div > div > div, .MuiCalendarPicker-root": {
    width: "100%",
    maxWidth: "100%",
  },
  ".MuiCalendarPicker-viewTransitionContainer > div > div > span, [role=\"cell\"]": {
    flexBasis: "auto",
    flexGrow: 1,
    textAlign: "center",
  },
  ".loader": {
    width: "20%",
  },
  ".loader > span": {
    width: "100%",
  },
}));

function AvailabilityCalendar(props) {
  const {
    packageId,
    value,
    onChange = () => {},
    error,
    datePickerProps,
    ...otherProps
  } = props;

  const [isDisabled, setIsDisabled] = useState(!!packageId);
  const [isLoading, setIsLoading] = useState(!!packageId);
  const [bookings, setBookings] = useState([]);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (packageId) {
      const today = new Date();
      const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
      const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      getAllBookingsByPackageAndDateRange(packageId, firstDay, lastDay)
        .then(setBookings)
        .finally(() => {
          setIsLoading(false);
          setIsDisabled(false);
        });
    }
  }, [packageId]);

  return (
    <AvailabilityLayout {...otherProps}>
      {isLoading ? 
        <Skeleton 
          animation="wave" 
          height={40} width="50%" 
          sx={{position: "relative", top: "-9px"}} /> :
        <Typography variant="h6" sx={{fontSize: 20, lineHeight: 0.7}}>
          Check availability
        </Typography>
      }
      {isLoading ? 
        <Skeleton 
          animation="wave" 
          height={300} width="100%" 
          variant="rectangular" /> :
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <StaticDatePicker
            loading={isDisabled}
            disabled={isDisabled}
            renderLoading={() => (
              <div className="loader">
                <CircularProgress disableShrink size="small" color="secondary"/>
              </div>
            )}
            value={value}
            onChange={onChange}
            shouldDisableDate={(date) => {
              return bookings.some(booking => 
                date.getDate() === booking.date.toDate().getDate());
            }}
            displayStaticWrapperAs="desktop"
            {...datePickerProps}
          />
        </LocalizationProvider>
      }
      {isLoading ? 
        <Skeleton animation="wave" height={30} width="40%" sx={{mt: 2}} /> :
        <Typography variant="body1">
          Booking date: {formatDate(value) || "N/A"}
        </Typography>
      }
      {error && 
        <FormHelperText error>
          {error}
        </FormHelperText> 
      }
    </AvailabilityLayout>
  );
}

AvailabilityCalendar.propTypes = {
  packageId: PropTypes.string,
  value: PropTypes.object,
  onChange: PropTypes.func,
  error: PropTypes.string,
  datePickerProps: PropTypes.object,
}

export default AvailabilityCalendar;