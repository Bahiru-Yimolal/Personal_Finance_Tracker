// src/components/Layouts/DashboardLayout.jsx
import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import Sidebar from "../sidebar/Sidebar";
import TopBar from "../topbar/TopBar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const DashboardLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useMediaQuery("(max-width:900px)");

  // Example: get user info from redux
  const user = useSelector((state) => state.auth.userInfo);

  return (
    <>
      {/* TOP BAR */}
      <TopBar
        pageTitle="Dashboard"
        user={user}
        showSidebarToggle={isMobile} // Sidebar handles mobile drawer
        onToggleSidebar={() => setMobileOpen((p) => !p)}
        clickableTitle={false}
      />

      <Box display="flex" minHeight="100vh">
        {/* SIDEBAR */}
        <Sidebar
          collapsed={collapsed}
          toggleSidebar={() => setCollapsed((p) => !p)}
          isMobile={isMobile}
          mobileOpen={mobileOpen}
          closeMobile={() => setMobileOpen(false)}
        />

        {/* CONTENT */}
        <Box
          component="main"
          flex={1}
          p={2}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default DashboardLayout;
