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
import DashboardLayout from "../Layout/DashboardLayout";
import AdminHome from "../Pages/Dashboard/Admin/AdminHome/AdminHome";
import ManageItems from "../Pages/Dashboard/Admin/ManageItems/ManageItems";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers/ManageUsers";

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
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "secret",
        element: <SecretPage></SecretPage>,
      },
      // admin section
      {
        path: "manageUsers",
        element: <ManageUsers></ManageUsers>,
      },
      {
        path: "manageItems",
        element: <ManageItems></ManageItems>,
      },
      {
        path: "adminHome",
        element: <AdminHome></AdminHome>,
      },
    ],
  },
  {
    path: "/*",
    element: <Error404></Error404>,
  },
]);

export default router;
