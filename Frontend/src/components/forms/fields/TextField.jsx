// features/forms/components/fields/TextField.jsx
import React from "react";
import { useField } from "formik";
import { TextField as MuiTextField } from "@mui/material";

const TextField = ({ label, name, placeholder, ...props }) => {
  const [field, meta] = useField(name);

  return (
    <MuiTextField
      fullWidth
      label={label}
      placeholder={placeholder}
      {...field}
      {...props}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      variant="outlined"
      margin="normal"
    />
  );
};

export default TextField;
