import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const UseSessions = () => {
  const {
    data: sessions,
    isLoading: isSessionLoading,
    refetch: sessionRefetch,
  } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const res = await axios.get(
        "https://bridal-film-server.vercel.app/sessions"
      );
      return res?.data;
    },
  });
  return { sessions, isSessionLoading, sessionRefetch };
};

export default UseSessions;
