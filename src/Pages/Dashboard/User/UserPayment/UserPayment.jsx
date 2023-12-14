import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../../Hooks/UseAuth";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import ShowPayment from "../../../../Component/ShowPayment/ShowPayment";
import { Helmet } from "react-helmet";

const UserPayment = () => {
  const { user, loading } = UseAuth();
  const [axiosSecure] = UseAxiosSecure();
  const { data, isLoading } = useQuery({
    queryKey: [user?.email, "payment"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user?.email}`);
      return res?.data;
    },
  });
  return (
    <div className="mx-auto">
      <Helmet>
        <title>{user?.displayName} | Payment History | Bridal Film</title>
      </Helmet>
      {!isLoading && <ShowPayment payments={data}></ShowPayment>}
    </div>
  );
};

export default UserPayment;
