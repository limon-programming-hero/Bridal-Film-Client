import UseBooking from "../../../../Hooks/UseBooking";
import Loader from "../../../Shared/Loader/Loader";

const UserBookingItems = () => {
  const { bookingItems, isBookingLoading } = UseBooking();
  const totalPrice = bookingItems?.reduce(
    (total, { price }) => total + price,
    0
  );
  return (
    <div className="mx-auto">
      {isBookingLoading && <Loader className="mx-auto"></Loader>}
      {bookingItems && (
        <>
          <div className="flex justify-between">
            <h3 className="text-xl font-semibold my-8">
              Total Booked Session: {bookingItems.length}
            </h3>
            <h3 className="text-xl font-semibold my-8">
              Total Price: $ {totalPrice}
            </h3>
          </div>
          <h3 className="text-4xl text-secondary font-semibold text-center mb-5">
            Manage All Booking Sessions
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
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {bookingItems.map(
                  ({ sessionType, name, email, date, price }, index) => (
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
