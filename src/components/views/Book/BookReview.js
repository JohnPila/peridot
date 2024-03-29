import PropTypes from 'prop-types';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AppForm from '../../common/AppForm';
import Typography from '../../common/Typography';
import { Box } from '@mui/system';
import { CardContent, CardMedia, Divider, Grid, Skeleton } from '@mui/material';
import FormButton from '../../common/form/FormButton';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../../utils/HelperUtils';
import { getPackage } from '../../../services/PackageService';
import { getImages } from '../../../services/FileService';
import { STORAGE_FOLDERS } from '../../../utils/constants';
import { Fragment, useEffect, useMemo, useState } from 'react';
import PackageDetailsOptionSkeleton from '../Admin/Packages/PackageDetailsOptionSkeleton';
import { getPackageOption } from '../../../services/PackageOptionService';

function BookReview(props) {
  const {
    info,
    packageId,
    bookingDate,
    packageOption,
    onPrevious,
    onNext,
  } = props;
  
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const totalCost = useMemo(() => data ? 
    data.packageOption.options.reduce((acc, opt) => acc + (opt.quantity * opt.price), 0) : 
    0 , [data])

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    getPackage(packageId).then(async (d) => {
      try {
        const packageOpt = await getPackageOption(packageOption.id);
        const options = [];
        if (!packageOpt.hasSubOptions) {
          options.push({
            name: packageOpt.name,
            price: packageOpt.price,
            quantity: packageOption.options[0].quantity,
          });
        } else {
          for (const opt of packageOption.options) {
            const subPackageOpt = await getPackageOption(opt.id);
            options.push({
              name: subPackageOpt.name,
              price: subPackageOpt.price,
              quantity: opt.quantity,
            });
          }
        }
        const images = await getImages(d.id, STORAGE_FOLDERS.PACKAGES);
        d.packageOption = {
          name: packageOpt.name,
          options,
        };
        d.image = images.length > 0 ? images[0] : {
          url: "/images/peridotLogo.jpg",
          name: "Default image",
        };
        setData(d);
      } catch (error) {
        console.error("Failed to get booking info.", error);
      }
    }).catch(() => navigate("/errors/404", {replace: true}));
  }, []);

  return (
    <AppForm containerProps={{maxWidth: "xl"}}>
      <Typography variant="h3" gutterBottom marked="center" align="center">
        Review
      </Typography>
      <Box component="form" onSubmit={onNext} noValidate>
        {data ?
          <>
            <Typography variant="h4" gutterBottom sx={{ mt: 6 }}>
              Booking info
            </Typography>
            <Box sx={{ display: 'flex', background: "none" }}>
              <CardMedia
                component="img"
                sx={{ width: 150 }}
                image={data.image.url}
                alt={data.image.name}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography component="div" variant="h5">
                    {data.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" component="div" sx={{mt: 0.5}}>
                    {data.packageOption.name}
                  </Typography>
                </CardContent>
              </Box>
            </Box>
            <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
              Personal info
            </Typography>
            <Grid container>
              <Grid item xs={2}>
                <Typography variant="body1" color="text.secondary">Full name</Typography>
              </Grid>
              <Grid item xs textAlign="right">
                <Typography variant="body1">{info.firstName} {info.lastName}</Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={2}>
                <Typography variant="body1" color="text.secondary">Phone number</Typography>
              </Grid>
              <Grid item xs textAlign="right">
                <Typography variant="body1">+63{info.phoneNumber}</Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={2}>
                <Typography variant="body1" color="text.secondary">Address</Typography>
              </Grid>
              <Grid item xs textAlign="right">
                <Typography variant="body1">{info.address}</Typography>
              </Grid>
            </Grid>
            <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
              Additional info
            </Typography>
            <Grid container>
              <Grid item xs={2}>
                <Typography variant="body1" color="text.secondary">Special requests</Typography>
              </Grid>
              <Grid item xs textAlign="right">
                <Typography variant="body1">{info.specialRequests}</Typography>
              </Grid>
            </Grid>
            <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
              Summary
            </Typography>
            <Grid container>
              <Grid item xs={2}>
                <Typography variant="body1" color="text.secondary">Booking date</Typography>
              </Grid>
              <Grid item xs textAlign="right">
                <Typography variant="body1">{formatDate(bookingDate)}</Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={2}>
                <Typography variant="body1" color="text.secondary">Options</Typography>
              </Grid>
              {data.packageOption.options.map((opt, i) => (
                <Fragment key={i}>
                  {i > 0 && <Grid item xs={2}/>}
                  <Grid item xs={8} textAlign="right">
                    <Typography variant="body1">{opt.quantity} x {opt.name} (₱{opt.price})</Typography>
                  </Grid>
                  <Grid item xs={2} textAlign="right">
                    <Typography variant="body1">₱{opt.quantity * opt.price}</Typography>
                  </Grid>
                </Fragment>
              ))}
            </Grid>
            <Divider sx={{mt: 3, mb: 2}}/>
            <Grid container>
              <Grid item xs={2}>
                <Typography variant="h6" color="text.secondary">Total</Typography>
              </Grid>
              <Grid item xs textAlign="right">
                <Typography variant="h6">₱{totalCost}</Typography>
              </Grid>
            </Grid>
          </> : 
          <>
            <Skeleton animation="wave" height={40} width="40%" sx={{mb: 2}} />
            <Grid container spacing={4}>
              <Grid item xs={2}>
                <Skeleton sx={{ height: 100 }} animation="wave" variant="rectangular" />
              </Grid>
              <Grid item xs>
                <Skeleton height={35} animation="wave" width="80%" />
                <Skeleton height={30} animation="wave" width="40%" />
              </Grid>
            </Grid>
            <Divider sx={{mt: 3, mb: 2}}/>
            <PackageDetailsOptionSkeleton />
            <PackageDetailsOptionSkeleton />
            <PackageDetailsOptionSkeleton />
            <Divider sx={{mt: 3, mb: 2}}/>
            <PackageDetailsOptionSkeleton innerProps={{height: 35}}/>
          </> 
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
              disabled={null === data}
            >
              <span style={{marginLeft: 15}}>Next</span> <NavigateNextIcon/>
            </FormButton>
          </Grid>
        </Grid>
      </Box>
    </AppForm>
  );
}

BookReview.propTypes = {
  info: PropTypes.object.isRequired,
  packageId: PropTypes.string.isRequired,
  bookingDate: PropTypes.instanceOf(Date).isRequired,
  packageOption: PropTypes.object.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
};

export default BookReview;