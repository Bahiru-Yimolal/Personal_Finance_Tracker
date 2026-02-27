import React, { useState } from "react";
import { Box } from "@mui/material";
import TopBar from "../topbar/TopBar";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import RegisterModal from "../../features/auth/components/RegisterModal";
import LoginModal from "../../features/auth/components/LoginModal";

const HomeLayout = () => {
  const navigate = useNavigate();
  const theme = useSelector((state) => state.ui.theme);
  const isDark = theme === 'dark';

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const handleOpenLogin = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  };

  const handleOpenRegister = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  };

  return (
    <Box className={`min-h-screen ${isDark ? 'bg-[#0a0f1c]' : 'bg-slate-50'}`}>
      <TopBar
        pageTitle=""
        user={null} // guest
        showSidebarToggle={false}
        onLoginOpen={handleOpenLogin}
        onRegisterOpen={handleOpenRegister}
        clickableTitle={true}
        titleOnClick={() => navigate("/")}
        px={4}
        py={2}
      />

      <Box component="main">
        <Outlet context={{ onRegisterOpen: handleOpenRegister, onLoginOpen: handleOpenLogin }} />
      </Box>

      <RegisterModal
        open={isRegisterOpen}
        handleClose={() => setIsRegisterOpen(false)}
        openLogin={handleOpenLogin}
      />
      <LoginModal
        open={isLoginOpen}
        handleClose={() => setIsLoginOpen(false)}
        openRegister={handleOpenRegister}
      />
    </Box>
  );
};

export default HomeLayout;
