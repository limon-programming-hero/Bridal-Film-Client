import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home/Home";
import Gallery from "../Pages/Gallery/Gallery";
import Blog from "../Pages/Blog/Blog";
import About from "../Pages/About/About";
import Error404 from "../Pages/Error404/Error404";
import SignUp from "../Pages/SignUp/SignUp";
import LogIn from "../Pages/LogIn/LogIn";
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
import Payment from "../Pages/Dashboard/Payments/Payment";
import AllPayments from "../Pages/Dashboard/Admin/AllPayments/AllPayments";
import UserPayment from "../Pages/Dashboard/User/UserPayment/UserPayment";
import UpdateItem from "../Pages/Dashboard/Admin/UpdateItem/UpdateItem";
import AddItems from "../Pages/Dashboard/Admin/AddItems/AddItems";
import UserHome from "../Pages/Dashboard/User/UserHome/UserHome";

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
      // user
      {
        path: "userHome",
        element: <UserHome />,
      },
      {
        path: "makePayment",
        element: <Payment />,
      },

      {
        path: "userPaymentHistory",
        element: <UserPayment />,
      },
      //common routes
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "bookedSession",
        element: <UserBookingItems />,
      },
      // admin section
      {
        path: "adminHome",
        element: (
          <AdminRoute>
            <AdminHome />
          </AdminRoute>
        ),
      },
      {
        path: "manageUsers",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "allPayment",
        element: (
          <AdminRoute>
            <AllPayments />
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
        path: "addItem",
        element: (
          <AdminRoute>
            <AddItems />
          </AdminRoute>
        ),
      },
      {
        path: "updateItem/:id",
        element: (
          <AdminRoute>
            <UpdateItem />
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
