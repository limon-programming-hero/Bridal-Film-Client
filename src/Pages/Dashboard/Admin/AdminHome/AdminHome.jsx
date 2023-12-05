import { FaWallet } from "react-icons/fa";
import Loader from "../../../Shared/Loader/Loader";
import UseAuth from "../../../../Hooks/UseAuth";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import { BsCart, BsMenuApp, BsMenuButton, BsPeople } from "react-icons/bs";

const AdminHome = () => {
  const { user, loading } = UseAuth();
  const [axiosSecure] = UseAxiosSecure();
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "stat", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/stat?email=${user?.email}`);
      return res?.data;
    },
  });
  const statData = !isLoading && [
    {
      title: "Revenue",
      value: data?.revenue,
      icon: <FaWallet className="text-white" />,
      color: "cyan",
    },
    {
      title: "Customer",
      value: data?.user,
      icon: <BsPeople className="text-white" />,
      color: "lime",
    },
    {
      title: "Items",
      value: data?.item,
      icon: <BsMenuApp className="text-white" />,
      color: "amber",
    },
    {
      title: "Sessions",
      value: data?.session,
      icon: <BsMenuButton className="text-white" />,
      color: "lime",
    },
    {
      title: "Orders",
      value: data?.order,
      icon: <BsCart className="text-white" />,
      color: "amber",
    },
  ];
  return (
    <div className="w-full mx-auto my-10">
      {!isLoading ? (
        <div className="flex flex-col items-center gap-y-14">
          <h3 className="text-3xl font-bold text-left">
            Hi, Welcome Back{" "}
            <span className="text-secondary text-4xl font-bold">
              {user?.displayName}
            </span>
            !
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 shadow">
            {statData?.map(({ title, value, icon, color }, i) => (
              <div
                key={i}
                className={`stat bg-gradient-to-r from-${color}-200 to-white gap-x-8 flex items-center`}
              >
                <div className="stat-title text-3xl">{icon}</div>
                <div className="flex flex-col items-center">
                  <h3 className="stat-value">{value || 0}</h3>
                  <p>{title}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full md:w-3/4 flex flex-col md:flex-row h-[650px] md:h-96 ">
            <div className="w-full h-full md:w-1/2 flex flex-col items-center justify-center bg-orange-100 border-b-2 md:border-r-2 border-secondary"></div>
            <div className="md:w-1/2 bg-slate-100 h-full w-full flex flex-col justify-center gap-y-3 pl-4"></div>
          </div>
        </div>
      ) : (
        <Loader></Loader>
      )}
    </div>
  );
};

export default AdminHome;
