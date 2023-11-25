import { Navigate, useLocation } from "react-router-dom";
import UseAuth from "./../Hooks/UseAuth";
import { PropTypes } from "prop-types";

const PrivateRoute = ({ children }) => {
  const { user } = UseAuth();
  const location = useLocation();
  if (!user) {
    return <Navigate to="/logIn" state={{ from: location }} replace />;
  } else {
    return children;
  }
};

export default PrivateRoute;

PrivateRoute.propTypes = {
  children: PropTypes.object.isRequired,
};
