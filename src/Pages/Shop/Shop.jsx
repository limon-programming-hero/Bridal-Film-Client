import { Helmet } from "react-helmet";
import UseSessions from "../../Hooks/UseSessions";
import Loader from "../Shared/Loader/Loader";
import ShopCard from "./ShopCard";

const Shop = () => {
  const { sessions, isSessionLoading } = UseSessions();
  return (
    <div className="mt-24">
      <Helmet>
        <title>Sessions | Photography</title>
      </Helmet>
      <h3 className="text-center text-3xl my-5 font-semibold">
        Want to have a Photography Session! <br />
        <span className="text-secondary text-4xl">Book now!</span>
      </h3>
      {isSessionLoading && <Loader className="mx-auto"></Loader>}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {sessions &&
          sessions?.map((session, index) => (
            <ShopCard session={session} key={index}></ShopCard>
          ))}
      </div>
    </div>
  );
};

export default Shop;
