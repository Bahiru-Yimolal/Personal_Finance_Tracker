import React from "react";
import { TextField } from "@mui/material";

/**
 * Enterprise-grade FormInput
 * - Works with Formik
 * - Centralizes validation UI
 * - Safe for large ERP systems
 */
const FormInput = ({
  name,
  label,
  formik,
  type = "text",
  placeholder,
  fullWidth = true,
  disabled = false,
  required = false,
  sx,
  ...props
}) => {
  if (!formik) {
    console.error("FormInput requires a formik instance");
    return null;
  }

  const isTouched = formik.touched[name];
  const errorMessage = formik.errors[name];
  const hasError = Boolean(isTouched && errorMessage);

  return (
    <TextField
      id={name}
      name={name}
      type={type}
      label={label}
      placeholder={placeholder}
      fullWidth={fullWidth}
      required={required}
      disabled={disabled}
      value={formik.values[name] ?? ""}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={hasError}
      helperText={hasError ? errorMessage : " "}
      sx={sx}
      {...props}
    />
  );
};

export default FormInput;
