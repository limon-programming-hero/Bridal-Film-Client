import { useContext } from "react";
import { authContext } from "../authProvider/AuthContextProvider";

const UseAuth = () => {
  const userContext = useContext(authContext);
  return userContext;
};

export default UseAuth;
