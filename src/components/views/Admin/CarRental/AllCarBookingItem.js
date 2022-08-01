import { Button, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Grid, Skeleton } from '@mui/material';
import PropTypes from 'prop-types';
import Typography from '../../../common/Typography';
import Carousel from 'react-material-ui-carousel'
import { useEffect, useState } from 'react';
import { getImages } from '../../../../services/FileService';
import { DIALOG_TYPE_VARIANT, STORAGE_FOLDERS } from '../../../../utils/constants';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { useNavigate } from 'react-router-dom';
import withLoggedUser from '../../../hocs/withLoggedUser';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DropdownMenu from '../../../common/DropdownMenu';
import withDialog from '../../../hocs/withDialog';
import { useSnackbar } from 'notistack';
import { saveCar } from '../../../../services/CarRentalService';
import { getSmallestCarOptionRate } from '../../../../services/CarRentalOptionService';
import CheckIcon from '@mui/icons-material/Check';
import BlockIcon from '@mui/icons-material/Block';

function AllCarBookingItem(props) {
  const {
    data,
    isAdmin,
    confirmDialog,
  } = props;

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [images, setImages] = useState(null);
  const [smallestPrice, setSmallestPrice] = useState(null);
  
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    getSmallestCarOptionRate(data.id).then(setSmallestPrice);
    getImages(data.id, STORAGE_FOLDERS.CAR_RENTALS).then(setImages);
  }, []);

  const selectMenu = async (option) => {
    switch(option.id) {
      case "edit":
        navigate("/admin/car-rentals/" + data.id + "/edit");
        break;
      case "delete":
        confirmDialog("Delete car", `Are you sure you want to delete <b>${data.name}</b> car?`, (ok) => {
          if (ok) {
            deleteCar();
          }
        }, {
          variant: DIALOG_TYPE_VARIANT.ERROR,
          confirmButtonTitle: "Delete",
        });
        break;
      case "available":
        availableCar();
        break;
      default:
        break;
    }
  };

  const deleteCar = async () => {
    try {
      await saveCar(data.id, {
        isDeleted: true,
      });
      enqueueSnackbar("Successfully deleted car!", {variant: "success"});
    } catch (error) {
      enqueueSnackbar("Failed to delete car! ERR: " + error.message, {variant: "error"});
    }
  }
  
  const availableCar = async () => {
    try {
      await saveCar(data.id, {
        isAvailable: !data.isAvailable,
      });
      enqueueSnackbar("Successfully set to car availability!", {variant: "success"});
    } catch (error) {
      enqueueSnackbar("Failed to set car availability! ERR: " + error.message, {variant: "error"});
    }
  }

  const onSelectCar = (e) => {
    if ("circle" === e.target.tagName) {
      return;
    }
    navigate("/car-rentals/" + data.id);
  }

  return (
    <Grid item xs={12} sm={6} md={4} sx={{position: "relative"}}>
      <Card sx={{ maxWidth: 345, opacity: data.isDeleted || !data.isAvailable ? 0.6 : 1 }}>
        {images?.length > 0 ? 
          <CardMedia
            component={Carousel}
            sx={{height: 200}}
            indicatorContainerProps={{
              style: {
                position: "absolute",
                zIndex: 10,
                bottom: "5px",
              }
            }}
          >
            {images.map((img, index) => (
              <img key={index} src={img.url} alt={img.name} width="100%" />
            ))}
          </CardMedia> : 
          <CardMedia
            component="img"
            height="200"
            image="/images/peridotLogo.jpg"
            alt="Default image"
          />
        }
        <CardActionArea disabled={data.isDeleted || (!isAdmin && !data.isAvailable)} onClick={onSelectCar}>
          <CardHeader
            action={isAdmin &&
              <DropdownMenu style={{marginLeft: "10px"}}
                options={[
                  {
                    id: "edit",
                    content: <><EditIcon sx={{mr: 1}}/> Edit</>,
                  },
                  {
                    id: "delete",
                    content: <><DeleteIcon sx={{mr: 1}}/> Delete</>,
                  },
                  {
                    id: "available",
                    content: data.isAvailable ? 
                      <><BlockIcon sx={{mr: 1}}/> Not available</> : 
                      <><CheckIcon sx={{mr: 1}}/> Available</>,
                  },
                ]}
                onChange={selectMenu}
                disabled={data.isDeleted}
              />
            }
            title={data.make + " " + data.model}
            subheader={data.vehicleType + " - " + data.fuel}
          />
          <CardContent style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            lineClamp: 3,
            WebkitBoxOrient: "vertical",
            margin: 16,
            padding: 0,
          }}>
            <Typography component="div" variant="body2" color="text.secondary">
              <p dangerouslySetInnerHTML={{__html: data.description}}/>
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions disableSpacing>
          <Grid container>
            {!isAdmin &&
            <Grid item>
              <Button color="error" variant="contained" disabled={data.isDeleted || !data.isAvailable}>
                <LocalMallIcon sx={{mr: 0.5, fontSize: 16}}/> Book Now
              </Button>
            </Grid>
            }
            <Grid item xs sx={{textAlign: "right"}}>
              <Typography variant="body2" fontSize={10}>Price starts at</Typography>
              <Typography variant="h6" fontSize={22} sx={{lineHeight: 1}} color="green">
                {null !== smallestPrice ? 
                  `₱${smallestPrice}`: 
                  <Skeleton animation="wave" width="60%" sx={{display: "inline-flex"}} />
                }
              </Typography>
            </Grid>
          </Grid>
          {/* <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton> */}
          {/* <ExpandMore
            expand={expanded + ""}
            onClick={handleExpandClick}
            aria-expanded={expanded + ""}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore> */}
          {/* <div style={{textAlign: "right", width: "100%"}}>
            <Typography variant="caption">{formatDate(data.createdDate?.toDate())}</Typography>
          </div> */}
        </CardActions>
      </Card>
      {!data.isAvailable && 
        <BlockIcon sx={{
          position: "absolute",
          zIndex: 999,
          fontSize: "18em",
          color: "darkred",
          top: "15px",
          left: "0px",
          width: "97%",
          height: "55%",
        }} />
      }
    </Grid>
  );
}

AllCarBookingItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default withDialog(withLoggedUser(AllCarBookingItem));