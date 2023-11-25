import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import UseAxiosSecure from "./UseAxiosSecure";

const UseIsAdmin = () => {
  const { user, loading } = UseAuth();
  const [axiosSecure] = UseAxiosSecure();
  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: [user?.email, "users"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/isAdmin?email=${user?.email}`);
      return res?.data;
    },
  });
  return { isAdmin, isAdminLoading };
};

export default UseIsAdmin;
