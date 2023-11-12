import { AiFillDelete } from "react-icons/ai";
import UseUsers from "../../../../Hooks/UseUsers";
import { RiAdminFill } from "react-icons/ri";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import { useState } from "react";
import { ProgressBar } from "react-loader-spinner";
import UseAuth from "../../../../Hooks/UseAuth";

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
      <div className="overflow-x-auto text-xl">
        <h3 className="text-2xl font-semibold my-8">
          Total User: {users.length}
        </h3>
        <h3 className="text-4xl text-secondary font-semibold text-center mb-5">
          Manage All User
        </h3>
        <table className="table">
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
              users.map((user, index) => (
                <tr key={index}>
                  <td>
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
                  <th>
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
                  </th>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
