// features/forms/components/fields/NumberField.jsx
import React from "react";
import { useField } from "formik";
import { TextField as MuiTextField } from "@mui/material";

const NumberField = ({ label, name, placeholder, ...props }) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = (e) => {
    const value = e.target.value;
    // Only allow numbers
    helpers.setValue(value === "" ? "" : Number(value));
  };

  return (
    <MuiTextField
      fullWidth
      type="number"
      label={label}
      placeholder={placeholder}
      {...field}
      {...props}
      onChange={handleChange}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      variant="outlined"
      margin="normal"
    />
  );
};

export default NumberField;
