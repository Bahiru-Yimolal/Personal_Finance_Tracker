import React from "react";
import { Typography } from "@mui/material";

/**
 * RedirectLink
 * - Small reusable link text for auth pages
 * - Handles consistent styling
 * - onClick triggers navigation
 */
const RedirectLink = ({ text, redirectText, text2,redirectText2, onClick,onClick2, sx }) => (
  <Typography
    variant="body1"
    color="textSecondary"
    // className="text-center"
    sx={sx}
  >
    {text}{" "}
    <span
      className="text-indigo-600 cursor-pointer hover:underline"
      onClick={onClick}
    >
      {redirectText}
    </span>
        {text2}{" "}
        <span
      className="text-indigo-600 cursor-pointer hover:underline"
      onClick={onClick2}
    >
      {redirectText2}
    </span>
  </Typography>
);

export default RedirectLink;
