import React, { useState } from "react";
import {
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

/**
 * Enterprise-grade PasswordInput
 * - Formik integrated
 * - Show / hide toggle
 * - Centralized validation UI
 */
const PasswordInput = ({
  name,
  label,
  formik,
  placeholder,
  fullWidth = true,
  disabled = false,
  required = false,
  sx,
  ...props
}) => {
  if (!formik) {
    console.error("PasswordInput requires a formik instance");
    return null;
  }

  const [showPassword, setShowPassword] = useState(false);

  const isTouched = formik.touched[name];
  const errorMessage = formik.errors[name];
  const hasError = Boolean(isTouched && errorMessage);

  const toggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <TextField
      id={name}
      name={name}
      type={showPassword ? "text" : "password"}
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
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={toggleVisibility}
              edge="end"
              aria-label={
                showPassword ? "Hide password" : "Show password"
              }
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};

export default PasswordInput;
