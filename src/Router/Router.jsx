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
import ContactPage from "../Pages/Dashboard/ContactPage/ContactPage";
import Shop from "../Pages/Shop/Shop";
import ManageBooking from "./../Pages/Dashboard/Admin/ManageBooking/ManageBooking";
import UserBookingItems from "../Pages/Dashboard/User/UserBookingItems/UserBookingItems";
import AdminRoute from "./AdminRoute";
import Sessions from "../Pages/Dashboard/Admin/Sessions/Sessions";
import AddSession from "../Pages/Dashboard/Admin/AddSession/AddSession";
import UpdateSession from "../Pages/Dashboard/Admin/UpdateSession/UpdateSession";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "gallery",
        element: <Gallery />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "signUp",
        element: <SignUp />,
      },
      {
        path: "logIn",
        element: <LogIn />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "secret",
        element: <SecretPage />,
      },
      {
        path: "bookedSession",
        element: <UserBookingItems />,
      },
      //common routes
      {
        path: "contact",
        element: <ContactPage />,
      },
      // admin section
      {
        path: "manageUsers",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "manageItems",
        element: (
          <AdminRoute>
            <ManageItems />
          </AdminRoute>
        ),
      },
      {
        path: "manageBooking",
        element: (
          <AdminRoute>
            <ManageBooking />
          </AdminRoute>
        ),
      },
      {
        path: "manageSessions",
        element: (
          <AdminRoute>
            <Sessions />
          </AdminRoute>
        ),
      },
      {
        path: "addSession",
        element: (
          <AdminRoute>
            <AddSession />
          </AdminRoute>
        ),
      },
      {
        path: "updateSession/:id",
        element: (
          <AdminRoute>
            <UpdateSession />
          </AdminRoute>
        ),
      },
      {
        path: "adminHome",
        element: (
          <AdminRoute>
            <AdminHome />
          </AdminRoute>
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
