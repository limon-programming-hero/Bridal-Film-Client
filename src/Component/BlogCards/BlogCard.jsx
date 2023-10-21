import PropTypes from "prop-types";

const BlogCard = ({ data }) => {
  return (
    <div className="card h-[450px] w-full text-black shadow-xl">
      <figure>
        <img src={data?.image} alt={data?.category} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{data?.title}</h2>
        <p className="font-semibold text-secondary">{data?.date}</p>
        <p className="my-4">{data?.body}</p>
        <div className="card-actions justify-start">
          <div className="badge badge-outline">
            {data?.likes ? data.likes : "0"} Likes
          </div>
        </div>
      </div>
    </div>
  );
};

BlogCard.propTypes = {
  data: PropTypes.shape({
    image: PropTypes.string,
    category: PropTypes.string,
    title: PropTypes.string,
    date: PropTypes.string,
    body: PropTypes.string,
    likes: PropTypes.number,
  }).isRequired,
};

export default BlogCard;
