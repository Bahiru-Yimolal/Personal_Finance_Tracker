// features/forms/components/fields/SelectField.jsx
import React from "react";
import { useField } from "formik";
import { TextField, MenuItem } from "@mui/material";

const SelectField = ({ label, name, options = [], ...props }) => {
  const [field, meta] = useField(name);

  return (
    <TextField
      select
      fullWidth
      label={label}
      {...field}
      {...props}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      variant="outlined"
      margin="normal"
    >
      {options.map((opt) => (
        <MenuItem key={opt.value} value={opt.value}>
          {opt.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectField;
