// features/forms/components/MultiStepNavigation.jsx
import React from "react";
import { Button, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentStepIndex,
  selectCurrentStepIndex,
  selectTotalSteps,
} from "../../features/forms/redux/formSlice";

/**
 * MultiStepNavigation
 * Props:
 * - isSubmitting: boolean (Formik submission state)
 * - handleSubmit: function (called when last step is submitted)
 * - isLastStep: boolean (true if this is the final step)
 * - isNextDisabled: boolean (disable Next if step is invalid)
 */
const MultiStepNavigation = ({
  isSubmitting,
  handleSubmit,
  isLastStep,
  isNextDisabled,
}) => {
  const dispatch = useDispatch();
  const currentStepIndex = useSelector(selectCurrentStepIndex);
  const totalSteps = useSelector(selectTotalSteps);

  const handleBack = () => {
    if (currentStepIndex > 0) {
      dispatch(setCurrentStepIndex(currentStepIndex - 1));
    }
  };

  const handleNext = () => {
    if (!isLastStep) {
      dispatch(setCurrentStepIndex(currentStepIndex + 1));
    }
  };

  return (
    <Box display="flex" justifyContent="space-between" mt={4}>
      <Button
        variant="outlined"
        onClick={handleBack}
        disabled={currentStepIndex === 0 || isSubmitting}
      >
        Back
      </Button>

      {!isLastStep ? (
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          disabled={isNextDisabled || isSubmitting}
        >
          Next
        </Button>
      ) : (
        <Button
          variant="contained"
          color="success"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          Submit
        </Button>
      )}
    </Box>
  );
};

export default MultiStepNavigation;
