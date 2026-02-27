// LanguageSwitch.jsx
import React from "react";
import { IconButton, Typography, Box } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../../features/ui/redux/uiSlice";

const LanguageSwitch = () => {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.ui.language);

  const toggleLanguage = () => {
    dispatch(setLanguage(language === "en" ? "am" : "en"));
  };

  return (
    <IconButton onClick={toggleLanguage} color="inherit" sx={{ gap: 0.5 }}>
      <LanguageIcon fontSize="small" />
      <Typography
        variant="body2"
        sx={{
          fontWeight: 'bold',
          display: { xs: 'none', sm: 'block' } // Hide text on mobile to save space
        }}
      >
        {language === "en" ? "EN" : "አማ"}
      </Typography>
    </IconButton>
  );
};

export default LanguageSwitch;
