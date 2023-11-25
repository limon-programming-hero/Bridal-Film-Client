import { PropTypes } from "prop-types";
import image from "../../assets/Images/About/about1.jpg";
import { useState } from "react";
import Loader from "../Shared/Loader/Loader";
import ShopModal from "./ShopModal";

const ShopCard = ({ session }) => {
  const [toggleBtn, setToggleBtn] = useState(true);
  const { _id, sessionType, price, features } = session;
  return (
    <div
      className="hero rounded-br-lg h-[580px]"
      style={{
        backgroundImage: `url(${session?.image ? session.image : image})`,
      }}
    >
      {!session ? (
        <Loader className="mx-auto"></Loader>
      ) : (
        <div className="hero-overlay w-full relative rounder-br-lg bg-opacity-30">
          <div className="text-white flex text-center flex-col gap-y-3 mt-5">
            <h2 className="text-2xl text-secondary font-bold">|</h2>
            <h4 className="text-xl font-semibold">{sessionType}</h4>
            <h2 className="text-4xl font-semibold">$ {price}</h2>

            <button
              className="btn btn-outline btn-secondary mx-auto capitalize"
              onClick={() => document.getElementById(`${_id}`).showModal()}
            >
              <span className="text-white"> Book</span>
            </button>
          </div>
          <details className="dropdown absolute bottom-5 dropdown-top w-full">
            <summary
              tabIndex={0}
              onClick={() => setToggleBtn(!toggleBtn)}
              className="btn btn-secondary absolute left-1/2 -mx-11 bottom-0 btn-outline text-white m-1"
            >
              {toggleBtn ? "+" : "-"} Options
            </summary>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-slate-700 bg-opacity-60 rounded-box w-full mb-14"
            >
              {features?.map((feature, i) => (
                <li
                  key={i}
                  className=" text-lg text-white font-semibold pl-10 my-4"
                >
                  - {feature}
                </li>
              ))}
            </ul>
          </details>

          {/* Put this part before </body> tag */}
          <ShopModal session={session}></ShopModal>
        </div>
      )}
    </div>
  );
};

export default ShopCard;

ShopCard.propTypes = {
  session: PropTypes.object.isRequired,
};
