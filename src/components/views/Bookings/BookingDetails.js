import { Card, CardContent, CardMedia, Divider, Grid, Skeleton, Stack } from "@mui/material";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GCashConfig from "../../../config/GCashConfig";
import { getBooking, listenForBookingChanges, saveBooking } from "../../../services/BookingsService";
import { getPaymentDetailsByBooking } from "../../../services/PaymentDetailsService";
import { BOOKING_STATUS, BOOKING_STATUS_LABEL, DIALOG_TYPE_VARIANT, PAYMENT_METHOD, PAYMENT_METHOD_LABEL, STORAGE_FOLDERS } from "../../../utils/constants";
import FormButton from "../../common/form/FormButton";
import Typography from "../../common/Typography";
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import { getImages } from "../../../services/FileService";
import { getPackage } from "../../../services/PackageService";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { formatDate, formatDateTime } from "../../../utils/HelperUtils";
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import withLoggedUser from "../../hocs/withLoggedUser";
import withDialog from "../../hocs/withDialog";

export function BookingDetails(props) {
  const {
    isAdmin,
    confirmDialog,
  } = props;
  const {id: bookingId} = useParams();
  const navigate = useNavigate();

  const bookingSubscribeRef = useRef(null);
  const [data, setData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const subTotal = useMemo(() => data && data.packageOptions
    .reduce((acc, opt) => acc + (opt.quantity * opt.price), 0), [data]);
  const fee = useMemo(() => {
    if (!data) {
      return 0;
    }
    switch (data.paymentDetails.method) {
      case PAYMENT_METHOD.GCASH:
        return GCashConfig.fee;
      default:
        return 0;
    }
  }, [data]);
  const status = useMemo(() => {
    if (!data) {
      return null;
    }
    let color = "text.secondary";
    let sx = {fontSize: 35, position: "relative", top: "5px"}
    let icon;
    switch (data.status) {
      case BOOKING_STATUS.PAID:
        color = "green";
        icon = <CheckCircleIcon sx={sx}/>;
        break;
      case BOOKING_STATUS.DECLINED:
      case BOOKING_STATUS.CANCELLED:
      case BOOKING_STATUS.PAYMENT_FAILED:
        color = BOOKING_STATUS.CANCELLED === data.status ? 
          "text.secondary" : "error";
        icon = BOOKING_STATUS.DECLINED === data.status ? 
          <DoNotDisturbAltIcon sx={sx}/> : <CancelIcon sx={sx}/>;
        break;
      case BOOKING_STATUS.PAYMENT_VERIFICATION:
        color = "orange";
        icon = <HourglassTopIcon sx={sx}/>;
        break;
      case BOOKING_STATUS.PENDING_PAYMENT:
        color = "text.secondary";
        icon = <PendingActionsIcon sx={sx}/>;
        break;
      case BOOKING_STATUS.PENDING_CANCELLATION:
        color = "orange";
        icon = <PendingActionsIcon sx={sx}/>;
        break;
      default:
        break;
    }
    return (
      <div style={{ display: "flex", flex: 1, alignItems: "self-end" }}>
        <Typography variant="h4" color={color}>
          {icon} {BOOKING_STATUS_LABEL[data.status]}
        </Typography>
      </div>
    )
  }, [data]);
  const statusDate = useMemo(() => {
    if (!data) {
      return null;
    }
    switch (data.status) {
      case BOOKING_STATUS.PAID:
        return {
          name: "Paid date",
          key: "paidDate",
        };
      case BOOKING_STATUS.DECLINED:
        return {
          name: "Declined date",
          key: "declinedDate",
        };
      case BOOKING_STATUS.CANCELLED:
        return {
          name: "Cancelled date",
          key: "cancelledDate",
        };
      default:
        return null;
    }
  }, [data]);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    getBooking(bookingId).then(async (d) => {
      d.packageDetails = await getPackage(d.package);
      const images = await getImages(d.packageDetails.id, STORAGE_FOLDERS.PACKAGES);
      d.thumbnail = images?.[0] || {
        url: "/images/peridotLogo.jpg",
        name: "Default image",
      };
      d.paymentDetails = await getPaymentDetailsByBooking(bookingId);
      setData(d);
      bookingSubscribeRef.current = listenForBookingChanges(bookingId, (changedData) => {
        setData((currData) => ({...currData, ...changedData}));
      });
    })
    .catch(() => navigate("/errors/404", {replace: true}));
    return () => {
      if (bookingSubscribeRef.current) {
        bookingSubscribeRef.current();
      }
    };
  }, []);

  const handlePay = () => {
    switch (data.paymentDetails.method) {
      case PAYMENT_METHOD.GCASH:
        window.open(
          data.paymentDetails.request.data.checkouturl,
          "_blank",
        );
        break;
      default:
        break;
    }
  };

  const handleCancellation = () => {
    confirmDialog("Cancel booking", "Do you really want to cancel your booking?", async (ok) => {
      if (ok) {
        try {
          setIsSaving(true);
          await saveBooking(bookingId, {
            status: BOOKING_STATUS.PAID === data.status ? 
              BOOKING_STATUS.PENDING_CANCELLATION :
              BOOKING_STATUS.CANCELLED,
          });
        } catch (error) {
          console.error("Failed to cancel booking.", error);
        } finally {
          setIsSaving(false);
        }
      }
    }, {
      variant: DIALOG_TYPE_VARIANT.WARNING,
      closeButtonTitle: "Close",
      confirmButtonTitle: "Cancel",
    });
  };

  const handleConfirmCancellation = () => {
    confirmDialog("Confirm cancellation", "Do you really want to confirm the booking cancellation?", async (ok) => {
      if (ok) {
        try {
          setIsSaving(true);
          await saveBooking(bookingId, {
            status: BOOKING_STATUS.CANCELLED,
          });
        } catch (error) {
          console.error("Failed to confirm booking cancellation.", error);
        } finally {
          setIsSaving(false);
        }
      }
    }, {
      variant: DIALOG_TYPE_VARIANT.WARNING,
      closeButtonTitle: "Cancel",
      confirmButtonTitle: "Confirm",
    });
  }

  const handleVerifyPayment = () => {
    let subText;
    switch (data.paymentDetails.method) {
      case PAYMENT_METHOD.GCASH:
        subText = `You can also check the payment status <a href="${data.paymentDetails.request.data.checkouturl}" target="_blank">here</a>.`;
        break;
      default:
        break;
    }
    confirmDialog("Verify payment", "Have you already verify the payment? " + subText, async (ok) => {
      if (ok) {
        try {
          setIsSaving(true);
          // TODO: show dialog to input payment details manually
          await saveBooking(bookingId, {
            status: BOOKING_STATUS.PAID,
          });
        } catch (error) {
          console.error("Failed to verify payment.", error);
        } finally {
          setIsSaving(false);
        }
      }
    }, {
      variant: DIALOG_TYPE_VARIANT.SUCCESS,
      closeButtonTitle: "Cancel",
      confirmButtonTitle: "Verify",
    });
  };

	return (
		<Grid container spacing={2}>
			<Grid item md={8} sm={12} xs={12}>
        <Stack spacing={2}>
          <Card variant="outlined">
            <CardContent>
              {data ? 
                <>
                  {status}
                  {statusDate && data[statusDate.key] &&
                    <Grid container color="text.secondary" sx={{mt: 1}}>
                      <Grid item>
                        <Typography variant="body2">{statusDate.name}</Typography>
                      </Grid>
                      <Grid item xs textAlign="right">
                        <Typography variant="body2">{formatDateTime(data[statusDate.key].toDate())}</Typography>
                      </Grid>
                    </Grid>
                  }
                </> : 
                <Skeleton animation="wave" width="80%" sx={{ height: 50 }} />
              }
              <Divider sx={{my: 2}}/>
              <Grid container spacing={2}>
                <Grid item>
                  {data ? 
                    <CardMedia
                      component="img"
                      sx={{ width: 120, height: 120, borderRadius: 2 }}
                      image={data.thumbnail.url}
                      alt={data.thumbnail.name}
                    /> :
                    <Skeleton sx={{ width: 120, height: 120 }} animation="wave" variant="rectangular" />
                  }
                </Grid>
                <Grid item xs>
                  {data ? 
                    <>
                      <Typography variant="body1">{data.packageDetails.name}</Typography>
                      <Typography variant="body2">
                        {data.packageDetails.barangay.label}, {data.packageDetails.city.label} <LocationOnIcon 
                          fontSize="small" color="error" sx={{position: "relative", bottom: -2}}/>
                      </Typography>
                    </> :
                    <>
                      <Skeleton animation="wave" width="80%" sx={{ height: 30 }} />
                      <Skeleton animation="wave" width="60%" sx={{ height: 30 }} />
                    </>
                  }
                </Grid>
              </Grid>
              <Divider sx={{my: 2}}/>
              <Grid container>
                <Grid item xs={2} color="text.secondary">
                  {data ? 
                    <Typography variant="body2">Booking date</Typography> :
                    <Skeleton animation="wave" width="100%" />  
                  }
                </Grid>
                <Grid item xs={10} textAlign="right">
                  {data ? 
                    <Typography variant="body2">{formatDate(data.date.toDate())}</Typography> :
                    <Skeleton animation="wave" width="30%" sx={{ marginLeft: "auto" }} />  
                  }
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Card variant="outlined">
            <CardContent>
              {data ? 
                <Typography variant="h6">Personal Info</Typography> :
                <Skeleton animation="wave" width="30%" sx={{ height: 30 }} />  
              }
              <Divider sx={{my: 2}}/>
              <Grid container>
                <Grid item xs={2}>
                  {data ? 
                    <Typography variant="body2" color="text.secondary">Full name</Typography> :
                    <Skeleton animation="wave" width="100%" />  
                  }
                </Grid>
                <Grid item xs textAlign="right">
                  {data ? 
                    <Typography variant="body2">{data.fullName}</Typography> :
                    <Skeleton animation="wave" width="60%" sx={{ marginLeft: "auto" }} />  
                  }
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={2}>
                  {data ? 
                    <Typography variant="body2" color="text.secondary">Phone number</Typography> :
                    <Skeleton animation="wave" width="100%" />  
                  }
                </Grid>
                <Grid item xs textAlign="right">
                  {data ? 
                    <Typography variant="body2">+63{data.phoneNumber}</Typography> :
                    <Skeleton animation="wave" width="40%" sx={{ marginLeft: "auto" }} />  
                  }
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={2}>
                  {data ? 
                    <Typography variant="body2" color="text.secondary">Address</Typography> :
                    <Skeleton animation="wave" width="100%" />  
                  }
                </Grid>
                <Grid item xs textAlign="right">
                  {data ? 
                    <Typography variant="body2">{data.address}</Typography> :
                    <Skeleton animation="wave" width="80%" sx={{ marginLeft: "auto" }} />  
                  }
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Card variant="outlined">
            <CardContent>
              {data ? 
                <Typography variant="h6">Additional Info</Typography> :
                <Skeleton animation="wave" width="30%" sx={{ height: 30 }} />  
              }
              <Divider sx={{my: 2}}/>
              <Grid container>
                <Grid item xs={2}>
                  {data ? 
                    <Typography variant="body2" color="text.secondary">Special requests</Typography> :
                    <Skeleton animation="wave" width="100%" />  
                  }
                </Grid>
                <Grid item xs textAlign="right">
                  {data ? 
                    <Typography variant="body2">{data.specialRequests}</Typography> :
                    <Skeleton animation="wave" width="70%" sx={{ marginLeft: "auto" }} />  
                  }
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Stack>
			</Grid>
			<Grid item md={4} sm={12} xs={12}>
				<Card variant="outlined">
          <CardContent>
            {data ? 
              <Typography variant="h6">Payment Summary</Typography> :
              <Skeleton animation="wave" width="60%" sx={{ height: 30 }} />  
            }
            <Divider sx={{my: 2}}/>
            <Grid container color="text.secondary">
              <Grid item xs>
                {data ? 
                  <Typography variant="body2">Payment method</Typography> :
                  <Skeleton animation="wave" width="70%" />  
                }
              </Grid>
              <Grid item xs textAlign="right">
                {data ? 
                  <Typography variant="body2">{PAYMENT_METHOD_LABEL[data.paymentDetails.method]}</Typography> :
                  <Skeleton animation="wave" width="70%" sx={{ marginLeft: "auto" }} />  
                }
              </Grid>
            </Grid>
            <Divider sx={{my: 2}}/>
            <Grid container color="text.secondary">
              {data && data.packageOptions.map((opt, i) => (
                <Fragment key={i}>
                  <Grid item xs={6} textAlign="left">
                    <Typography variant="body2">{opt.name}</Typography>
                  </Grid>
                  <Grid item xs={4} textAlign="right">
                    <Typography variant="body2">x {opt.quantity} (₱{opt.price})</Typography>
                  </Grid>
                  <Grid item xs={2} textAlign="right">
                    <Typography variant="body2">₱{opt.quantity * opt.price}</Typography>
                  </Grid>
                </Fragment>
              ))}
              {!data && 
                <>
                  <Grid item xs={6} textAlign="left">
                    <Skeleton animation="wave" width="80%" />  
                  </Grid>
                  <Grid item xs={4} textAlign="right">
                    <Skeleton animation="wave" width="70%" sx={{ marginLeft: "auto", marginRight: 1 }} />  
                  </Grid>
                  <Grid item xs={2} textAlign="right">
                    <Skeleton animation="wave" width="100%" sx={{ marginLeft: "auto" }} />  
                  </Grid>
                </>
              }
            </Grid>
            <Divider sx={{my: 2}}/>
            <Grid container color="text.secondary">
              <Grid item xs={4}>
                {data ? 
                  <Typography variant="body2">Sub total</Typography> :
                  <Skeleton animation="wave" width="100%" />    
                }
              </Grid>
              <Grid item xs={8} textAlign="right">
                {data ? 
                  <Typography variant="body2">₱{subTotal}</Typography> :
                  <Skeleton animation="wave" width="30%" sx={{ marginLeft: "auto" }} />    
                }
              </Grid>
              <Grid item xs={4}>
                {data ? 
                  <Typography variant="body2">Fee</Typography> :
                  <Skeleton animation="wave" width="100%" />    
                }
              </Grid>
              <Grid item xs={8} textAlign="right">
                {data ? 
                  <Typography variant="body2">₱{fee}</Typography> :
                  <Skeleton animation="wave" width="30%" sx={{ marginLeft: "auto" }} />    
                }
              </Grid>
            </Grid>
            <Divider sx={{my: 2}}/>
            <Grid container>
              <Grid item xs={4}>
                {data ? 
                  <Typography variant="body1">Total</Typography> :
                  <Skeleton animation="wave" width="100%" sx={{ height: 30 }} />    
                }
              </Grid>
              <Grid item xs={8} textAlign="right">
                {data ? 
                  <Typography variant="body1">₱{subTotal + fee}</Typography> :
                  <Skeleton animation="wave" width="40%" sx={{ height: 30, marginLeft: "auto" }} />    
                }
              </Grid>
            </Grid>
            {data && 
              <>
                {isAdmin ?
                  <>
                    {BOOKING_STATUS.PAYMENT_VERIFICATION === data.status && 
                      <FormButton sx={{width: "100%", mt: 1, color: "white"}} color="success" 
                        onClick={handleVerifyPayment} disabled={isSaving}>
                        Verify Payment
                      </FormButton>
                    }
                    {BOOKING_STATUS.PENDING_CANCELLATION === data.status &&
                      <FormButton sx={{width: "100%", mt: 1}} color="warning" 
                        onClick={handleConfirmCancellation} disabled={isSaving}>
                        Confirm Cancellation
                      </FormButton>
                    }
                  </> :
                  <>
                    {BOOKING_STATUS.PENDING_PAYMENT === data.status &&
                      <FormButton sx={{width: "100%", mt: 2}} color="secondary" 
                        onClick={handlePay} disabled={isSaving}>
                        Pay Now
                      </FormButton>
                    }
                    {![BOOKING_STATUS.CANCELLED, 
                      BOOKING_STATUS.DECLINED, 
                      BOOKING_STATUS.PENDING_CANCELLATION].includes(data.status) &&
                      <FormButton sx={{width: "100%", mt: 1}} color="warning" 
                        onClick={handleCancellation} disabled={isSaving}>
                        Cancel Booking
                      </FormButton>
                    }
                  </>
                }
              </>
            }
          </CardContent>
				</Card>
			</Grid>
		</Grid>
	);
}

export default withDialog(withLoggedUser(BookingDetails));