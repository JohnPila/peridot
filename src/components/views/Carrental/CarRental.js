import { Stack, Step, StepLabel, Stepper } from "@mui/material";
import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { Check } from "@mui/icons-material";
import PropTypes from 'prop-types';
import Enterdetails from "./Enterdetails";
import Payment from "./Payment";
import ViewCarRental from "./ViewCarRental";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { BOOKING_TYPE } from "../../../utils/constants";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#784af4',
  }),
  '& .QontoStepIcon-completedIcon': {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

export default function CarRental() {
  const navigate = useNavigate();
  const {id: packageId} = useParams();
  const location = useLocation();
  const [activeStep, setActiveStep] = useState(1);
  const [info, setInfo] = useState(null);
  const [isWaiting, setIsWaiting] = useState(false);
  
  const {state: {type, data: stateData}} = location;

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (!location.state) {
      navigate("/packages", {replace: true});
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeStep]);

  const handleNext = (data) => {
    switch (activeStep) {
      case 1:
        setInfo(data);
        break;
      case 3:
        navigate("result", {
          replace: true,
          state: {
            ...data,
          },
        });
        return;
      default:
        break;
    }
    setActiveStep(activeStep + 1);
  };

  const handlePrevious = () => {
    setActiveStep(activeStep - 1);
  };

  const renderStep = () => {
    switch (activeStep) {
      case 1:
        return <Enterdetails 
          info={info} 
          onNext={handleNext}
        />;
        case 2:
        return <ViewCarRental
          info={info}
          type={type}
          data={stateData}
          onPrevious={handlePrevious} 
          onNext={handleNext} 
        />;
        case 3:
        return <Payment
          info={info}
          type={type}
          data={{...stateData, packageId}}
          isWaiting={isWaiting}
          setIsWaiting={setIsWaiting}
          onPrevious={handlePrevious} 
          onNext={handleNext} 
        />
      
      default:
        return null;
    }
  };

  if (!location.state) {
    return null;
  }

  return (
    <>
      {!isWaiting && 
        <Stack sx={{ width: '100%' }} spacing={4}>
          <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
            <Step>
              <StepLabel StepIconComponent={QontoStepIcon}>{type === BOOKING_TYPE.PACKAGE ? 
              "Choose package" : "Book airport transfer"}</StepLabel>
            </Step>
            <Step>
              <StepLabel StepIconComponent={QontoStepIcon}>Enter info</StepLabel>
            </Step>
            <Step>
              <StepLabel StepIconComponent={QontoStepIcon}>Review</StepLabel>
            </Step>
            <Step>
              <StepLabel StepIconComponent={QontoStepIcon}>Pay</StepLabel>
            </Step>
          </Stepper>
        </Stack>
      }
      {renderStep()}
    </>
  );
}