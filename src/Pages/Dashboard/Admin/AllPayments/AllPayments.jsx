import ShowPayment from "../../../../Component/ShowPayment/ShowPayment";
import UsePayments from "../../../../Hooks/UsePayments";

const AllPayments = () => {
  const { payments, isPaymentLoading } = UsePayments();
  //   console.log({ payments });
  return (
    <div className="mx-auto">
      {!isPaymentLoading && <ShowPayment payments={payments}></ShowPayment>}
    </div>
  );
};

export default AllPayments;
