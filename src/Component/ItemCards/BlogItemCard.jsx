import PropTypes from "prop-types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import UseAuth from "./../../Hooks/UseAuth";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

const BlogItemCard = ({ data, refetch }) => {
  const [axiosSecure] = UseAxiosSecure();
  const { user, loading } = UseAuth();

  const likeHandler = () => {
    if (!loading) {
      const handlerData = {
        isLike: !data?.isLiked,
        email: user?.email,
      };
      axiosSecure
        .patch(`http://localhost:3000/items/${data?._id}`, handlerData)
        .then(async (res) => {
          if (!data?.isLiked) {
            const postData = { email: user?.email, itemId: data?._id };
            const res = await axiosSecure.post("/likes", {
              postData,
            });
            console.log(res?.data);
          } else {
            const res = await axiosSecure.delete(`/likes/${data?.likedItemId}`);
            console.log(res?.data);
          }
          refetch();
          console.log(res?.data);
        });
    }
  };

  return (
    <div className="card h-[450px] w-full text-black shadow-xl">
      <figure>
        <img src={data?.image} alt={data?.category} />
      </figure>
      <div className="card-body px-10">
        <h2 className="card-title">{data?.title}</h2>
        <p className="font-semibold text-secondary">{data?.date}</p>
        <p className="my-4">{data?.body}</p>
        <div className="card-actions justify-between">
          <button onClick={likeHandler}>
            <div className="badge cursor-pointer flex gap-2 badge-outline">
              {data?.likes ? data.likes : "0"}
              {data?.isLiked ? (
                <span className="text-secondary">
                  <AiFillHeart />
                </span>
              ) : (
                <AiOutlineHeart />
              )}{" "}
              Likes
            </div>
          </button>
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
    _id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    likes: PropTypes.number,
    isLiked: PropTypes.bool,
    comment: PropTypes.string,
    likedItemId: PropTypes.string,
  }),
  refetch: PropTypes.func.isRequired,
};

export default BlogItemCard;
