import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "./UseAxiosSecure";

const UsePayments = () => {
  const [axiosSecure] = UseAxiosSecure();
  const { data: payments = [], isLoading: isPaymentLoading } = useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      return await axiosSecure(
        `https://bridal-film-server.vercel.app/payments`
      ).then((data) => {
        return data?.data;
      });
    },
  });
  return { payments, isPaymentLoading };
};

export default UsePayments;
