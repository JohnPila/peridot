import { Accordion, AccordionDetails, AccordionSummary, Divider, FormHelperText, Skeleton } from "@mui/material";
import Typography from "../../../common/Typography";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useMemo, useState } from "react";
import PropTypes from 'prop-types';
import NumberCounter from "../../../common/NumberCounter";
import { styled } from '@mui/material/styles';
import PackageDetailsOptionSkeleton from "./PackageDetailsOptionSkeleton";
import { getPackageOptions, getPackageSubOptions } from "../../../../services/PackageOptionService";

const PackageOptionSubOptionLayout = styled('div')(({ theme }) => ({
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

const PackageOptionTotalLayout = styled('div')(({ theme }) => ({
  display: "flex",
  "h3": {
    fontWeight: "bold",
    fontSize: 25,
  },
  "h3:last-child": {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  }
}));

function PackageDetailsOptions(props) {
  const {
    packageId,
    onSelect = () => {},
    disabled = false,
    error,
  } = props;

  const [options, setOptions] = useState(null);
  const [subOptions, setSubOptions] = useState(null);
  const [expandedOption, setExpandedOption] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const totalCost = useMemo(() => selectedOptions.reduce((acc, option) => 
    acc + (option.quantity * option.price), 0), [selectedOptions]);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    getPackageOptions(packageId).then(setOptions);
  }, []);

  useEffect(() => {
    if (expandedOption) {
      setSubOptions(null);
      getPackageSubOptions(expandedOption.id).then((subs) => {
        setSubOptions(subs.length > 0 ? subs : [expandedOption]);
      });
    }
  }, [expandedOption]);

  const handleExpand = (option) => (event, isExpanded) => {
    setExpandedOption(isExpanded ? option : null);
    if (isExpanded) {
      setSelectedOptions([]);
    }
  };

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
    onSelect(selOptions.length > 0 ? {
      ...expandedOption,
      options: selOptions,
    } : null);
  };

  return (
    <>
      {options ? 
        <Typography variant="h6" sx={{fontSize: 20}}>Package options</Typography> :
        <Skeleton animation="wave" height={40} width="40%" />
      }
      <br/>
      {options ? 
        options.map((option, i) => (
          <Accordion key={option.id} expanded={expandedOption?.id === option.id} onChange={handleExpand(option)}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography variant="body1">
                {option.name}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" sx={{mb: 1}} color="gray">Quantity</Typography>
              {subOptions ? 
                subOptions.map((sub) => (
                  <PackageOptionSubOptionLayout key={sub.id}>
                    <Typography component="div" variant="body1">{sub.name}</Typography>
                    <Typography component="div" variant="body1" color="green">₱{sub.price}</Typography>
                    <NumberCounter 
                      value={selectedOptions.find(s => s.id === sub.id)?.quantity || 0} 
                      onChange={(v) => setQuantity(sub, v)} 
                      min={0}
                      disabled={disabled}
                    />
                  </PackageOptionSubOptionLayout>
                )) : 
                <PackageDetailsOptionSkeleton/>
              }
            </AccordionDetails>
          </Accordion>
        )) : 
        <>
          <Skeleton sx={{ height: 50 }} animation="wave" variant="rectangular" />
          <PackageDetailsOptionSkeleton sx={{mt: 2}}/>
          <PackageDetailsOptionSkeleton/>
        </>
      }
      {error && 
        <FormHelperText sx={{mt: 1}} error>
          {error}
        </FormHelperText> 
      }
      <Divider sx={{mt: 3, mb: 2}}/>
      {options ? 
        <PackageOptionTotalLayout>
          <Typography variant="h5">
            Total
          </Typography>
          <Typography variant="h5" color="darkgreen">
            ₱{totalCost}
          </Typography>
        </PackageOptionTotalLayout> :
        <PackageDetailsOptionSkeleton sx={{mt: 2}} innerProps={{height: 40}} />
      }
    </>
  );
}

PackageDetailsOptions.propTypes = {
  packageId: PropTypes.string.isRequired,
  onSelect: PropTypes.func,
  disabled: PropTypes.bool,
  error: PropTypes.string,
};

export default PackageDetailsOptions;