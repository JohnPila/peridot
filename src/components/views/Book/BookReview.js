import PropTypes from 'prop-types';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AppForm from '../../common/AppForm';
import Typography from '../../common/Typography';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';
import FormButton from '../../common/form/FormButton';
import { BOOKING_TYPE } from '../../../utils/constants';
import BookPackageReview from './BookPackageReview';
import BookAirportTransferReview from './BookAirportTransferReview';

function BookReview(props) {
  const {
    type,
    info,
    data,
    onPrevious,
    onNext,
  } = props;
  
  const renderReview = () => {
    switch (type) {
      case BOOKING_TYPE.PACKAGE:
        return <BookPackageReview info={info} data={data} />;
      case BOOKING_TYPE.AIRPORT_TRANSFER:
        return <BookAirportTransferReview info={info} data={data} />;
      default:
        return null;
    }
  };

  return (
    <AppForm containerProps={{maxWidth: "xl"}}>
      <Typography variant="h3" gutterBottom marked="center" align="center">
        Review
      </Typography>
      <Box component="form" onSubmit={onNext} noValidate>
        {renderReview()}
        <Grid container>
          <Grid item xs>
            <FormButton
              sx={{ mt: 3, mb: 2 }}
              color="primary"
              type="button"
              variant="outlined"
              onClick={onPrevious}
            >
              <NavigateBeforeIcon/> <span style={{marginRight: 15}}>Back</span>
            </FormButton>
          </Grid>
          <Grid item xs textAlign="right">
            <FormButton
              sx={{ mt: 3, mb: 2 }}
              color="secondary"
            >
              <span style={{marginLeft: 15}}>Next</span> <NavigateNextIcon/>
            </FormButton>
          </Grid>
        </Grid>
      </Box>
    </AppForm>
  );
}

BookReview.propTypes = {
  type: PropTypes.number.isRequired,
  info: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
};

export default BookReview;