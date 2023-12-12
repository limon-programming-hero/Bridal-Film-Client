import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import UseBooking from "./../../../Hooks/UseBooking";
import { Helmet } from "react-helmet";

const Payment = () => {
  const { bookingItems, isBookingLoading } = UseBooking();
  const totalPrice =
    !isBookingLoading &&
    bookingItems?.reduce((total, { price }) => total + price, 0);
  const price = parseFloat(totalPrice?.toFixed(2));
  const items =
    !isBookingLoading &&
    bookingItems?.map((item) => {
      const items = {
        sessionId: item.sessionId,
        date: item.date,
        sessionType: item.sessionType,
        price: item.price,
      };
      return items;
    });
  //   console.log({ items });
  const stripePromise = loadStripe(import.meta.env.VITE_Stripe_pk);

  return (
    <div>
      <Helmet>
        <title>Make Payment | Photography</title>
      </Helmet>
      {!isBookingLoading && (
        <Elements stripe={stripePromise}>
          <CheckoutForm totalPrice={price} items={items} />
        </Elements>
      )}
    </div>
  );
};

export default Payment;
