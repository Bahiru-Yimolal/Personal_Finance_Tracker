// features/forms/components/fields/DateField.jsx
import React from "react";
import { useField } from "formik";
import { TextField } from "@mui/material";

const DateField = ({ label, name, placeholder, ...props }) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = (e) => {
    helpers.setValue(e.target.value); // Store as string "YYYY-MM-DD"
  };

  return (
    <TextField
      fullWidth
      type="date"
      label={label}
      {...field}
      {...props}
      onChange={handleChange}
      value={field.value || ""}
      InputLabelProps={{ shrink: true }} // keeps label visible
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      variant="outlined"
      margin="normal"
    />
  );
};

export default DateField;
