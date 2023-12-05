import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import Loader from "./../../../Shared/Loader/Loader";
import { motion } from "framer-motion";
import rowAnimation from "../../../Shared/Animation/rowAnimation";

const ManageBooking = () => {
  const [axiosSecure] = UseAxiosSecure();
  const {
    data: allBooking,
    isLoading: isBookingLoading,
    // refetch,
  } = useQuery({
    queryKey: ["booking"],
    queryFn: async () => {
      const res = await axiosSecure(`/booking`);
      return res?.data;
    },
  });
  return (
    <div className="mx-auto">
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
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {allBooking.map(
                  ({ sessionType, name, email, date, price }, index) => (
                    <motion.tr
                      initial={"initial"}
                      animate={"animate"}
                      custom={index}
                      key={index}
                      viewport={{ once: true }}
                      variants={rowAnimation}
                    >
                      <td className="max-w-[250px] text-xs">{sessionType}</td>
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
                      <td>{price}</td>
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
