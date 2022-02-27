import { Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, Skeleton } from '@mui/material';
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
import { getBarangay, getCity } from '../../../../services/LocationService';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function ViewPackagesItem(props) {
  const {
    data,
  } = props;

  const [images, setImages] = useState(null);
  const [location, setLocation] = useState(null);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    getImages(data.id, STORAGE_FOLDERS.PACKAGES).then(setImages);
    getLocation();
  }, []);

  const getLocation = async () => {
    const {city, barangay} = data;
    if (city) {
      const cityName = await getCity(city);
      const barangayName = await getBarangay(barangay);
      setLocation(`${barangayName.name}, ${cityName.name}`);
    } else {
      setLocation("");
    }
  };

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
          />
        }
        <CardHeader
          action={
            <DropdownMenu onSelect={selectMenu}/>
          }
          title={data.name}
          subheader={null !== location ? 
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              {location} <LocationOnIcon sx={{fontSize: 18, ml: 0.5}}/>
            </div> : 
            <Skeleton animation="wave" width="40%" />}
        />
        <CardContent style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          lineClamp: 3,
          WebkitBoxOrient: "vertical",
        }}>
          <Typography component="div" variant="body2" color="text.secondary">
            <p dangerouslySetInnerHTML={{__html: data.description}}/>
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          {/* <ExpandMore
            expand={expanded + ""}
            onClick={handleExpandClick}
            aria-expanded={expanded + ""}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore> */}
          <div style={{textAlign: "right", width: "100%"}}>
            <Typography variant="caption">{formatDate(data.createdDate?.toDate())}</Typography>
          </div>
        </CardActions>
      </Card>
    </Grid>
  );
}

ViewPackagesItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ViewPackagesItem;