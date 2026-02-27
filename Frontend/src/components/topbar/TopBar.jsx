// src/components/topbar/TopBar.jsx
import React from "react";
import { Box, Typography, IconButton, useMediaQuery, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import UserMenu from "./UserMenu";
import Notifications from "./Notifications";
import LanguageSwitch from "./LanguageSwitch";
import ThemeSwitch from "./ThemeSwitch";
import { useTranslation } from "../../hooks/useTranslation";
import { useSelector } from "react-redux";

const TopBar = ({
  pageTitle = "",
  user = null,                  // null = guest
  showSidebarToggle = false,    // only true for guest
  onToggleSidebar,
  onLoginOpen,
  onRegisterOpen,
  clickableTitle = false,
  titleOnClick,
  notifications = [],
  px = 2,
  py = 0.9
}) => {
  const isMobile = useMediaQuery("(max-width:900px)");
  const { t } = useTranslation();
  const theme = useSelector((state) => state.ui.theme);
  const isDark = theme === 'dark';

  // Determine text/icon color for Guest mode
  const guestColor = isDark ? "white" : "text.primary";

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      px={px}
      py={py}
      bgcolor={user ? "background.paper" : isDark ? "rgba(10, 15, 28, 0.8)" : "rgba(255, 255, 255, 0.8)"}
      borderBottom={user ? "1px solid" : isDark ? "1px solid rgba(255, 255, 255, 0.05)" : "1px solid rgba(0, 0, 0, 0.05)"}
      borderColor="divider"
      position="sticky"
      top={0}
      zIndex={1200}
      className="backdrop-blur-md"
    >
      {/* LEFT SECTION */}
      <Box display="flex" alignItems="center" gap={1}>
        {showSidebarToggle && isMobile && (
          <IconButton onClick={onToggleSidebar} sx={{ color: user ? "inherit" : guestColor }}>
            <MenuIcon />
          </IconButton>
        )}

        <Typography
          variant="h6"
          fontWeight="900"
          sx={{
            cursor: clickableTitle ? "pointer" : "default",
            color: user ? "primary.main" : "#2563eb",
            letterSpacing: "-0.05em",
            fontSize: "1.4rem"
          }}
          onClick={clickableTitle ? titleOnClick : undefined}
        >
          {t('appName')}
        </Typography>
      </Box>

      {/* CENTER: Page Title (Hidden on small mobile if it crowds) */}
      {(!isMobile || pageTitle) && user && (
        <Box flex={1} textAlign="center" sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Typography variant="subtitle1" sx={{ color: "text.primary" }}>{pageTitle}</Typography>
        </Box>
      )}

      {/* RIGHT SECTION */}
      <Box display="flex" alignItems="center" gap={{ xs: 0.5, sm: 2 }} color={user ? "inherit" : guestColor}>
        {!user && !isMobile && (
          <Box display="flex" gap={1}>
            <Button
              onClick={onLoginOpen}
              className={`normal-case font-bold px-4 py-1.5 rounded-xl ${isDark ? 'text-white hover:bg-white/5' : 'text-slate-700 hover:bg-slate-100'}`}
            >
              {t('login')}
            </Button>
            <Button
              variant="contained"
              onClick={onRegisterOpen}
              className="normal-case font-bold px-5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20"
            >
              {t('register')}
            </Button>
          </Box>
        )}

        <Box display="flex" alignItems="center" gap={0.5}>
          <LanguageSwitch />
          <ThemeSwitch />
        </Box>

        {user && (
          <Notifications notifications={notifications} user={user} />
        )}
        {user && <UserMenu user={user} />}
      </Box>
    </Box>
  );
};

export default TopBar;
