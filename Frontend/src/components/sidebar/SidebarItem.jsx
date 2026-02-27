import React, { useState } from "react";
import {
  Collapse,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/redux/authSlice";
import { apiSlice } from "../../app/apiSlice";

const SidebarItem = ({ item, level = 0, collapsed, onItemClick }) => {
  const [open, setOpen] = useState(false);
  const hasChildren = item.children?.length > 0;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {

    if (item.action === "logout") {
      dispatch(logout());

      // 🔐 Clear all cached API data
      dispatch(apiSlice.util.resetApiState());

      navigate("/", { replace: true });
      return;
    }
    // 🟡 2. TOGGLE NESTED MENU
    if (hasChildren) {
      setOpen((prev) => !prev);
      return;
    }

    // 🟢 3. NORMAL NAVIGATION
    if (item.path) {
      navigate(item.path);
      onItemClick?.(); // ✅ CLOSE SIDEBAR ON MOBILE
    }
  };

  const content = (
    <ListItemButton
      sx={{
        pl: collapsed ? 2 : 2 + level * 2,
        justifyContent: collapsed ? "center" : "flex-start",
      }}
      onClick={handleClick}
    >
      {item.icon && (
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: collapsed ? 0 : 2,
            justifyContent: "center",
          }}
        >
          <item.icon />
        </ListItemIcon>
      )}

      {!collapsed && <ListItemText primary={item.label} />}

      {!collapsed && hasChildren && (open ? <ExpandLess /> : <ExpandMore />)}
    </ListItemButton>
  );

  return (
    <>
      {collapsed ? (
        <Tooltip title={item.label} placement="right">
          {content}
        </Tooltip>
      ) : (
        content
      )}

      {hasChildren && !collapsed && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          {item.children.map((child) => (
            <SidebarItem
              key={child.id}
              item={child}
              level={level + 1}
              collapsed={collapsed}
              onItemClick={onItemClick} // ✅ PASS IT DOWN
            />
          ))}
        </Collapse>
      )}
    </>
  );
};

export default SidebarItem;
