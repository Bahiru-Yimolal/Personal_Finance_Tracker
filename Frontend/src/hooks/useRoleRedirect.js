// hooks/useRoleRedirect.js
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/auth/redux/authSlice";
import { navigateBasedOnRole } from "../utils/navigation";


export const useRoleRedirect = (navigate) => {
  const currentUser = useSelector(selectUser);

  useEffect(() => {
    if (!currentUser?.role) return;
    navigateBasedOnRole(currentUser.role, navigate);
  }, [currentUser, navigate]);
};
