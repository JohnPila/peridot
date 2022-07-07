import { Box, InputLabel, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import AppForm from "../../../common/AppForm";
import FormButton from "../../../common/form/FormButton";
import Typography from "../../../common/Typography";
import LocationPicker from "../../../common/picker/LocationPicker";
import {DEFAULT_PACKAGE_DESCRIPTION, STORAGE_FOLDERS} from "../../../../utils/constants";
import SavePackageOptions from "./SavePackageOptions";
import ImageDropzone from "../../../common/ImageDropzone";
import { addPackage, getPackage, savePackage } from "../../../../services/PackageService";
import { deleteImages, getImages, getImagesAsFiles, uploadImages } from "../../../../services/FileService";
import TextFieldEditor from "../../../common/TextFieldEditor";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from 'notistack';
import { getPackageOptions } from "../../../../services/PackageOptionService";

function SavePackage(props) {
  const {
    isEdit = false,
  } = props;

  const { enqueueSnackbar } = useSnackbar();
  const {id: packageId} = useParams();
  const navigate  = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState(DEFAULT_PACKAGE_DESCRIPTION);
  const [city, setCity] = useState(null);
  const [barangay, setBarangay] = useState(null);
  const [packageOptions, setPackageOptions] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [images, setImages] = useState([]);
  const [submitting, setSubmitting] = useState(isEdit);
  const [error, setError] = useState({
    name: "",
    city: "",
    barangay: "",
    packageOptions: "",
  });

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (isEdit && packageId) {
      getPackageDetails();
    }
  }, []);

  const getPackageDetails = async () => {
    try {
      const data = await getPackage(packageId);
      setName(data.name);
      setDescription(data.description);
      setCity(data.city);
      setBarangay(data.barangay);
      setImages(await getImagesAsFiles(packageId, STORAGE_FOLDERS.PACKAGES));
      setOldImages(await getImages(packageId, STORAGE_FOLDERS.PACKAGES));
      setPackageOptions(await getPackageOptions(packageId));
    } catch (error) {
      enqueueSnackbar("Failed to get package details! ERR: " + error.message, {variant: "error"});
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
        await savePackage(packageId, {
          name,
          description,
          city,
          barangay,
          options: packageOptions,
        });
        await deleteImages(oldImages, `${STORAGE_FOLDERS.PACKAGES}/${packageId}`);
        await uploadImages(images, `${STORAGE_FOLDERS.PACKAGES}/${packageId}`);
      } else {
        const packageRef = await addPackage({
          name,
          description,
          city,
          barangay,
          options: packageOptions,
        });
        await uploadImages(images, `${STORAGE_FOLDERS.PACKAGES}/${packageRef.id}`);
      }
      navigate("/admin/packages");
    } catch (error) {
      console.error("Failed to save package.", error);
    } finally {
      setSubmitting(false);
    }
  };
  
  const isValid = () => {
    const errMsg = {};
    if (!name) {
      errMsg.name = "Name is required.";
    }
    if (!city) {
      errMsg.city = "City is required.";
    }
    if (!barangay) {
      errMsg.barangay = "Barangay is required.";
    }
    if (!packageOptions.length) {
      errMsg.packageOptions = "At least 1 package option is required.";
    }
    if (Object.keys(errMsg).length > 0) {
      setError(errMsg);
      return false;
    }
    return true;
  };

  const setValue = (field, value) => {
    switch (field) {
      case "name":
        setName(value);
        setError((err) => ({...err, name: ""}));
        break;
      case "city":
        setCity(value);
        setError((err) => ({...err, city: ""}));
        break;
      case "barangay":
        setBarangay(value);
        setError((err) => ({...err, barangay: ""}));
        break;
      case "packageOptions":
        setPackageOptions(value);
        setError((err) => ({...err, packageOptions: ""}));
        break;
      default:
        break;
    }
  };

  return (
    <AppForm containerProps={{maxWidth: "xl"}}>
      <Typography variant="h3" gutterBottom marked="center" align="center">
        {isEdit ? "Edit" : "Add"} Package
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 6 }}>
        <InputLabel sx={{mt: 1, mb: 1}}>Name *</InputLabel>
        <TextField error={!!error.name} autoFocus disabled={submitting} size="large" 
          fullWidth sx={{mb: 1}} value={name} 
          helperText={error.name}
          onChange={(e) => setValue("name", e.target.value)} />
        <InputLabel sx={{mt: 1, mb: 1}}>Tell us more about the package</InputLabel>
        <TextFieldEditor
          value={description}
          onChange={setDescription}
          disabled={submitting}
        />
        <InputLabel sx={{mt: 1, mb: 1}}>Images</InputLabel>
        <ImageDropzone key={oldImages?.length}
          value={images}
          onChange={setImages}
          disabled={submitting}
        />
        <InputLabel sx={{mt: 1, mb: 1}}>Location (Cebu) *</InputLabel>
        <Stack direction="row" spacing={1}>
          <LocationPicker
            error={error.city}
            value={city}
            label="City"
            category="cities"
            required
            disabled={submitting}
            onChange={(v) => setValue("city", v)}
          />
          <LocationPicker
            error={error.barangay}
            value={barangay}
            label="Barangay"
            category="barangays"
            parentValue={city}
            disabled={!city || submitting}
            required
            onChange={(v) => setValue("barangay", v)}
          />
        </Stack>
        <InputLabel sx={{mt: 1, mb: 1}}>Package Options *</InputLabel>
        <SavePackageOptions 
          error={error.packageOptions} 
          options={packageOptions} 
          onChange={(v) => setValue("packageOptions", v)}
          disabled={submitting}
        />
        <FormButton
          sx={{ mt: 3, mb: 2 }}
          disabled={submitting}
          size="large"
          color="secondary"
          fullWidth
        >
          {submitting ? 'Saving...' : 'Save Package'}
        </FormButton>
      </Box>
    </AppForm>
  );
}

export default SavePackage;