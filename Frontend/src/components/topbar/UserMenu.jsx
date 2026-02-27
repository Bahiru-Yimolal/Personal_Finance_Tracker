// src/components/topbar/UserMenu.jsx
import React, { useState } from "react";
import { Menu, MenuItem, IconButton, Avatar } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/redux/authSlice";
import { apiSlice } from "../../app/apiSlice";

import { useTranslation } from "../../hooks/useTranslation";

const UserMenu = ({ user }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const goTo = (path) => {
    navigate(path);
    handleClose();
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(apiSlice.util.resetApiState());
    handleClose();
    navigate("/", { replace: true });
  };

  return (
    <>
      <IconButton onClick={handleOpen} size="small">
        <Avatar>
          {user?.first_name?.[0] || "U"}
        </Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={() => goTo("/profile")}>
          {t('profile')}
        </MenuItem>

        <MenuItem onClick={() => goTo("/password")}>
          {t('changePassword')}
        </MenuItem>

        <MenuItem onClick={handleLogout}>
          {t('logout')}
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
