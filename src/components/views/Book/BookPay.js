import { Box, Divider, FormControlLabel, FormHelperText, Grid, Radio, RadioGroup } from '@mui/material';
import PropTypes from 'prop-types';
import AppForm from '../../common/AppForm';
import FormButton from '../../common/form/FormButton';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import CheckIcon from '@mui/icons-material/Check';
import Typography from '../../common/Typography';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { getPackage } from '../../../services/PackageService';
import { getPackageOption } from '../../../services/PackageOptionService';
import PackageDetailsOptionSkeleton from '../Admin/Packages/PackageDetailsOptionSkeleton';
import withLoggedUser from '../../hocs/withLoggedUser';
import { BOOKING_STATUS, BOOKING_TYPE, PAYMENT_METHOD, PAYMENT_METHOD_LABEL } from '../../../utils/constants';
import GCashConfig from '../../../config/GCashConfig';
import { addPaymentDetailsForCashUsingBatch, addPaymentDetailsForGCashUsingBatch, waitForPaymentTransaction } from '../../../services/PaymentDetailsService';
import { addBooking, saveBooking } from '../../../services/BookingsService';
import InfoIcon from '@mui/icons-material/Info';
import GeoapifyConfig from '../../../config/GeoapifyConfig';
import { toLonLatArray } from '../../common/MapRoute';
import { getRoute } from '../../../services/LocationService';

