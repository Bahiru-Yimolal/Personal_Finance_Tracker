import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectRole } from "../../features/auth/redux/authSlice";


const RoleRoute = ({ allowedRoles }) => {
  const role = useSelector(selectRole);

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default RoleRoute;
