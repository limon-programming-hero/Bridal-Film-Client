import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "./UseAxiosSecure";

const UseUsers = () => {
  const [axiosSecure] = UseAxiosSecure();
  const {
    data: users = [],
    isLoading: isUsersLoading,
    refetch: usersRefetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res?.data;
    },
  });
  return { users, isUsersLoading, usersRefetch };
};

export default UseUsers;
