// src/components/sidebar/sidebarConfig.js
import {
  Dashboard,
  Assignment,
  Payment,
  Description,
  People,
  Settings,
  BarChart,
} from "@mui/icons-material";
import LogoutIcon from '@mui/icons-material/Logout';

/**
 * Sidebar Menu Configuration
 * - Role-based
 * - Tree / chapter style
 * - Enterprise scalable
 */

export const SIDEBAR_MENU = [
  {
    id: "admin-dashboard",
    translationKey: "dashboardMenu",
    icon: Dashboard,
    path: "/admin/dashboard",
    roles: ["ADMIN"],
  },
  {
    id: "admin-transactions",
    translationKey: "allTransactions",
    icon: BarChart,
    path: "/admin/all-transactions",
    roles: ["ADMIN"],
  },
  {
    id: "admin-users",
    translationKey: "users",
    icon: People,
    path: "/admin/users",
    roles: ["ADMIN"],
  },

  // Dashboard
  {
    id: "dashboard",
    translationKey: "dashboardMenu",
    icon: BarChart,
    path: "/dashboard",
    roles: ["USER"],
  },

  // New Transaction
  {
    id: "new-transaction",
    translationKey: "newTransaction",
    icon: Assignment,
    path: "/transaction",
    roles: ["USER", "ADMIN"],
  },

  // My Transactions
  {
    id: "my-transactions",
    translationKey: "myTransactions",
    icon: Description,
    path: "/mytransactions",
    roles: ["USER", "ADMIN"],
  },

  // Profile
  {
    id: "profile",
    translationKey: "profile",
    icon: People,
    path: "/profile",
    roles: ["USER", "ADMIN"],
  },

  // Change Password
  {
    id: "change-password",
    translationKey: "changePassword",
    icon: Settings,
    path: "/password",
    roles: ["USER", "ADMIN"],
  },

  // Logout
  {
    id: "logout",
    translationKey: "logout",
    icon: LogoutIcon,
    action: "logout",
    roles: ["USER", "ADMIN"],
  },
];
