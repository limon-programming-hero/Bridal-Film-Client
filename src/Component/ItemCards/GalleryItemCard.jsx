import { PropTypes } from "prop-types";
import { useState } from "react";

const GalleryItemCard = ({ data }) => {
  const [show, setShow] = useState(false);

  return (
    <div
      style={{ backgroundImage: `url(${data?.image})` }}
      className="w-full bg-no-repeat bg-center bg-cover h-72"
      onMouseOver={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <div
        className={`${
          show ? "flex bg-black opacity-70 h-full pt-5 items-center" : "hidden"
        }`}
      >
        <div className="px-4 truncate text-center text-white">
          <h3 className="font-bold text-2xl ">{data.title}</h3>
          <div className="divider text-center text-5xl font-bold"></div>
          <small className="text-left">{data.body}</small>
        </div>
      </div>
    </div>
  );
};

export default GalleryItemCard;

GalleryItemCard.propTypes = {
  data: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
  }).isRequired,
};
