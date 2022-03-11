import { Button, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, Skeleton } from '@mui/material';
import PropTypes from 'prop-types';
import Typography from '../../../common/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Carousel from 'react-material-ui-carousel'
import { useEffect, useState } from 'react';
import { getImages } from '../../../../services/FileService';
import { STORAGE_FOLDERS } from '../../../../utils/constants';
import { formatDate } from '../../../../utils/HelperUtils';
import DropdownMenu from './ViewPackagesItemDropdownMenu';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { useNavigate } from 'react-router-dom';
import { getSmallestPackageOptionPrice } from '../../../../services/PackageOptionService';

function ViewPackagesItem(props) {
  const {
    data,
  } = props;

  const navigate = useNavigate();
  const [images, setImages] = useState(null);
  const [smallestPrice, setSmallestPrice] = useState(null);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    getSmallestPackageOptionPrice(data.id).then(setSmallestPrice);
    getImages(data.id, STORAGE_FOLDERS.PACKAGES).then(setImages);
  }, []);

  const selectMenu = (action) => {
    switch(action) {
      case "update":
        break;
      case "delete":
        break;
      default:
        break;
    }
  };

  const onSelectPackage = (e) => {
    if ("circle" === e.target.tagName) {
      return;
    }
    navigate("/packages/" + data.id);
  }

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ maxWidth: 345 }}>
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
        <CardActionArea onClick={onSelectPackage}>
          <CardHeader
            // action={
            //   <DropdownMenu onSelect={selectMenu}/>
            // }
            title={data.name}
            subheader={<div style={{ display: "flex", alignItems: "flex-start" }}>
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
            <Grid item>
              <Button color="error" variant="contained">
                <LocalMallIcon sx={{mr: 0.5, fontSize: 16}}/> Book Now
              </Button>
            </Grid>
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

export default ViewPackagesItem;