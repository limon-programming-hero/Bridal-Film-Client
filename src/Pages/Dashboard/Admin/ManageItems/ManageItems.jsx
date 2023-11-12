import { AiFillDelete } from "react-icons/ai";
import UseItems from "../../../../Hooks/UseItems";
import { useState } from "react";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import UseAuth from "../../../../Hooks/UseAuth";
import { ProgressBar } from "react-loader-spinner";

const ManageItems = () => {
  const { user, loading } = UseAuth();
  const [axiosSecure] = UseAxiosSecure();
  const [localLoading, setLocalLoading] = useState(); //loading is used to show dynamic deleting button
  const { items, isItemsLoading, isItemsRefetch } = UseItems();
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
  return (
    <div className="mx-auto">
      <h3 className="text-2xl font-semibold my-8">
        Total item: {items.length}
      </h3>
      <h3 className="text-4xl text-secondary font-semibold text-center mb-5">
        Manage All Items
      </h3>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Item</th>
              <th>Description</th>
              <th>Category</th>
              <th>Likes</th>
              <th>Shared</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {!isItemsLoading &&
              items.map((item, index) => (
                <tr key={index}>
                  <td>
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
                  <td className="max-w-[250px] text-xs">{item?.body}</td>
                  <td>{item?.category}</td>
                  <td>{item?.likes ? item?.likes : 0}</td>
                  <td className="text-xs">{item?.sharedEmail}</td>
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
                        onClick={() => deleteItemHandler(item?._id)}
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

export default ManageItems;
