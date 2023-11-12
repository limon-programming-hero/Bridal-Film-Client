import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/logo.png";
import UseAuth from "../../../Hooks/UseAuth";
import { BsFillCartCheckFill } from "react-icons/bs";
import Swal from "sweetalert2";
const Navbar = () => {
  const { user, loading, logOut } = UseAuth();
  const handlerLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successfully logged out!",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };
  const list = (
    <div className="flex flex-col lg:flex-row gap-x-3">
      <li>
        <NavLink className="focus:glass" to="/blog">
          Blog
        </NavLink>
      </li>
      <li>
        <NavLink className="focus:glass" to="/gallery">
          Gallery
        </NavLink>
      </li>
      <li>
        <NavLink className="focus:glass" to="/about">
          About Me
        </NavLink>
      </li>
      {user && !loading && (
        <li>
          <NavLink className="focus:glass" to="/dashboard">
            <BsFillCartCheckFill></BsFillCartCheckFill>
          </NavLink>
        </li>
      )}
      <li>
        {user ? (
          <button onClick={handlerLogOut} className="focus:glass">
            Log out
          </button>
        ) : (
          <NavLink className="focus:glass" to="/logIn">
            LogIn
          </NavLink>
        )}
      </li>
    </div>
  );
  return (
    <div className="navbar z-20 text-white bg-black bg-opacity-60 ">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 h-fit bg-slate-600"
          >
            {list}
          </ul>
        </div>
        <Link className="bg-white rounded-s-full bg-opacity-20" to="/">
          <img className="w-40 h-fit " src={logo} alt="Bridal Film" />
        </Link>
      </div>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{list}</ul>
      </div>
    </div>
  );
};

export default Navbar;
