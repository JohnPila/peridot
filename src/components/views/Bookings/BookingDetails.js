import { Card, CardContent, Divider, FormHelperText, Grid, Skeleton, Stack } from "@mui/material";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GCashConfig from "../../../config/GCashConfig";
import { getBooking, listenForBookingChanges, saveBooking } from "../../../services/BookingsService";
import { getPaymentDetailsByBooking } from "../../../services/PaymentDetailsService";
import { BOOKING_STATUS, BOOKING_STATUS_LABEL, BOOKING_TYPE, DIALOG_TYPE_VARIANT, PAYMENT_METHOD, PAYMENT_METHOD_LABEL } from "../../../utils/constants";
import FormButton from "../../common/form/FormButton";
import Typography from "../../common/Typography";
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import { formatDate, formatDateTime, formatTime } from "../../../utils/HelperUtils";
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import withLoggedUser from "../../hocs/withLoggedUser";
import withDialog from "../../hocs/withDialog";
import BookingDetailsPackage from "./BookingDetailsPackage";
import BookingDetailsAirportTransfer from "./BookingDetailsAirportTransfer";
import GeoapifyConfig from "../../../config/GeoapifyConfig";

export function BookingDetails(props) {
  const {
    isAdmin,
    confirmDialog,
  } = props;
  const {id: bookingId} = useParams();
  const navigate = useNavigate();

  const bookingSubscribeRef = useRef(null);
  const [data, setData] = useState(null);
  const [otherData, setOtherData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const subTotal = useMemo(() => {
    if (!data) {
      return 0;
    }

    switch (data.type) {
      case BOOKING_TYPE.PACKAGE:
        return data.packageOptions
          .reduce((acc, opt) => acc + (opt.quantity * opt.price), 0);
      case BOOKING_TYPE.AIRPORT_TRANSFER:
        return (otherData && 
          Math.ceil(otherData.features[0].properties.distance / 1000) * 
          GeoapifyConfig.farePerKilometer + GeoapifyConfig.baseFare) || 0;
      default:
        return 0;
    }
  }, [data, otherData]);
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
    if (!data) {
      getBookingDetails();
    }
    return () => {
      if (bookingSubscribeRef.current) {
        bookingSubscribeRef.current();
      }
    };
  }, []);

  const getBookingDetails = async () => {
    try {
      const d = await getBooking(bookingId);
      d.paymentDetails = await getPaymentDetailsByBooking(bookingId);
      setData(d);
      bookingSubscribeRef.current = listenForBookingChanges(bookingId, (changedData) => {
        setData((currData) => ({...currData, ...changedData}));
      });
    } catch (error) {
      console.error("Failed to get booking details.", error);
      navigate("/errors/404", {replace: true});
    }
  }

  // const handlePay = () => {
  //   switch (data.paymentDetails.method) {
  //     case PAYMENT_METHOD.GCASH:
  //       window.open(
  //         data.paymentDetails.request.data.checkouturl,
  //         "_blank",
  //       );
  //       break;
  //     default:
  //       break;
  //   }
  // };

  const handlePaid = async () => {
    switch (data.paymentDetails.method) {
      case PAYMENT_METHOD.GCASH:
        try {
          setIsSaving(true);
          await saveBooking(bookingId, {
            status: BOOKING_STATUS.PAYMENT_VERIFICATION,
          });
        } catch (error) {
          console.error("Failed to pay booking.", error);
        } finally {
          setIsSaving(false);
        }
        break;
      default:
        break;
    }
  };

  const handleCancellation = () => {
    confirmDialog("Cancel booking", "Do you really want to cancel your booking?", async (ok, reason) => {
      if (ok) {
        try {
          setIsSaving(true);
          await saveBooking(bookingId, {
            status: BOOKING_STATUS.PAID === data.status ? 
              BOOKING_STATUS.PENDING_CANCELLATION :
              BOOKING_STATUS.CANCELLED,
            remarks: reason,
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
      fieldProps: {
        multiline: true,
        placeholder: "What's the reason?",
        maxRows: 5,
      }
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

  const renderSummary = () => {
    switch(data.type) {
      case BOOKING_TYPE.PACKAGE:
        if (!otherData) {
          setOtherData(true);
        }
        return <BookingDetailsPackage data={data} />
      case BOOKING_TYPE.AIRPORT_TRANSFER:
        return <BookingDetailsAirportTransfer data={data} onRouteData={setOtherData} />
      default:
        return null;
    }
  }

  const renderOptions = () => {
    switch(data.type) {
      case BOOKING_TYPE.PACKAGE:
        return data.packageOptions.map((opt, i) => (
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
        ));
      case BOOKING_TYPE.AIRPORT_TRANSFER:
        return (
          <Fragment>
            <Grid item xs={6} textAlign="left">
              <Typography variant="body2">Base fare</Typography>
            </Grid>
            <Grid item xs={6} textAlign="right">
              <Typography variant="body2">₱{GeoapifyConfig.baseFare}</Typography>
            </Grid>
            <Grid item xs={6} textAlign="left">
              <Typography variant="body2">Fare by distance</Typography>
            </Grid>
            <Grid item xs={4} textAlign="right">
              <Typography variant="body2">₱{GeoapifyConfig.farePerKilometer} x {otherData.features[0].properties.distance / 1000} km</Typography>
            </Grid>
            <Grid item xs={2} textAlign="right">
              <Typography variant="body2">₱{Math.ceil(otherData.features[0].properties.distance / 1000) * GeoapifyConfig.farePerKilometer}</Typography>
            </Grid>
          </Fragment>
        );
      default:
        return null;
    }
  }

  const getBookingDate = () => {
    switch(data.type) {
      case BOOKING_TYPE.PACKAGE:
        return formatDate(data.date.toDate());
      case BOOKING_TYPE.AIRPORT_TRANSFER:
        return `${formatDate(data.pickupDate.toDate())} | ${formatTime(data.pickupTime)}`
      case BOOKING_TYPE.CAR_RENTAL:
        return `${formatDate(data.DateStart.toDate())} | ${formatTime(data.TimeStart)}`
      default:
        return null;
    }
  }

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
                  {data.remarks && 
                    <Grid container color="text.secondary">
                      <Grid item>
                        <Typography variant="body2">Reason</Typography>
                      </Grid>
                      <Grid item xs textAlign="right">
                        <Typography variant="body2">{data.remarks}</Typography>
                      </Grid>
                    </Grid>
                  }
                </> : 
                <Skeleton animation="wave" width="80%" sx={{ height: 50 }} />
              }
              <Divider sx={{my: 2}}/>
              <Grid container spacing={2}>
                {data ? 
                  renderSummary() : 
                  <Grid item xs>
                    <Skeleton animation="wave" width="80%" sx={{ height: 30 }} />
                    <Skeleton animation="wave" width="60%" sx={{ height: 30 }} />
                  </Grid>
                }
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
                    <Typography variant="body2">{getBookingDate()}</Typography> :
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
              {(data && otherData) ? 
                renderOptions() : 
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
                      <>
                        <FormButton sx={{width: "100%", mt: 2}} color="secondary" 
                          onClick={handlePaid} disabled={isSaving}>
                          Paid
                        </FormButton>
                        {PAYMENT_METHOD.GCASH === data.paymentDetails.method && 
                          <FormHelperText>
                            You can also click <a href={data.paymentDetails.request.data.checkouturl} target="_">here</a> to open GCash payment portal.
                          </FormHelperText> 
                        }
                      </>
                    }
                  </>
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
          </CardContent>
				</Card>
			</Grid>
		</Grid>
	);
}

export default withDialog(withLoggedUser(BookingDetails));