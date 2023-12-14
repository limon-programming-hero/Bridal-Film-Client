import { useQuery } from "@tanstack/react-query";
import { IoCartSharp } from "react-icons/io5";
import { FaPhoneAlt, FaWallet } from "react-icons/fa";
import { MdPictureInPicture } from "react-icons/md";
import UseAuth from "../../../../Hooks/UseAuth";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import Loader from "../../../Shared/Loader/Loader";
import { Helmet } from "react-helmet";

const UserHome = () => {
  const { user, loading } = UseAuth();
  // console.log(user);
  const [axiosSecure] = UseAxiosSecure();
  const { data, isLoading } = useQuery({
    queryKey: ["user", "stat", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/stat?email=${user?.email}`);
      return res.data;
    },
  });

  return (
    <div className="w-full mx-auto my-10">
      <Helmet>
        <title>{user?.displayName} Home | Bridal Film</title>
      </Helmet>
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
            <div className="stat bg-gradient-to-r from-cyan-200 to-white gap-x-8 flex items-center">
              <div className="stat-title text-3xl">
                <MdPictureInPicture className="text-white" />
              </div>
              <div className="flex flex-col items-center">
                <h3 className="stat-value">{data?.session || 0}</h3>
                <p>Sessions</p>
              </div>
            </div>
            <div className="stat bg-gradient-to-r from-amber-200 to-white gap-x-8 flex items-center">
              <div className="stat-title text-3xl">
                <MdPictureInPicture className="text-white" />
              </div>
              <div className="flex flex-col items-center">
                <h3 className="stat-value">{data?.like || 0}</h3>
                <p>Likes</p>
              </div>
            </div>
            <div className="stat bg-gradient-to-r from-lime-200 to-white gap-x-8 flex items-center">
              <div className="stat-title text-3xl">
                <FaPhoneAlt className="text-white"></FaPhoneAlt>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="stat-value">{data?.contact || 0}</h3>
                <p>Contact</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-3/4 flex flex-col md:flex-row h-[650px] md:h-96 ">
            <div className="w-full h-full md:w-1/2 flex flex-col items-center justify-center bg-orange-100 border-b-2 md:border-r-2 border-secondary">
              <div className="avatar">
                <div className="h-52 rounded-full ring ring-secondary">
                  <img src={user?.photoURL} />
                </div>
              </div>
              <h3 className="text-xl font-bold my-5">{user?.displayName}</h3>
            </div>
            <div className="md:w-1/2 bg-slate-100 h-full w-full flex flex-col justify-center gap-y-3 pl-4">
              <h3 className="text-3xl font-bold">Your Activity</h3>
              <div className="divider"></div>
              <p className="flex gap-x-3 items-center">
                <FaWallet /> {data?.payment} Payments
              </p>
              <p className="flex gap-x-3 items-center">
                <IoCartSharp /> {data?.order} Orders
              </p>
            </div>
          </div>
        </div>
      ) : (
        <Loader></Loader>
      )}
    </div>
  );
};

export default UserHome;
