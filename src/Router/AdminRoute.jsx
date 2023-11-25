import { Navigate, useLocation } from "react-router-dom";
import UseIsAdmin from "../Hooks/UseIsAdmin";
import { PropTypes } from "prop-types";

const AdminRoute = ({ children }) => {
  const { isAdmin, isAdminLoading } = UseIsAdmin();
  const location = useLocation();
  if (!isAdminLoading && isAdmin?.isAdmin) {
    return children;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }
};

export default AdminRoute;

AdminRoute.propTypes = {
  children: PropTypes.object.isRequired,
};
