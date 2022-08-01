import { Box, Grid, InputLabel, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import AppForm from "../../../common/AppForm";
import FormButton from "../../../common/form/FormButton";
import Typography from "../../../common/Typography";
import {STORAGE_FOLDERS} from "../../../../utils/constants";
import ImageDropzone from "../../../common/ImageDropzone";
import { deleteImages, getImages, getImagesAsFiles, uploadImages } from "../../../../services/FileService";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from 'notistack';
import SaveCarOptions from "./SaveCarOptions";
import { addCar, getCar, saveCar } from "../../../../services/CarRentalService";
import { getRateOptions } from "../../../../services/CarRentalOptionService";

function ViewCar() {
//   const {
//     isEdit = false,
//   } = props;

  const { enqueueSnackbar } = useSnackbar();
  const {id: carId} = useParams();
  const navigate  = useNavigate();
  const [vehicleType, setVehicleType] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [transmission, setTransmission] = useState("");
  const [fuel, setFuel] = useState("");
  const [plateNo, setPlateNo] = useState("");
  const [fullName, setFullName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [address, setAddress] = useState("");
  const [rateOptions, setRateOptions] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [images, setImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState({
    vehicleType: "",
    make: "",
    model: "",
    transmission: "",
    fuel: "",
    plateNo: "",
    fullName: "",
    contactNo: "",
    address: "",
  });

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (carId) {
      getCarDetails();
    }
  }, []);

  const getCarDetails = async () => {
    try {
      const data = await getCar(carId);
      setVehicleType(data.vehicleType);
      setMake(data.make);
      setModel(data.model);
      setTransmission(data.transmission);
      setFuel(data.fuel);
      setPlateNo(data.plateNo);
      setFullName(data.fullName);
      setContactNo(data.contactNo);
      setAddress(data.address);
      setImages(await getImagesAsFiles(carId, STORAGE_FOLDERS.CAR_RENTALS));
      setOldImages(await getImages(carId, STORAGE_FOLDERS.CAR_RENTALS));
      setRateOptions(await getRateOptions(carId));
    } catch (error) {
      enqueueSnackbar("Failed to get car details! ERR: " + error.message, {variant: "error"});
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AppForm containerProps={{maxWidth: "xl"}}>
      <Typography variant="h3" gutterBottom marked="center" align="center">
        View Car
      </Typography>
      <Typography variant="h4" gutterBottom sx={{ mt: 6, fontSize: 30 }}>
        Car Unit Information
      </Typography>
      <Box component="form" noValidate>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <InputLabel sx={{mt: 1, mb: 1}}>Vehicle Type *</InputLabel>
            <TextField error={!!error.vehicleType} autoFocus disabled={submitting} size="large" 
              fullWidth sx={{mb: 1}} value={vehicleType} 
              helperText={error.vehicleType}
            />
          </Grid>
          <Grid item xs={6}>
            <InputLabel sx={{mt: 1, mb: 1}}>Make *</InputLabel>
            <TextField error={!!error.make} autoFocus disabled={submitting} size="large" 
              fullWidth sx={{mb: 1}} value={make} 
              helperText={error.make}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <InputLabel sx={{mt: 1, mb: 1}}>Model *</InputLabel>
            <TextField error={!!error.model} autoFocus disabled={submitting} size="large" 
              fullWidth sx={{mb: 1}} value={model} 
              helperText={error.model}
            />
          </Grid>
          <Grid item xs={6}>
            <InputLabel sx={{mt: 1, mb: 1}}>Transmission *</InputLabel>
            <TextField error={!!error.transmission} autoFocus disabled={submitting} size="large" 
              fullWidth sx={{mb: 1}} value={transmission} 
              helperText={error.transmission}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <InputLabel sx={{mt: 1, mb: 1}}>Fuel *</InputLabel>
            <TextField error={!!error.fuel} autoFocus disabled={submitting} size="large" 
              fullWidth sx={{mb: 1}} value={fuel} 
              helperText={error.fuel}
            />
          </Grid>
          <Grid item xs={6}>
            <InputLabel sx={{mt: 1, mb: 1}}>Plate No. *</InputLabel>
            <TextField error={!!error.plateNo} autoFocus disabled={submitting} size="large" 
              fullWidth sx={{mb: 1}} value={plateNo} 
              helperText={error.plateNo}
            />
          </Grid>
        </Grid>
        {oldImages.map((img, index) => (
            <img key={index} src={img.url} alt={img.name} width="50%" />
        ))}
        <InputLabel sx={{mt: 1, mb: 1}}>Rate Options *</InputLabel>
        {rateOptions.map((option, index) => (
            <Grid container spacing={1} sx={{mb: index === rateOptions.length - 1 ? 0 : 1}} key={index}>
            <Grid item xs>
                <TextField fullWidth label="Duration"
                variant="outlined" value={option.duration}
                InputProps={{readOnly: true}} />
            </Grid>
            {!option.subOptions &&
                <Grid item xs={2}>
                <TextField fullWidth label="Rate"
                    variant="outlined" type="number" value={option.rate} 
                    InputProps={{readOnly: true}} />
                </Grid>
            }
            <Grid item xs={12}>
            </Grid>
            </Grid>
        ))}
      </Box>
    </AppForm>
  );
}

export default ViewCar;