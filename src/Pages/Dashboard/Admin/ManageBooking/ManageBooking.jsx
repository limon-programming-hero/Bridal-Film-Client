import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import Loader from "./../../../Shared/Loader/Loader";
import { motion } from "framer-motion";
import rowAnimation from "../../../Shared/Animation/rowAnimation";
import { Helmet } from "react-helmet";
import titleCSS from "../../../Shared/CSS/DashboardTitle";

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
        <title>Manage Booking | Bridal Film</title>
      </Helmet>
      {isBookingLoading && <Loader className="mx-auto"></Loader>}
      {allBooking && (
        <>
          <h3 className="text-2xl font-semibold my-8">
            Total Booked Session: {allBooking.length}
          </h3>
          <h3 className={titleCSS}>Manage All Booking Sessions</h3>
          <div>
            <table className="md:table text-xs md:text-sm">
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
                      <td className="max-w-[250px] font-semibold text-xs px-2 py-4">
                        {sessionType}
                      </td>
                      <td className="px-2">
                        <div>
                          <div className="font-semibold">{name}</div>
                          <div className="text-xs">{email}</div>
                        </div>
                      </td>
                      <td className="px-2">
                        <div>
                          <div>{date}</div>
                        </div>
                      </td>
                      <td className="text-right px-2">${price}</td>
                      <td className="text-primary px-2 text-center">
                        {status === "done" ? (
                          <span className="capitalize">{status}</span>
                        ) : (
                          <button
                            onClick={() => changeStatusHandler(_id)}
                            className="btn text-xs text-slate-600 btn-ghost btn-sm "
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
