import { PropTypes } from "prop-types";
import { useState } from "react";
const HomeItemCard = ({ data, index, isHome }) => {
  const [show, setShow] = useState(false);
  return (
    <div
      style={{ backgroundImage: `url(${data?.image})` }}
      className={`w-full bg-no-repeat bg-center bg-cover ${
        isHome ? "h-48 hover:scale-125" : "h-72"
      }`}
      onMouseOver={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {isHome ? (
        <div className="flex w-full h-full items-center hover:bg-gradient-to-r from-slate-900 bg-opacity-5">
          <h3
            className={`text-2xl items-center font-semibold text-white text-start inline-block ${
              show ? "block" : "hidden"
            }`}
          >
            <span className="ml-0 text-3xl text-secondary font-bold">-</span>
            <span className="text-xl text-slate-400">{++index}</span>{" "}
            {data?.title}
          </h3>
        </div>
      ) : (
        // todo: add link to item based on _id and navigate to a full view page
        <div
          className={`${
            show
              ? "flex bg-black opacity-70 h-full pt-5 items-center"
              : "hidden"
          }`}
        >
          <div className="px-4 truncate text-center text-white">
            <h3 className="font-bold text-2xl ">{data.title}</h3>
            <div className="divider text-center text-5xl font-bold"></div>
            <small className="text-left">{data.body}</small>
          </div>
        </div>
      )}
    </div>
  );
};

HomeItemCard.propTypes = {
  data: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
  }).isRequired,
  isHome: PropTypes.bool,
  index: PropTypes.number,
};

export default HomeItemCard;
