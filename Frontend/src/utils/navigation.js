// src/utils/navigation.js

/**
 * Redirects user based on role
 * @param {string} role - user role (e.g., "admin", "user", "guest")
 * @param {function} navigate - react-router's navigate function
 */
export const navigateBasedOnRole = (role, navigate) => {
  switch (role) {
    case "ADMIN":
      navigate("/admin/dashboard", { replace: true });
      break;
    case "USER":
      navigate("/dashboard", { replace: true }); // Dashboard for normal users
      break;
    // case "guest":
    //   navigate("/guest", { replace: true });
    //   break;
    default:
      navigate("/login", { replace: true }); // fallback to login
      break;
  }
};
