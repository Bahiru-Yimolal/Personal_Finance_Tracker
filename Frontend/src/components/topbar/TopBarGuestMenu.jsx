// src/components/topbar/TopBarGuestMenu.jsx
import React from "react";
import { Drawer, List, ListItemButton, ListItemText, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

const guestMenuItems = [
  { id: 1, label: "Home", path: "/" },
  { id: 2, label: "About Us", path: "/about" },
  { id: 3, label: "Contact Us", path: "/contact" },
];

const TopBarGuestMenu = ({ open, onClose }) => {
  const navigate = useNavigate();

  return (
    <Drawer open={open} onClose={onClose} ModalProps={{ keepMounted: true }}>
      <List>
        {guestMenuItems.map((item) => (
          <ListItemButton
            key={item.id}
            onClick={() => {
              navigate(item.path);
              onClose();
            }}
          >
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
};

export default TopBarGuestMenu;
