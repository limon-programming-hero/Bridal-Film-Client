import axios from "axios";
import { useEffect } from "react";
import UseAuth from "./UseAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: "https://bridal-film-server.vercel.app",
});

const UseAxiosSecure = () => {
  const { logOut } = UseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure.interceptors.request.use(function (config) {
      // Do something before request is sent
      const token = localStorage.getItem("jwt-token");
      if (token) {
        const jwtToken = `Bearer ${token}`;
        config.headers.authorization = jwtToken;
      }
      return config;
    });

    // Add a response interceptor
    axiosSecure.interceptors.response.use(
      (response) => response,

      async (error) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          await logOut();
          navigate("/logIn");
        }
        return Promise.reject(error);
      }
    );
  }, [logOut, navigate]);
  return [axiosSecure];
};

export default UseAxiosSecure;
