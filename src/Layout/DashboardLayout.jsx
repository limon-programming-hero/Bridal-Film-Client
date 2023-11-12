import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "../assets/logo.png";
import { useQuery } from "@tanstack/react-query";
import UseAuth from "../Hooks/UseAuth";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import { AiFillHome, AiOutlineUsergroupDelete } from "react-icons/ai";
import { BsFillCartCheckFill, BsFillTelephoneFill } from "react-icons/bs";
const DashboardLayout = () => {
  const { user, loading } = UseAuth();
  const [axiosSecure] = UseAxiosSecure();
  const { data: userFromDb, isLoading: isUserLoading } = useQuery({
    queryKey: [user?.email, "users"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res?.data[0];
    },
  });
  // console.log(userFromDb);
  return (
    <div>
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
            {!isUserLoading && userFromDb?.role === "admin" ? (
              <div className="flex flex-col gap-y-2">
                <li>
                  <NavLink to="/dashboard/adminHome">
                    <AiFillHome></AiFillHome> Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manageUsers">
                    <AiOutlineUsergroupDelete></AiOutlineUsergroupDelete> Users
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manageItems">
                    <BsFillCartCheckFill></BsFillCartCheckFill>Items
                  </NavLink>
                </li>
              </div>
            ) : (
              <div className="flex flex-col gap-y-2">
                <li>
                  <NavLink to="/dashboard/secret">Home</NavLink>
                </li>
              </div>
            )}
            <li>
              <NavLink to="/dashboard/secret">
                <BsFillTelephoneFill></BsFillTelephoneFill> Contact Us
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
