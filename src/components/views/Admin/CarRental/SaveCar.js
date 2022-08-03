import { Box, Grid, InputLabel, TextField, RadioGroup, Radio, FormControl, FormLabel, FormControlLabel } from "@mui/material";
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

function SaveCar(props) {
  const {
    isEdit = false,
  } = props;

  const { enqueueSnackbar } = useSnackbar();
  const {id: carId} = useParams();
  const navigate  = useNavigate();
  const [vehicleType, setVehicleType] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [transmission, setTransmission] = useState("");
  const [fuel, setFuel] = useState("");
  const [plateNo, setPlateNo] = useState("");
  const [capacity, setCapacity] = useState("4 seater");
  const [fullName, setFullName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [address, setAddress] = useState("");
  const [rateOptions, setRateOptions] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [images, setImages] = useState([]);
  const [submitting, setSubmitting] = useState(isEdit);
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
    if (isEdit && carId) {
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
      setCapacity(data.capacity);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!submitting && isValid()) {
      save();
    }
  };

  const save = async () => {
    try {
      setSubmitting(true);
      if (isEdit) {
        await saveCar(carId, {
          vehicleType,
          make,
          model,
          transmission,
          fuel,
          plateNo,
          capacity,
          fullName,
          contactNo,
          address,
          options: rateOptions,
        });
        await deleteImages(oldImages, `${STORAGE_FOLDERS.CAR_RENTALS}/${carId}`);
        await uploadImages(images, `${STORAGE_FOLDERS.CAR_RENTALS}/${carId}`);
      } else {
        const carRef = await addCar({
          vehicleType,
          make,
          model,
          transmission,
          fuel,
          plateNo,
          fullName,
          capacity,
          contactNo,
          address,
          options: rateOptions,
        });
        await uploadImages(images, `${STORAGE_FOLDERS.CAR_RENTALS}/${carRef.id}`);
      }
      navigate("/admin/car-rentals");
    } catch (error) {
      console.error("Failed to save car.", error);
    } finally {
      setSubmitting(false);
    }
  };
  
  const isValid = () => {
    const errMsg = {};
    if (!vehicleType) {
      errMsg.vehicleType = "Vehicle type is required.";
    }
    if (!make) {
      errMsg.make = "Make is required.";
    }
    if (!model) {
      errMsg.model = "Model is required.";
    }
    if (!transmission) {
      errMsg.transmission = "Transmission is required.";
    }
    if (!fuel) {
      errMsg.fuel = "Fuel is required.";
    }
    if (!plateNo) {
      errMsg.plateNo = "Plate no. is required.";
    }
    if (!fullName) {
      errMsg.fullName = "Full name is required.";
    }
    if (!contactNo) {
      errMsg.contactNo = "Contact no. is required.";
    }
    if (!address) {
      errMsg.address = "Address is required.";
    }
    if (!rateOptions.length) {
      errMsg.rateOptions = "At least 1 rate option is required.";
    }
    if (Object.keys(errMsg).length > 0) {
      setError(errMsg);
      return false;
    }
    return true;
  };

  const setValue = (field, value) => {
    switch (field) {
      case "vehicleType":
        setVehicleType(value);
        setError((err) => ({...err, vehicleType: ""}));
        break;
      case "make":
        setMake(value);
        setError((err) => ({...err, make: ""}));
        break;
      case "model":
        setModel(value);
        setError((err) => ({...err, model: ""}));
        break;
      case "transmission":
        setTransmission(value);
        setError((err) => ({...err, transmission: ""}));
        break;
      case "fuel":
        setFuel(value);
        setError((err) => ({...err, fuel: ""}));
        break;
      case "plateNo":
        setPlateNo(value);
        setError((err) => ({...err, plateNo: ""}));
        break;
      case "fullName":
        setFullName(value);
        setError((err) => ({...err, fullName: ""}));
        break;
      case "contactNo":
        setContactNo(value);
        setError((err) => ({...err, contactNo: ""}));
        break;
      case "address":
        setAddress(value);
        setError((err) => ({...err, address: ""}));
        break;
      case "rateOptions":
        setRateOptions(value);
        setError((err) => ({...err, rateOptions: ""}));
        break;
      default:
        break;
    }
  };

  return (
    <AppForm containerProps={{maxWidth: "xl"}}>
      <Typography variant="h3" gutterBottom marked="center" align="center">
        {isEdit ? "Edit" : "Add"} Car
      </Typography>
      <Typography variant="h4" gutterBottom sx={{ mt: 6, fontSize: 30 }}>
        Car Unit Information
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <InputLabel sx={{mt: 1, mb: 1}}>Vehicle Type *</InputLabel>
            <TextField error={!!error.vehicleType} autoFocus disabled={submitting} size="large" 
              fullWidth sx={{mb: 1}} value={vehicleType} 
              helperText={error.vehicleType}
              onChange={(e) => setValue("vehicleType", e.target.value)} />
          </Grid>
          <Grid item xs={6}>
            <InputLabel sx={{mt: 1, mb: 1}}>Make *</InputLabel>
            <TextField error={!!error.make} autoFocus disabled={submitting} size="large" 
              fullWidth sx={{mb: 1}} value={make} 
              helperText={error.make}
              onChange={(e) => setValue("make", e.target.value)} />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <InputLabel sx={{mt: 1, mb: 1}}>Model *</InputLabel>
            <TextField error={!!error.model} autoFocus disabled={submitting} size="large" 
              fullWidth sx={{mb: 1}} value={model} 
              helperText={error.model}
              onChange={(e) => setValue("model", e.target.value)} />
          </Grid>
          <Grid item xs={6}>
            <InputLabel sx={{mt: 1, mb: 1}}>Transmission *</InputLabel>
            <TextField error={!!error.transmission} autoFocus disabled={submitting} size="large" 
              fullWidth sx={{mb: 1}} value={transmission} 
              helperText={error.transmission}
              onChange={(e) => setValue("transmission", e.target.value)} />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <InputLabel sx={{mt: 1, mb: 1}}>Fuel *</InputLabel>
            <TextField error={!!error.fuel} autoFocus disabled={submitting} size="large" 
              fullWidth sx={{mb: 1}} value={fuel} 
              helperText={error.fuel}
              onChange={(e) => setValue("fuel", e.target.value)} />
          </Grid>
          <Grid item xs={6}>
            <InputLabel sx={{mt: 1, mb: 1}}>Plate No. *</InputLabel>
            <TextField error={!!error.plateNo} autoFocus disabled={submitting} size="large" 
              fullWidth sx={{mb: 1}} value={plateNo} 
              helperText={error.plateNo}
              onChange={(e) => setValue("plateNo", e.target.value)} />
          </Grid>
          <Grid item xs={6} >
            <FormControl>
              <FormLabel id="capacity-radio-button-label">Passenger Capacity</FormLabel>
              <RadioGroup 
                row
                sx={{mt: 1, columnGap: 8}}
                aria-labelledby="capacity-radio-button-label"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)} >
                <FormControlLabel value="4 seater" control={<Radio color="info"/>} 
                  label="4 seater" />
                <FormControlLabel value="6 seater" control={<Radio color="info"/>} 
                  label="6 seater" />
                <FormControlLabel value="15 seater" control={<Radio color="info"/>} 
                  label="15 seater" />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        {/* <Typography variant="h4" gutterBottom sx={{ mt: 4, fontSize: 30 }}>
          Driver Information
        </Typography>
        <InputLabel sx={{mt: 1, mb: 1}}>Full Name *</InputLabel>
        <TextField error={!!error.fullName} autoFocus disabled={submitting} size="large" 
          fullWidth sx={{mb: 1}} value={fullName} 
          helperText={error.fullName}
          onChange={(e) => setValue("fullName", e.target.value)} />
        <InputLabel sx={{mt: 1, mb: 1}}>Contact No. *</InputLabel>
        <TextField error={!!error.contactNo} autoFocus disabled={submitting} size="large" 
          fullWidth sx={{mb: 1}} value={contactNo} 
          helperText={error.contactNo}
          onChange={(e) => setValue("contactNo", e.target.value)} />
        <InputLabel sx={{mt: 1, mb: 1}}>Address *</InputLabel>
        <TextField error={!!error.address} autoFocus disabled={submitting} size="large" 
          fullWidth sx={{mb: 1}} value={address} 
          helperText={error.address}
          onChange={(e) => setValue("address", e.target.value)} /> */}
        <InputLabel sx={{mt: 1, mb: 1}}>Images</InputLabel>
        <ImageDropzone key={oldImages?.length}
          value={images}
          onChange={setImages}
          disabled={submitting}
        />
        <InputLabel sx={{mt: 1, mb: 1}}>Rate Options *</InputLabel>
        <SaveCarOptions
          error={error.rateOptions} 
          options={rateOptions} 
          onChange={(v) => setValue("rateOptions", v)}
          disabled={submitting}
        />
        <FormButton
          sx={{ mt: 3, mb: 2 }}
          disabled={submitting}
          size="large"
          color="secondary"
          fullWidth
        >
          {submitting ? 'Saving...' : 'Save Car'}
        </FormButton>
      </Box>
    </AppForm>
  );
}

export default SaveCar;