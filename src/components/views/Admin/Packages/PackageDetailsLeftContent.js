import { CardMedia, Grid, Skeleton } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { useNavigate } from 'react-router-dom';
import { getImages } from '../../../../services/FileService';
import { STORAGE_FOLDERS } from '../../../../utils/constants';
import Typography from '../../../common/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { getPackage } from '../../../../services/PackageService';

function PackageDetailsLeftContent(props) {
  const {
    packageId,
  } = props;

  const navigate = useNavigate();

  const [data, setData] = useState(null);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    getPackage(packageId).then(async (d) => {
      d.images = await getImages(d.id, STORAGE_FOLDERS.PACKAGES);
      setData(d);
    }).catch(() => navigate("/errors/404", {replace: true}));
  }, []);

  return (
    <Grid item xs={7} paddingRight={2}>
      {data ? 
        <>
          {0 === data.images.length ? 
            <CardMedia
              component="img"
              height="200"
              image="/images/peridotLogo.jpg"
            /> : 
            <Carousel sx={{height: 300}}
              indicatorContainerProps={{
                style: {
                  position: "absolute",
                  zIndex: 10,
                  bottom: "10px",
                }
              }}
            >
              {data.images.map((img, index) => (
                <img key={index} src={img.url} alt={img.name} width="100%" />
              ))}
            </Carousel>
          }
          <Typography sx={{mt: 2}} variant="h4">{data.name}</Typography>
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <Typography variant="h6" sx={{top: "-4px", position: "relative"}}>{data.barangay.label}, {data.city.label}</Typography> <LocationOnIcon htmlColor="red" fontSize="large"/>
          </div>
          <div dangerouslySetInnerHTML={{__html: data.description}} />
        </> :
        <>
          <Skeleton sx={{ height: 200 }} animation="wave" variant="rectangular" />
          <Skeleton sx={{ mt: 2 }} height={60} animation="wave" width="80%" />
          <Skeleton height={40} animation="wave" width="50%" />
          <br/>
          <Skeleton height={30} animation="wave" />
          <Skeleton height={30} animation="wave" />
          <Skeleton height={30} animation="wave" width="90%"/>
        </>
      }
    </Grid>
  );
}

PackageDetailsLeftContent.propTypes = {
  packageId: PropTypes.string.isRequired,
};

export default PackageDetailsLeftContent;