import axios from "axios";
import { useEffect } from "react";
import UseAuth from "./UseAuth";
import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
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
          // Swal.fire({
          //   position: "top-end",
          //   icon: "warning",
          //   title: `${error.response?.data?.message}`,
          //   showConfirmButton: false,
          //   timer: 1500,
          // });
          console.log(error);
          await logOut().then((res) => console.log(res));
          navigate("/logIn");
        }
        return Promise.reject(error);
      }
    );
  }, [logOut, navigate]);
  return [axiosSecure];
};

export default UseAxiosSecure;
