// src/components/topbar/Notifications.jsx
import React, { useState } from "react";
import { Menu, MenuItem, IconButton, Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Notifications = ({ notifications = [], user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const filteredNotifications = notifications.filter((n) =>
    !n.roles || n.roles.includes(user?.role)
  );

  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Badge badgeContent={filteredNotifications.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose}>
        {filteredNotifications.length === 0 ? (
          <MenuItem>No notifications</MenuItem>
        ) : (
          filteredNotifications.map((n, idx) => <MenuItem key={idx}>{n.message}</MenuItem>)
        )}
      </Menu>
    </>
  );
};

export default Notifications;
