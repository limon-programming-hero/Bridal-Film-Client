import { AiFillDelete } from "react-icons/ai";
import UseUsers from "../../../../Hooks/UseUsers";
import { RiAdminFill } from "react-icons/ri";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import { useState } from "react";
import { ProgressBar } from "react-loader-spinner";
import UseAuth from "../../../../Hooks/UseAuth";
import { motion } from "framer-motion";
import rowAnimation from "../../../Shared/Animation/rowAnimation";
import { Helmet } from "react-helmet";
import titleCSS from "../../../Shared/CSS/DashboardTitle";

const ManageUsers = () => {
  const { user, loading } = UseAuth();
  const [localLoading, setLocalLoading] = useState(false);
  const [axiosSecure] = UseAxiosSecure();
  const { users, isUsersLoading, usersRefetch } = UseUsers();

  //  delete handler for delete user
  const deleteUserHandler = async (id) => {
    setLocalLoading(true);
    !loading && //checking user loaded or not
      (await axiosSecure
        .delete(`/users/${id}?email=${user?.email}`)
        .then(() => {
          usersRefetch();
          setLocalLoading(false);
        }));
  };
  //   update handler for update user
  const updateUserHandler = async (id) => {
    setLocalLoading(true);
    const updateInfo = {
      id: id,
      role: "admin",
    };

    !loading && //checking user loaded or not
      (await axiosSecure
        .patch(`/users?email=${user?.email}`, {
          updateInfo,
        })
        .then((res) => {
          console.log(res);
          usersRefetch();
          setLocalLoading(false);
        }));
  };

  return (
    <div className="mx-auto">
      <Helmet>
        <title>Manage Users | Bridal Film</title>
      </Helmet>
      <div className="w-full text-xl">
        <h3 className="text-2xl font-semibold my-8">
          Total User: {users.length}
        </h3>
        <h3 className={titleCSS}>Manage All User</h3>
        <div>
          <table className="md:table text-xs md:text-sm">
            {/* head */}
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* rows */}
              {!isUsersLoading &&
                users?.map((user, index) => (
                  <motion.tr
                    initial={"initial"}
                    animate={"animate"}
                    custom={index}
                    key={index}
                    viewport={{ once: true }}
                    variants={rowAnimation}
                  >
                    <td className="py-3">
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={user?.image} alt="User Profile" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{user?.name}</div>
                        </div>
                      </div>
                    </td>
                    <td>{user?.email}</td>
                    {user?.role === "admin" ? (
                      <td className="capitalize">{user?.role}</td>
                    ) : (
                      <td>
                        {localLoading ? (
                          <ProgressBar //if update promise is loading
                            height="80"
                            width="80"
                            ariaLabel="progress-bar-loading"
                            wrapperStyle={{}}
                            wrapperClass="progress-bar-wrapper"
                            borderColor="black"
                            barColor="rgb(255, 145, 0)"
                          />
                        ) : (
                          <button
                            onClick={() => updateUserHandler(user?._id)}
                            className="btn btn-ghost text-xs font-semibold"
                          >
                            <RiAdminFill className="text-xl"></RiAdminFill>
                          </button>
                        )}
                      </td>
                    )}
                    <td>
                      {localLoading ? ( //if delete promise is loading
                        <ProgressBar
                          height="60"
                          width="80"
                          ariaLabel="progress-bar-loading"
                          wrapperStyle={{}}
                          wrapperClass="progress-bar-wrapper"
                          borderColor="black"
                          barColor="rgb(255, 145, 0)"
                        />
                      ) : (
                        <button
                          onClick={() => deleteUserHandler(user?._id)}
                          className="btn btn-ghost text-lg text-red-600 hover:text-white hover:bg-red-600"
                        >
                          <AiFillDelete />
                        </button>
                      )}
                    </td>
                  </motion.tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
