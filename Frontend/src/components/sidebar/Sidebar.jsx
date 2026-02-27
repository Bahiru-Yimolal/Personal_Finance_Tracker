import React from "react";
import {
  Drawer,
  List,
  Box,
  IconButton,
  Typography,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import SidebarItem from "./SidebarItem";
import { useRoleMenu } from "../../hooks/useRoleMenu";
import { useTranslation } from "../../hooks/useTranslation";

const DRAWER_WIDTH = 250;
const COLLAPSED_WIDTH = 72;

const Sidebar = ({
  collapsed,
  toggleSidebar,
  isMobile,
  mobileOpen,
  closeMobile,
}) => {
  const menu = useRoleMenu();
  const width = collapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH;
  const { t } = useTranslation();

  // 🔴 MOBILE SIDEBAR (TEMPORARY)
  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={closeMobile}
        ModalProps={{ keepMounted: true }}
        sx={{
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
          },
        }}
      >
        <Box px={2} py={1.5}>
          <Typography variant="h6">{t('appName')}</Typography>
        </Box>
        <Divider />

        <List>
          {menu.map((item) => (
            <SidebarItem
              key={item.id}
              item={item}
              collapsed={false}
              onItemClick={closeMobile}
            />
          ))}
        </List>

      </Drawer>
    );
  }

  // 🟢 DESKTOP SIDEBAR (PERMANENT)
  return (
    <Drawer
      variant="permanent"
      sx={{
        width,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width,
          transition: "width 0.3s",
        },
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent={collapsed ? "center" : "space-between"}
        px={2}
        py={1.5}
      >
        {!collapsed && <Typography fontWeight="bold">{t('appName')}</Typography>}
        <IconButton onClick={toggleSidebar} color="inherit">
          {collapsed ? <MenuIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Box>

      <Divider />

      <List>
        {menu.map((item) => (
          <SidebarItem
            key={item.id}
            item={item}
            collapsed={collapsed}
          />
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
