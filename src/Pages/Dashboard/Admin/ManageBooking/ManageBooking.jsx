import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import Loader from "./../../../Shared/Loader/Loader";
import { motion } from "framer-motion";
import rowAnimation from "../../../Shared/Animation/rowAnimation";
import { Helmet } from "react-helmet";

const ManageBooking = () => {
  const [axiosSecure] = UseAxiosSecure();
  const {
    data: allBooking,
    isLoading: isBookingLoading,
    refetch,
  } = useQuery({
    queryKey: ["booking"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/booking`);
      return res?.data;
    },
  });
  const changeStatusHandler = async (id) => {
    const data = { status: "done" };
    const res = await axiosSecure.patch(`/booking/${id}`, {
      bookingData: data,
    });
    if (res?.data?.acknowledged) refetch();
  };
  return (
    <div className="mx-auto">
      <Helmet>
        <title>Manage Booking | Photography</title>
      </Helmet>
      {isBookingLoading && <Loader className="mx-auto"></Loader>}
      {allBooking && (
        <>
          <h3 className="text-2xl font-semibold my-8">
            Total Booked Session: {allBooking.length}
          </h3>
          <h3 className="text-4xl text-secondary font-semibold text-center mb-5">
            Manage All Booking Sessions
          </h3>
          <div>
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Booked Session</th>
                  <th>User</th>
                  <th>Date</th>
                  <th>Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {allBooking.map(
                  (
                    { _id, sessionType, name, email, date, price, status },
                    index
                  ) => (
                    <motion.tr
                      initial={"initial"}
                      animate={"animate"}
                      custom={index}
                      key={index}
                      viewport={{ once: true }}
                      variants={rowAnimation}
                    >
                      <td className="max-w-[250px] font-semibold text-xs">
                        {sessionType}
                      </td>
                      <td>
                        <div>
                          <div className="font-semibold">{name}</div>
                          <div className="text-xs">{email}</div>
                        </div>
                      </td>
                      <td>
                        <div>
                          <div>{date}</div>
                        </div>
                      </td>
                      <td className="text-right">$ {price}</td>
                      <td className="text-primary">
                        {status === "done" ? (
                          <span className="capitalize">{status}</span>
                        ) : (
                          <button
                            onClick={() => changeStatusHandler(_id)}
                            className="btn text-sm text-slate-600 btn-ghost"
                          >
                            Pending
                          </button>
                        )}
                      </td>
                    </motion.tr>
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

export default ManageBooking;
