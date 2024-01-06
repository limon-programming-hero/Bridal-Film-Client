import { AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { ProgressBar } from "react-loader-spinner";
import { Link } from "react-router-dom";
import rowAnimation from "../../Pages/Shared/Animation/rowAnimation";
import { motion } from "framer-motion";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useState } from "react";
import UseAuth from "../../Hooks/UseAuth";
import { PropTypes } from "prop-types";
import { useQuery } from "@tanstack/react-query";
import titleCSS from "../../Pages/Shared/CSS/DashboardTitle";

const ManageItems = ({ fromUser }) => {
  const { user, loading } = UseAuth();
  const [axiosSecure] = UseAxiosSecure();
  const [localLoading, setLocalLoading] = useState(); //loading is used to show dynamic deleting button

  const {
    data: items = [],
    isLoading: isItemsLoading,
    refetch: isItemsRefetch,
  } = useQuery({
    queryKey: ["items", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/items/dashboard?email=${user?.email}`
      );
      console.log(res?.data);
      return res?.data;
    },
  });

  // fromUser && setAllItem(userItems);
  console.log({ items, isItemsLoading });

  const deleteItemHandler = async (id) => {
    setLocalLoading(true);
    !loading && //checking user loaded or not
      (await axiosSecure
        .delete(`/items/${id}?email=${user?.email}`)
        .then(() => {
          isItemsRefetch();
          setLocalLoading(false);
        }));
  };
  const permitHandler = async (id) => {
    !loading && //checking user loaded or not
      (await axiosSecure
        .patch(`/item/permit/${id}?email=${user?.email}`)
        .then(() => {
          isItemsRefetch();
        }));
  };

  return (
    <div className="w-full">
      <h3 className="text-2xl font-semibold my-8">
        Total item: {items.length}
      </h3>
      <h3 className={titleCSS}>Manage All Items</h3>
      <div className="mx-auto">
        <table className="text-xs md:text-sm">
          {/* head */}
          <thead>
            <tr>
              <th className="pr-3">Item</th>
              <th className="pr-3">Description</th>
              <th className="pr-3">Category</th>
              <th className="pr-3">Likes</th>
              {fromUser || <th className=" pr-4">Shared</th>}
              <th className=" pr-4">Status</th>
              {fromUser || <th className=" pr-4">Edit</th>}
              <th className=" pr-4">Action</th>
            </tr>
          </thead>
          <tbody className="text-xs md:text-sm ">
            {/* row 1 */}
            {!isItemsLoading &&
              items?.map((item, index) => (
                <motion.tr
                  initial={"initial"}
                  animate={"animate"}
                  custom={index}
                  key={index}
                  viewport={{ once: true }}
                  variants={rowAnimation}
                >
                  <td className="lg:mr-5 pr-2 py-3">
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={item?.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold">{item?.title}</div>
                        <div className="text-xs font-semibold">
                          {item?.date}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="max-w-[250px]  text-xs">{item?.body}</td>
                  <td className="lg:mr-5 pr-2 py-3">{item?.category}</td>
                  <td className="lg:mr-5 pr-2 py-3">
                    {item?.likes ? item?.likes : 0}
                  </td>
                  {fromUser || (
                    <td className="text-xs">
                      {item?.sharedEmail ? item?.sharedEmail : "Admin"}
                    </td>
                  )}
                  <td className="lg:mr-5 pr-2 py-3 capitalize">
                    {fromUser ? (
                      item?.status
                    ) : (
                      <button
                        className="btn btn-xs btn-ghost"
                        onClick={() => permitHandler(item?._id)}
                      >
                        {item?.status}
                      </button>
                    )}
                  </td>

                  {fromUser || (
                    <td>
                      <Link
                        className="btn btn-ghost"
                        to={`/dashboard/updateItem/${item?._id}`}
                      >
                        <MdEdit />
                      </Link>
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
                        onClick={() => deleteItemHandler(item?._id)}
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
  );
};

export default ManageItems;

ManageItems.propTypes = {
  fromUser: PropTypes.bool,
};
