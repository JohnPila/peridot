import { Button, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Grid, Skeleton } from '@mui/material';
import PropTypes from 'prop-types';
import Typography from '../../../common/Typography';
import Carousel from 'react-material-ui-carousel'
import { useEffect, useState } from 'react';
import { getImages } from '../../../../services/FileService';
import { DIALOG_TYPE_VARIANT, STORAGE_FOLDERS } from '../../../../utils/constants';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { useNavigate } from 'react-router-dom';
import { getSmallestPackageOptionPrice } from '../../../../services/PackageOptionService';
import withLoggedUser from '../../../hocs/withLoggedUser';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DropdownMenu from '../../../common/DropdownMenu';
import withDialog from '../../../hocs/withDialog';
import { savePackage } from '../../../../services/PackageService';
import { useSnackbar } from 'notistack';

function ViewPackagesItem(props) {
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
    getSmallestPackageOptionPrice(data.id).then(setSmallestPrice);
    getImages(data.id, STORAGE_FOLDERS.PACKAGES).then(setImages);
  }, []);

  const selectMenu = async (option) => {
    switch(option.id) {
      case "edit":
        navigate("/admin/packages/" + data.id + "/edit");
        break;
      case "delete":
        confirmDialog("Delete package", `Are you sure you want to delete <b>${data.name}</b> package?`, (ok) => {
          if (ok) {
            deletePackage();
          }
        }, {
          variant: DIALOG_TYPE_VARIANT.ERROR,
          confirmButtonTitle: "Delete",
        });
        break;
      default:
        break;
    }
  };

  const deletePackage = async () => {
    try {
      await savePackage(data.id, {
        isDeleted: true,
      });
      enqueueSnackbar("Successfully deleted package!", {variant: "success"});
    } catch (error) {
      enqueueSnackbar("Failed to delete package! ERR: " + error.message, {variant: "error"});
    }
  }

  const onSelectPackage = (e) => {
    if ("circle" === e.target.tagName) {
      return;
    }
    navigate("/packages/" + data.id);
  }

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ maxWidth: 345, opacity: data.isDeleted ? 0.6 : 1 }}>
        {images?.length > 0 ? 
          <CardMedia
            component={Carousel}
            sx={{maxHeight: 180}}
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
        <CardActionArea disabled={data.isDeleted} onClick={onSelectPackage}>
          <CardHeader
            sx={{height: 150}}
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
                ]}
                onChange={selectMenu}
                disabled={data.isDeleted}
              />
            }
            title={(data.name.length) <35 ? data.name : data.name.substring(0, 35) + " ..." }
            subheader={<div style={{ height: 50, display: "flex", alignItems: "flex-start" }}>
              {data.barangay.label}, {data.city.label} <LocationOnIcon sx={{fontSize: 18, ml: 0.2}} htmlColor="red" />
            </div>}
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
              <Button color="error" variant="contained" disabled={data.isDeleted} onClick={onSelectPackage}>
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
    </Grid>
  );
}

ViewPackagesItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default withDialog(withLoggedUser(ViewPackagesItem));