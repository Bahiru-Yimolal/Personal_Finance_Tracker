// ThemeSwitch.jsx
import React from "react";
import { IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../features/ui/redux/uiSlice";

const ThemeSwitch = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.ui.theme);

  return (
    <IconButton onClick={() => dispatch(toggleTheme())} color="inherit">
      {theme === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};

export default ThemeSwitch;
