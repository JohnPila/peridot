import { CardMedia, Grid, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import Typography from "../../../common/Typography";
import { STORAGE_FOLDERS} from "../../../../utils/constants";
import { getImages } from "../../../../services/FileService";
import { useNavigate, useParams } from "react-router-dom";
import { getCar } from "../../../../services/CarRentalService";
import { getRateOptions } from "../../../../services/CarRentalOptionService";
import Carousel from "react-material-ui-carousel";

function ViewCar(props) {
  const {
    containerProps = {},
  } = props;
  const {id: carId} = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (carId) {
      getCarDetails();
    }
  }, []);

  const getCarDetails = async () => {
    try {
      const data = await getCar(carId);
      data.rateOptions = await getRateOptions(carId);
      data.images = await getImages(carId, STORAGE_FOLDERS.CAR_RENTALS);
      setData(data);
    } catch (error) {
      navigate("/errors/404", {replace: true})
    }
  }

  return (
    <Grid item xs={7} paddingRight={2} {...containerProps}>
      {data ? 
        <>
          {0 === data.images.length ? 
            <CardMedia
              component="img"
              sx={{ height: 400 }}
              image="/images/peridotLogo.jpg"
            /> : 
            <Carousel sx={{height: 400}}
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
          <div style={{textAlign: "center"}}>
            <Typography sx={{mt: 2}} variant="h2">{data.make} {data.model}</Typography>
            <Typography variant="h6" sx={{top: "-4px", position: "relative"}}>{data.transmission}</Typography>
            <Typography variant="body1" sx={{top: "-4px", position: "relative"}}>{data.vehicleType} | {data.fuel} | {data.plateNo}</Typography>
          </div>
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

export default ViewCar;