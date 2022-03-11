import { Box, InputLabel, Stack, TextField } from "@mui/material";
import { useState } from "react";
import AppForm from "../../../common/AppForm";
import FormButton from "../../../common/form/FormButton";
import Typography from "../../../common/Typography";
import LocationPicker from "../../../common/picker/LocationPicker";
import {DEFAULT_PACKAGE_DESCRIPTION, STORAGE_FOLDERS} from "../../../../utils/constants";
import SavePackageOptions from "./SavePackageOptions";
import ImageDropzone from "../../../common/ImageDropzone";
import { addPackage } from "../../../../services/PackageService";
import { uploadImages } from "../../../../services/FileService";
import TextFieldEditor from "../../../common/TextFieldEditor";
import { useNavigate } from "react-router-dom";

function SavePackage() {
  const navigate  = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState(DEFAULT_PACKAGE_DESCRIPTION);
  const [city, setCity] = useState(null);
  const [barangay, setBarangay] = useState(null);
  const [packageOptions, setPackageOptions] = useState([]);
  const [images, setImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState({
    name: "",
    city: "",
    barangay: "",
    packageOptions: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!submitting && isValid()) {
      save();
    }
  };

  const save = async () => {
    try {
      setSubmitting(true);
      const packageRef = await addPackage({
        name,
        description,
        city,
        barangay,
        options: packageOptions,
      });
      await uploadImages(images, `${STORAGE_FOLDERS.PACKAGES}/${packageRef.id}`);
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
        Add Package
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
        <ImageDropzone
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