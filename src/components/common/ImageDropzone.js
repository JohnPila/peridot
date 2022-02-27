import PropTypes from 'prop-types';
import { styled } from "@mui/material/styles";
import { DropzoneArea } from 'react-mui-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { red } from '@mui/material/colors';

const ImagesDropzoneLayout = styled("div")(({ theme }) => ({
  ".images-dropzone": {
    minHeight: "130px",
  },
  ".MuiDropzoneArea-text": {
    marginTop: "20px",
    marginBottom: "10px",
  },
  ".images-preview-item > button": {
    top: "-4px",
    right: "-12px",
    borderRadius: 0,
    backgroundColor: red[500],
    color: "white",
  },
  ".images-preview-item > button:hover": {
    backgroundColor: red[700],
  }
}));

function ImageDropzone(props) {
  const {
    value,
    onChange,
    disabled = false,
  } = props;

  return (
    <ImagesDropzoneLayout>
      <DropzoneArea
        acceptedFiles={['image/*']}
        dropzoneText="Drag and drop an image here or click"
        previewGridProps={{
          container: {spacing: 2, direction: "row", justifyContent: "flex-start", sx: {mt: 1}},
          item: {xs: false},
        }}
        Icon={() => <CloudUploadIcon sx={{ fontSize: 50 }} />}
        dropzoneProps={{disabled}}
        initialFiles={value}
        showPreviews
        previewText=""
        showPreviewsInDropzone={false}
        dropzoneClass="images-dropzone"
        previewGridClasses={{container: "images-preview", item: "images-preview-item"}}
        filesLimit={5}
        onChange={onChange}
      />
    </ImagesDropzoneLayout>
  );
}

ImageDropzone.propTypes = {
  value: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default ImageDropzone;