import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "../assets/logo.png";
import { AiFillHome, AiOutlineUsergroupDelete } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";
import { BsFillCartCheckFill, BsFillTelephoneFill } from "react-icons/bs";
import { FaBookOpen, FaHome, FaShoppingCart } from "react-icons/fa";
import UseIsAdmin from "./../Hooks/UseIsAdmin";
const DashboardLayout = () => {
  const { isAdmin, isAdminLoading } = UseIsAdmin();
  console.log(!isAdminLoading && isAdmin);
  return (
    <div className="mx-auto max-w-[1280px]">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-start m-10 justify-center">
          <label
            htmlFor="my-drawer-2"
            className="btn bg-slate-300 drawer-button lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
            Open Menu
          </label>
          {/* Page content here */}
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-slate-300 flex flex-col gap-y-2 p-4 w-80 min-h-full">
            {/* Sidebar content here */}
            <li>
              <Link className="bg-white rounded-s-full bg-opacity-20" to="/">
                <img className="w-40 h-fit " src={logo} alt="Bridal Film" />
              </Link>
            </li>
            {!isAdminLoading && isAdmin?.isAdmin ? (
              <div className="flex flex-col gap-y-2">
                <li>
                  <NavLink to="/dashboard/adminHome">
                    <AiFillHome /> Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manageUsers">
                    <AiOutlineUsergroupDelete />
                    Users
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manageItems">
                    <BsFillCartCheckFill />
                    Items
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/addItem">
                    <BsFillCartCheckFill />
                    Add Item
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manageBooking">
                    <FaBookOpen />
                    Booking
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manageSessions">
                    <FaShoppingCart /> Sessions
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/addSession">
                    <IoIosAddCircle /> Add Session
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/allPayment">
                    <IoIosAddCircle /> Payments
                  </NavLink>
                </li>
              </div>
            ) : (
              <div className="flex flex-col gap-y-2">
                <li>
                  <NavLink to="/dashboard/userHome">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/bookedSession">
                    Booked Sessions
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/userPaymentHistory">
                    Payment History
                  </NavLink>
                </li>
              </div>
            )}
            <div className="divider"></div>
            <li>
              <NavLink to="/home">
                <FaHome /> Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/shop">
                <FaShoppingCart /> Shop
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/contact">
                <BsFillTelephoneFill /> Contact Us
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
