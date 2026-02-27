import React from "react";
import { Button, CircularProgress } from "@mui/material";

/**
 * Enterprise-grade FormButton
 * - Intended ONLY for form submission
 * - Prevents double submit
 * - Shows loading state
 */
const FormButton = ({
  children,
  isLoading = false,
  disabled = false,
  fullWidth = true,
  type = "submit",
  variant = "contained",
  color = "primary",
  size = "large",
  sx,
  ...props
}) => {
  return (
    <Button
      type={type}
      fullWidth={fullWidth}
      variant={variant}
      color={color}
      size={size}
      disabled={disabled || isLoading}
      sx={{
        position: "relative",
        textTransform: "none",     // ERP standard (no ALL CAPS)
        fontWeight: 500,
        ...sx,
      }}
      {...props}
    >
      {isLoading ? (
        <CircularProgress
          size={24}
          color="inherit"
          aria-label="Submitting"
        />
      ) : (
        children
      )}
    </Button>
  );
};

export default FormButton;
