import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home/Home";
import Gallery from "../Pages/Gallery/Gallery";
import Blog from "../Pages/Blog/Blog";
import About from "../Pages/About/About";
import Error404 from "../Pages/Error404/Error404";
import SignUp from "../Pages/SignUp/SignUp";
import LogIn from "../Pages/LogIn/LogIn";
import SecretPage from "./../Pages/SecretPage/SecretPage";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      { path: "", element: <Home></Home> },
      { path: "home", element: <Home></Home> },
      { path: "gallery", element: <Gallery></Gallery> },
      { path: "blog", element: <Blog></Blog> },
      { path: "about", element: <About></About> },
      { path: "blog", element: <Blog></Blog> },
      { path: "signUp", element: <SignUp></SignUp> },
      { path: "logIn", element: <LogIn></LogIn> },
      {
        path: "secret",
        element: (
          <PrivateRoute>
            <SecretPage></SecretPage>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/*",
    element: <Error404></Error404>,
  },
]);

export default router;
