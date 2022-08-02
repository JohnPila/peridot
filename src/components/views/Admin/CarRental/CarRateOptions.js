import NumberCounter from "../../../common/NumberCounter";
import Typography from "../../../common/Typography";
import { styled } from '@mui/material/styles';
import { useEffect, useState } from "react";
import { getRateOptions } from "../../../../services/CarRentalOptionService";
import PropTypes from 'prop-types';
import PackageDetailsOptionSkeleton from "../Packages/PackageDetailsOptionSkeleton";
import { FormHelperText } from "@mui/material";

const CarRateOptionLayout = styled('div')(({ theme }) => ({
  display: "flex",
  "div:first-child": {
    flex: 1,
    display: "flex",
    alignItems: "center",
  },
  "div:nth-child(2)": {
    display: "flex",
    alignItems: "center",
    paddingRight: 10,
    paddingLeft: 10,
    fontWeight: "bold",
  }
}));

function CarRateOptions(props) {
  const {
    carId,
    disabled = false,
    onSelect,
    error,
  } = props;
  const [options, setOptions] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    getOptions();
  }, []);

  const getOptions = async () => {
    try {
      setOptions(await getRateOptions(carId));
    } catch (err) {
      console.error("Failed to get car rate options.");
    }
  }

  const setQuantity = (option, quantity) => {
    let selOptions = [...selectedOptions];
    if (0 === quantity) {
      selOptions = selOptions.filter(opt => opt.id !== option.id)
    } else {
      const selOpt = selOptions.find(opt => opt.id === option.id);
      if (selOpt) {
        selOpt.quantity = quantity;
      } else {
        selOptions.push({
          ...option,
          quantity,
        });
      }
    }
    setSelectedOptions(selOptions);
    onSelect(selOptions);
  };

  return (
    <>
      {options ?
        options.map(opt => (
          <CarRateOptionLayout>
            <Typography component="div" variant="body1">{opt.duration}</Typography>
            <Typography component="div" variant="body1" color="green">₱{opt.rate}</Typography>
            <NumberCounter
              value={selectedOptions.find(s => s.id === opt.id)?.quantity || 0} 
              onChange={(v) => setQuantity(opt, v)} 
              min={0}
              disabled={disabled}
            />
          </CarRateOptionLayout>
        )) : 
        <PackageDetailsOptionSkeleton/>
      }
      {error && 
        <FormHelperText sx={{mt: 1}} error>
          {error}
        </FormHelperText> 
      }
    </>
  );
}

CarRateOptions.propTypes = {
  carId: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
};

export default CarRateOptions;