function BookPay(props) {
  const {
    loggedUser,
    info,
    type,
    data: stateData,
    isWaiting = false,
    setIsWaiting,
    onPrevious,
    onNext,
  } = props;

  const navigate = useNavigate();
  const unsubscribeRef = useRef(null);
  const [data, setData] = useState(null);
  const [totalCost, setTotalCost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHOD.GCASH);
  const [bookingId, setBookingId] = useState(null);
  const [paymentLink, setPaymentLink] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    getData();
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, []);

  const getInitialPaymentStatus = () => {
    switch (paymentMethod) {
      case PAYMENT_METHOD.CASH:
        return BOOKING_STATUS.CASH_PAYMENT;
      case PAYMENT_METHOD.GCASH:
      default:
        return BOOKING_STATUS.PENDING_PAYMENT;
    }
  };

  const getData = async () => {
    switch (type) {
      case BOOKING_TYPE.PACKAGE: {
        const {
          packageId,
          packageOption,
        } = stateData;
        getPackage(packageId).then(async (d) => {
          try {
            const packageOpt = await getPackageOption(packageOption.id);
            const options = [];
            if (!packageOpt.hasSubOptions) {
              options.push({
                id: packageOption.id,
                name: packageOpt.name,
                price: packageOpt.price,
                quantity: packageOption.options[0].quantity,
              });
            } else {
              for (const opt of packageOption.options) {
                const subPackageOpt = await getPackageOption(opt.id);
                options.push({
                  id: opt.id,
                  name: subPackageOpt.name,
                  price: subPackageOpt.price,
                  quantity: opt.quantity,
                });
              }
            }
            packageOpt.options = options;
            setData(packageOpt);
            setTotalCost(options.reduce((acc, opt) => acc + (opt.quantity * opt.price), 0));
          } catch (error) {
            console.error("Failed to get booking info.", error);
          }
        }).catch(() => navigate("/errors/404", {replace: true}));
      }
      break;
      case BOOKING_TYPE.AIRPORT_TRANSFER: {
        const {
          pickupLocation,
          dropoffLocation,
        } = stateData;
        const routeData = await getRoute(toLonLatArray(pickupLocation), toLonLatArray(dropoffLocation));
        setData({
          dropoffLocation,
          routeData,
        });
        setTotalCost(GeoapifyConfig.computeCost(
          routeData.features[0].properties.distance));
      }
      break;
    }
  };

  const handlePay = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      switch (type) {
        case BOOKING_TYPE.PACKAGE:
          await handlePayPackage();
          break;
        case BOOKING_TYPE.AIRPORT_TRANSFER:
          await handlePayAirportTransfer();
          break;
      }
    } catch (error) {
      console.error("Failed to save booking and pay!", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayPackage = async () => {
    const {
      packageId,
      bookingDate,
    } = stateData;
    const {booking, paymentDetails, otherData} = await addBooking(type, {
      packageId,
      date: bookingDate,
      fullName: `${info.firstName} ${info.lastName}`,
      address: info.address,
      phoneNumber: info.phoneNumber,
      specialRequests: info.specialRequests,
      status: getInitialPaymentStatus(),
      packageOptions: data.options,
    }, startPayment);
    setBookingId(booking.id);
    handlePostBooking(booking.id, paymentDetails.id, otherData);
  };

  const handlePayAirportTransfer = async () => {
    const {
      pickupDate,
      pickupTime,
      pickupLocation,
      dropoffLocation,
    } = stateData;
    const {booking, paymentDetails, otherData} = await addBooking(type, {
      fullName: `${info.firstName} ${info.lastName}`,
      address: info.address,
      phoneNumber: info.phoneNumber,
      specialRequests: info.specialRequests,
      status: getInitialPaymentStatus(),
      pickupDate,
      pickupTime,
      pickupLocation: pickupLocation.properties.place_id,
      dropoffLocation: dropoffLocation.properties.place_id,
    }, startPayment);
    setBookingId(booking.id);
    handlePostBooking(booking.id, paymentDetails.id, otherData);
  };

  const startPayment = async (batch, bookingRef) => {
    switch (paymentMethod) {
      case PAYMENT_METHOD.GCASH: {
        let description;
        switch (type) {
          case BOOKING_TYPE.PACKAGE:
            description = `Payment for "${data.name}" package.`;
            break;
          case BOOKING_TYPE.AIRPORT_TRANSFER:
            description = `Payment for airport transfer to "${data.dropoffLocation.properties.formatted}".`;
            break;
        }
        const addData = {
          description,
          customername: `${info.firstName} ${info.lastName}`,
          customermobile: info.phoneNumber,
          customeremail: loggedUser.email,
          fee: totalCost * GCashConfig.fee,
          merchantname: "Peridot 4Ever Travel and Tours Inc.",
          merchantlogourl: "https://scontent.fceb2-2.fna.fbcdn.net/v/t1.6435-9/51249905_2253490094906677_1858257204507836416_n.jpg?stp=cp0_dst-jpg_e15_fr_q65&_nc_cat=105&ccb=1-5&_nc_sid=85a577&efg=eyJpIjoidCJ9&_nc_ohc=5rev06IJlvAAX-zXfiP&_nc_ht=scontent.fceb2-2.fna&oh=00_AT9Wlv8rpypftDXjRGq9diKMV9_50sb4bgyrvxejeCPIhA&oe=624F95DE",
        };
        return await addPaymentDetailsForGCashUsingBatch(batch, bookingRef, paymentMethod, totalCost, addData);
      }
      case PAYMENT_METHOD.CASH:
        return await addPaymentDetailsForCashUsingBatch(batch, bookingRef, paymentMethod, computeTotal());
      default:
        throw new Error(`Unsupported payment method [${paymentMethod}].`);
    }
  }

  const handlePostBooking = (bookingId, paymentDetailsId, otherData) => {
    switch (paymentMethod) {
      case PAYMENT_METHOD.GCASH:
        waitForPaymentStatus(bookingId, paymentDetailsId);
        window.open(
          otherData.data.checkouturl,
          "_blank",
        );
        setPaymentLink(otherData.data.checkouturl);
        setIsWaiting(true);
        break;
      case PAYMENT_METHOD.CASH:
        onNext({
          id: bookingId,
          method: paymentMethod,
          result: {
            ...otherData,
            status: BOOKING_STATUS.CASH_PAYMENT,
          },
        });
      default:
        break;
    }
  };

  const waitForPaymentStatus = (bookingId, id) => {
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
    }
    unsubscribeRef.current = waitForPaymentTransaction(id, async (details) => {
      if (details.result) {
        if (unsubscribeRef.current) {
          unsubscribeRef.current();
        }
        let result;
        switch (paymentMethod) {
          case PAYMENT_METHOD.GCASH:
            result = GCashConfig.parseResult(details.result);
            break;
          default:
            break;
        }
        result.status = result.success ? BOOKING_STATUS.PAID : 
          BOOKING_STATUS.PAYMENT_FAILED;
        await saveBooking(bookingId, {
          status: result.status,
        });
        onNext({
          id: bookingId,
          method: paymentMethod,
          result,
        });
      }
    });
  };

  const computeTotal = () => {
    switch (paymentMethod) {
      case PAYMENT_METHOD.GCASH:
        return totalCost + (totalCost * GCashConfig.fee);
      default:
        return totalCost;
    }
  };

  const computeFee = () => {
    switch (paymentMethod) {
      case PAYMENT_METHOD.GCASH:
        return totalCost * GCashConfig.fee;
      default:
        return 0;
    }
  }

  const handlePaid = async () => {
    try {
      setIsSaving(true);
      await saveBooking(bookingId, {
        status: BOOKING_STATUS.PAYMENT_VERIFICATION,
      });
      onNext({
        id: bookingId,
        method: paymentMethod,
        result: {
          status: BOOKING_STATUS.PAYMENT_VERIFICATION,
        },
      });
    } catch (error) {
      console.error("Failed to set paid.", error);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    isWaiting ? 
    <Grid container>
      <Grid item xs={12} textAlign="center">
        <InfoIcon sx={{fontSize: 150}} color="info" />
        <Typography variant="h3">Waiting for your payment</Typography>
        <Typography variant="h6" color="text.secondary">
          Kindly pay the amount of <Typography component="big" variant="h6" fontSize={30} sx={{fontWeight: "bold"}} color="secondary">₱{computeTotal()}</Typography> via {PAYMENT_METHOD_LABEL[paymentMethod]}
        </Typography>
        {paymentLink && 
          <Typography variant="body2">
            Or you can also click this <a href={paymentLink} target="_blank" rel="noreferrer">link</a> to pay if you were not redirected automatically.
          </Typography>
        }
        <FormButton
          sx={{ mt: 3, color: "white" }}
          color="success"
          onClick={handlePaid}
          disabled={isSaving}
        >
          Paid
        </FormButton>
      </Grid>
    </Grid> :
    <AppForm containerProps={{maxWidth: "xl"}}>
      <Typography variant="h3" gutterBottom marked="center" align="center">
        Pay
      </Typography>
      <Box component="form" onSubmit={handlePay} noValidate>
        <Typography variant="h4" gutterBottom sx={{ mt: 6 }}>
          Mode of Payment
        </Typography>
        <RadioGroup 
          defaultValue={paymentMethod}
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(parseInt(e.target.value))}>
          <FormControlLabel value={PAYMENT_METHOD.GCASH} control={<Radio color="info"/>} 
            label={PAYMENT_METHOD_LABEL[PAYMENT_METHOD.GCASH]} />
          <FormHelperText sx={{ml: 4, mt: -1.5}}>
            This will include a {GCashConfig.fee * 100}% surcharge fee.
          </FormHelperText>
          <FormControlLabel value={PAYMENT_METHOD.CASH} control={<Radio color="info"/>} 
            label={PAYMENT_METHOD_LABEL[PAYMENT_METHOD.CASH]} />
        </RadioGroup>
        <Divider sx={{mt: 3, mb: 2}}/>
        {null !== totalCost ? 
          <>
            <Grid container>
              <Grid item xs={2}>
                <Typography variant="body1" color="text.secondary">Sub total</Typography>
              </Grid>
              <Grid item xs textAlign="right">
                <Typography variant="body1">₱{totalCost}</Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={2}>
                <Typography variant="body1" color="text.secondary">Surcharge fee</Typography>
              </Grid>
              <Grid item xs textAlign="right">
                <Typography variant="body1">₱{computeFee()}</Typography>
              </Grid>
            </Grid>
            <Grid container mt={1}>
              <Grid item xs={2}>
                <Typography variant="h6">Total</Typography>
              </Grid>
              <Grid item xs textAlign="right">
                <Typography variant="h6">₱{computeTotal()}</Typography>
              </Grid>
            </Grid>
          </> :
          <PackageDetailsOptionSkeleton innerProps={{height: 35}}/>
        }
        <Grid container>
          <Grid item xs>
            <FormButton
              sx={{ mt: 3, mb: 2 }}
              color="primary"
              type="button"
              variant="outlined"
              onClick={onPrevious}
            >
              <NavigateBeforeIcon/> <span style={{marginRight: 15}}>Back</span>
            </FormButton>
          </Grid>
          <Grid item xs textAlign="right">
            <FormButton
              sx={{ mt: 3, mb: 2 }}
              color="secondary"
              disabled={null === totalCost || isLoading}
            >
              <span style={{marginLeft: 15}}>Pay Now</span> <CheckIcon fontSize="small" 
                sx={{mb: 0.3, ml: 0.3}}/>
            </FormButton>
          </Grid>
        </Grid>
      </Box>
    </AppForm>
  );
}

BookPay.propTypes = {
  type: PropTypes.number.isRequired,
  info: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  isWaiting: PropTypes.bool,
  setIsWaiting: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
};

export default withLoggedUser(BookPay);