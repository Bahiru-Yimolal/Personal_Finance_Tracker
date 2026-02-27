// features/forms/components/FormRenderer.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import {
  selectDVFormValues,
  setFormValues,
  selectCurrentStepIndex,
  setCurrentStepIndex,
  selectSteps,
  resetFormState,
} from "../../features/forms/redux/formSlice";
import { useSubmitDVFormMutation } from "../../features/forms/redux/formApiSlice";

import StepRenderer from "./StepRenderer";
import MultiStepNavigation from "./MultiStepNavigation";
import { buildValidationSchema } from "../../features/forms/validation/buildValidationSchema";

const FormRenderer = () => {
  const dispatch = useDispatch();
  const formValues = useSelector(selectDVFormValues);
  const currentStepIndex = useSelector(selectCurrentStepIndex);
  const steps = useSelector(selectSteps);

  const [submitDVForm, { isLoading }] = useSubmitDVFormMutation();

  if (steps.length === 0) return <div>Loading form...</div>;

  const currentStep = steps[currentStepIndex];

const validationSchema =
  currentStep ? buildValidationSchema([currentStep], formValues) : null;


  const handleSubmit = async (values, actions) => {
    dispatch(setFormValues(values));

    if (currentStepIndex < steps.length - 1) {
      dispatch(setCurrentStepIndex(currentStepIndex + 1));
    } else {
      try {
        await submitDVForm(values).unwrap();
        dispatch(resetFormState());
        actions.resetForm();
        alert("Form submitted successfully!");
      } catch (err) {
        console.error("Submission failed:", err);
        alert("Submission failed. Please try again.");
      }
    }
  };

  console.log("FormRenderer steps:", steps);
console.log("currentStepIndex:", currentStepIndex);
console.log("currentStep:", steps[currentStepIndex]);


  return (
    <Formik
      enableReinitialize
      initialValues={formValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form>
          <StepRenderer step={currentStep} />
          <MultiStepNavigation
            isSubmitting={formik.isSubmitting || isLoading}
            handleSubmit={formik.handleSubmit}
            isLastStep={currentStepIndex === steps.length - 1}
            isNextDisabled={!formik.isValid}
          />
        </Form>
      )}
    </Formik>
  );
};


export default FormRenderer;
