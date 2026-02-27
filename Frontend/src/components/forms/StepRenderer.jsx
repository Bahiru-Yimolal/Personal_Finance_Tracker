// features/forms/components/StepRenderer.jsx
import React from "react";
import FieldRenderer from "./FieldRenderer";
import { Box, Typography } from "@mui/material";

/**
 * StepRenderer
 * Props:
 * - step: object (one step from your DV form schema)
 *   - step.title: string
 *   - step.fields: array of field schemas
 */
const StepRenderer = ({ step }) => {

  // console.log("StepRenderer received step:", step);

  if (!step) {
    // console.warn("StepRenderer: step is undefined!");
    return <div>No step to render</div>;
  }

  // if (!step.fields || step.fields.length === 0) {
  //   console.warn("StepRenderer: step.fields is empty!", step);
  // }

  return (
    <Box mb={4}>
      {step.title && (
        <Typography variant="h5" gutterBottom>
          {step.title}
        </Typography>
      )}

      {step.fields?.map((field) => {
        console.log("Rendering field:", field);
        return <FieldRenderer key={field.name} {...field} />;
      })}
    </Box>
  );
};


export default StepRenderer;
