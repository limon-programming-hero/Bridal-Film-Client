import { format } from "date-fns";
import { PropTypes } from "prop-types";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import UseAuth from "../../Hooks/UseAuth";
import Swal from "sweetalert2";
import Loader from "../Shared/Loader/Loader";
import UseBooking from "../../Hooks/UseBooking";

const ShopModal = ({ session }) => {
  const { user, loading } = UseAuth();
  const [axiosSecure] = UseAxiosSecure();
  const { bookingRefetch } = UseBooking();

  const { _id, sessionType, price, features } = session;
  const defaultMonth = new Date();
  const [selected, setSelected] = useState(defaultMonth);

  const footer = selected ? (
    <p>You picked {format(selected, "PP")}.</p>
  ) : (
    <p>Please pick a day.</p>
  );
  const bookingHandler = async () => {
    const bookingData = {
      name: user?.displayName,
      email: user?.email,
      sessionType,
      price,
      date: format(selected, "PP"),
      sessionId: _id,
    };
    console.log(bookingData);
    const res =
      !loading && (await axiosSecure.post("/booking", { bookingData }));
    res?.data?.acknowledged &&
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successfully Booked!",
        showConfirmButton: false,
        timer: 1000,
      });
    bookingRefetch();
  };

  return (
    <div className="w-full">
      {loading ? (
        <Loader></Loader>
      ) : (
        <dialog id={_id} className="modal modal-bottom sm:modal-middle">
          <div className="modal-box ">
            <h3 className="font-bold text-secondary text-xl">{sessionType}</h3>
            <p className="py-4 text-xs">Price: {price}</p>
            <ul>
              <h4 className="font-semibold text-lg">Features:</h4>
              {features.map((feature, i) => (
                <li key={i}>
                  <p className="text-sm my-2">- {feature}</p>
                </li>
              ))}
            </ul>
            <div className="my-5 w-fit mx-auto">
              <DayPicker
                required
                defaultMonth={defaultMonth}
                fromMonth={defaultMonth}
                mode="single"
                disabled={[{ to: defaultMonth }]}
                selected={selected}
                onSelect={setSelected}
                footer={footer}
              />
            </div>{" "}
            <div className="modal-action">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
                <button onClick={bookingHandler} className="btn btn-outline">
                  Book
                </button>
              </form>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

ShopModal.propTypes = {
  session: PropTypes.object.isRequired,
};

export default ShopModal;
