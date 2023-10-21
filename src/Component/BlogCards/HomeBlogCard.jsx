import { PropTypes } from "prop-types";
import { useState } from "react";
const HomeBlogCard = ({ data, index }) => {
  const [show, setShow] = useState(false);
  return (
    <div
      style={{ backgroundImage: `url(${data?.image})` }}
      className="w-44 hover:scale-125 h-48 bg-no-repeat bg-center bg-cover"
      onMouseOver={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <div className="w-44 h-48 flex items-center hover:bg-gradient-to-r from-slate-900 bg-opacity-5">
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
    </div>
  );
};

HomeBlogCard.propTypes = {
  data: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  index: PropTypes.string.isRequired,
};

export default HomeBlogCard;
