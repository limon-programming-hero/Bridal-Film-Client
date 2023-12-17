import Swal from "sweetalert2";
import UseAuth from "../../../../Hooks/UseAuth";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import UseBooking from "../../../../Hooks/UseBooking";
import Loader from "../../../Shared/Loader/Loader";
import { AiFillDelete } from "react-icons/ai";
import { useState } from "react";
import { LineWave } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const UserBookingItems = () => {
  const { user, loading } = UseAuth();
  const { bookingItems, isBookingLoading, bookingRefetch } = UseBooking();
  const [axiosSecure] = UseAxiosSecure();
  const totalPrice = bookingItems?.reduce(
    (total, { price }) => total + price,
    0
  );
  const totalAmount = parseFloat(totalPrice?.toFixed(2));

  const [localLoader, setLocalLoader] = useState(false);
  const deleteBookingHandler = async (id) => {
    setLocalLoader(true);
    // console.log(id);
    const res =
      !loading &&
      (await axiosSecure.delete(`/booking/${id}?email=${user?.email}`));
    res?.data?.deletedCount &&
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Item deleted!",
        showConfirmButton: false,
        timer: 600,
      });
    bookingRefetch();
    setLocalLoader(false);
  };
  return (
    <div className="mx-auto">
      <Helmet>
        <title>Booking Items | Bridal Film</title>
      </Helmet>
      {isBookingLoading && <Loader className="mx-auto"></Loader>}
      {localLoader && (
        <div className="flex justify-center">
          <LineWave
            height="100"
            width="100"
            color="text-secondary"
            ariaLabel="line-wave"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            firstLineColor=""
            middleLineColor=""
            lastLineColor=""
          />
        </div>
      )}
      {bookingItems && (
        <>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold my-8">
              Total Price: $ {totalAmount}
            </h3>
            {totalPrice ? (
              <Link
                className="btn btn-outline btn-ghost btn-secondary"
                to="/dashboard/makePayment"
              >
                <span className="hover:text-white text-secondary">Payment</span>
              </Link>
            ) : (
              <p></p>
            )}
          </div>

          <h3 className="text-4xl text-secondary font-semibold text-center mb-5">
            Confirm Book!
          </h3>

          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Booked Session</th>
                  <th>User</th>
                  <th>Date</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {bookingItems.map(
                  ({ sessionType, _id, name, email, date, price }, index) => (
                    <tr key={index}>
                      <td className="max-w-[250px] text-xs">{sessionType}</td>
                      <td>
                        <div>
                          <div className="font-semibold">{name}</div>
                          <div className="text-xs">{email}</div>
                        </div>
                      </td>
                      <td>
                        <div>
                          <div className="font-semibold">{date?.date}</div>
                          <div className="text-xs font-semibold">
                            {date?.time}
                          </div>
                        </div>
                      </td>
                      <td>$ {price}</td>
                      <td
                        onClick={() => deleteBookingHandler(_id)}
                        className="btn btn-ghost hover:bg-red-500 bg-white hover:text-white text-red-500 py-2"
                      >
                        <AiFillDelete />
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default UserBookingItems;
