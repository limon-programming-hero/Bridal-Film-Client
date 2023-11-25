import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "./UseAxiosSecure";
import UseAuth from "./UseAuth";

const UseBooking = () => {
  const [axiosSecure] = UseAxiosSecure();
  const { user, loading } = UseAuth();
  const {
    data: bookingItems,
    isLoading: isBookingLoading,
    refetch: bookingRefetch,
  } = useQuery({
    queryKey: ["booking", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/booking/${user?.email}`);
      return res?.data;
    },
  });
  return { bookingItems, isBookingLoading, bookingRefetch };
};

export default UseBooking;
