// src/components/topbar/TopBarItem.jsx
import React from "react";
import { IconButton, Badge, Tooltip } from "@mui/material";

const TopBarItem = ({ icon, badgeContent, tooltip, onClick }) => {
  const content = (
    <IconButton onClick={onClick}>
      {badgeContent ? <Badge badgeContent={badgeContent} color="error">{icon}</Badge> : icon}
    </IconButton>
  );

  return tooltip ? <Tooltip title={tooltip}>{content}</Tooltip> : content;
};

export default TopBarItem;
