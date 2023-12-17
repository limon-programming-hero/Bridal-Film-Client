import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import Swal from "sweetalert2";
import UseAxiosSecure from "./../../../Hooks/UseAxiosSecure";
import UseAuth from "./../../../Hooks/UseAuth";
import Loader from "./../../Shared/Loader/Loader";

const CheckoutForm = ({ totalPrice, items }) => {
  const { user, loading } = UseAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [axiosSecure] = UseAxiosSecure();
  const [cardError, setCardError] = useState("");
  //   console.log({ clientSecret });
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [processing, setProcessing] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => setClientSecret(res?.data.clientSecret));
    }
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    setProcessing(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCardError(error.message);
      // console.log("[error]", error);
    } else {
      setCardError("");
      console.log("[PaymentMethod]", paymentMethod);
    }
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName,
            email: user?.email,
          },
        },
      });
    if (confirmError) {
      setCardError(confirmError?.message);
      // console.log(confirmError);
    }
    if (paymentIntent?.status === "succeeded") {
      setTransactionId(paymentIntent?.id);
      const paymentDetails = {
        email: user?.email,
        name: user?.displayName,
        price: totalPrice,
        transactionId: paymentIntent?.id,
        items,
      };
      // console.log(paymentDetails);
      const res = await axiosSecure.post("/payments", { data: paymentDetails });
      const deleteResponse =
        res?.data?.acknowledged &&
        (await axiosSecure.delete(`/booking?email=${user?.email}`));
      if (deleteResponse?.data?.deletedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Sessions Booked Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        setProcessing(false);
      }
      // console.log(deleteResponse?.data);
    }
    // console.log({ paymentIntent }, { confirmError });
  };

  return (
    <div className="w-full">
      <h4 className="my-8 font-semibold">Total Price: ${totalPrice}</h4>
      {loading ? (
        <Loader />
      ) : (
        <form className="w-[450px]" onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <button
            className="btn btn-outline btn-secondary my-5"
            type="submit"
            disabled={!stripe || !clientSecret || processing}
          >
            Pay
          </button>
        </form>
      )}
      {cardError && <p className="mx-5 text-red-500">{cardError}</p>}
      {transactionId && (
        <p className="mx-5 text-success">
          Your Transaction Id is: {transactionId}
        </p>
      )}
    </div>
  );
};

export default CheckoutForm;

CheckoutForm.propTypes = {
  totalPrice: PropTypes.number.isRequired,
  items: PropTypes.object.isRequired,
};
