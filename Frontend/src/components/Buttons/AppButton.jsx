import { Button as MuiButton, CircularProgress } from "@mui/material";

export default function AppButton({
  children,
  Icon,
  isLoading = false,
  bColor = "#2E8B57",
  color = "#fff",
  hoverColor = "#1e7a7a",
  minWidth = 114,
  height = 33,
  sx,
  ...props
}) {
  return (
    <MuiButton
      sx={{
        minWidth,
        height,
        borderRadius: "13px",
        backgroundColor: bColor,
        color,
        fontFamily: "Abyssinica SIL",
        fontSize: "14px",
        fontWeight: 400,
        boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
        transition: "background-color 0.3s ease",
        "&:hover": {
          backgroundColor: hoverColor,
        },
        ...sx,
      }}
      startIcon={Icon && !isLoading ? <Icon /> : null}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? <CircularProgress size={18} color="inherit" /> : children}
    </MuiButton>
  );
}
