import React from "react";
import { Paper, Typography } from "@mui/material";
import clsx from "clsx";

const AuthLayout = ({
  title,
  subtitle,
  children,
  paperClassName,
  containerClassName,
}) => {
  return (
    <div
      className={clsx(
        "min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-white p-4",
        containerClassName
      )}
    >
      <Paper
        elevation={8}
        className={clsx(
          "w-full p-8 rounded-xl shadow-lg bg-white",
          // defaults only if not overridden
          !paperClassName?.includes("max-w-") && "max-w-md",
          !paperClassName?.includes("min-h-") && "min-h-[450px]",
          paperClassName
        )}
      >
        {title && (
          <Typography
            variant="h4"
            className="text-center font-bold mb-3 text-indigo-700"
          >
            {title}
          </Typography>
        )}

        {subtitle && (
          <Typography
            variant="body1"
            className="text-center mb-8 mt-8 text-gray-600"
          >
            {subtitle}
          </Typography>
        )}

        {children}
      </Paper>
    </div>
  );
};

export default AuthLayout;
