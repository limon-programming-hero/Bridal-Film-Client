import PropTypes from "prop-types";

const BlogItemCard = ({ data }) => {
  return (
    <div className="card h-[450px] w-full text-black shadow-xl">
      <figure>
        <img src={data?.image} alt={data?.category} />
      </figure>
      <div className="card-body px-10">
        <h2 className="card-title">{data?.title}</h2>
        <p className="font-semibold text-secondary">{data?.date}</p>
        <p className="my-4">{data?.body}</p>
        <div className="card-actions  justify-between">
          <div className="badge cursor-pointer badge-outline">
            {data?.likes ? data.likes : "0"} Likes
          </div>
          <div className="badge cursor-pointer badge-outline">
            {data?.comment ? data.comment : "No Comment"}
          </div>
        </div>
      </div>
    </div>
  );
};

BlogItemCard.propTypes = {
  data: PropTypes.shape({
    image: PropTypes.string,
    category: PropTypes.string,
    title: PropTypes.string,
    date: PropTypes.string,
    body: PropTypes.string,
    likes: PropTypes.number,
    comment: PropTypes.string,
  }).isRequired,
};

export default BlogItemCard;
