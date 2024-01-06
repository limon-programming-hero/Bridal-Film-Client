import { useForm } from "react-hook-form";
import UseAuth from "../../Hooks/UseAuth";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import UploadImage from "../../Pages/Shared/UploadImage/UploadImage";
import { PropTypes } from "prop-types";
import { useNavigate } from "react-router-dom";

const ItemAddUpdate = ({ item, fromUser }) => {
  const navigate = useNavigate();
  const [axiosSecure] = UseAxiosSecure();
  const { user, loading } = UseAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // console.log(data);
    const { title, category, body, image } = data;

    const imageData = image.length && (await UploadImage(image));
    const itemData = {
      title,
      image: imageData ? imageData.display_url : item?.image,
      category,
      body,
    };

    // console.log(itemData);

    const res =
      !loading &&
      (item
        ? await axiosSecure.patch(
            `/item/update/${item?._id}?email=${user?.email}`,
            {
              itemData,
            }
          )
        : await axiosSecure.post(`/items?email=${user?.email}`, {
            itemData,
          }));
    // console.log(res?.data);
    res?.data?.acknowledged &&
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Item Added Successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    reset();
    navigate(fromUser ? "/dashboard/userManageItem" : "/dashboard/manageItems");
  };
  return (
    <div className="mx-auto w-full">
      <div className="md:w-4/5 my-5 bg-slate-50 rounded-lg pt-20 mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="px-8 md:px-20">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              defaultValue={item && item?.title}
              {...register("title", { required: true })}
              className="input input-bordered"
            />
            <p className="my-1 text-red-400">
              {errors?.title?.type === "required" && "Title is required"}
            </p>
          </div>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Category</span>
            </div>
            <select
              defaultValue={item ? item?.category : "Pick one"}
              {...register("category", { required: true })}
              className="select select-bordered"
            >
              <option disabled>Pick one</option>
              <option>fashion</option>
              <option>lifestyle</option>
              <option>nature</option>
              <option>studio</option>
              <option>portrait</option>
            </select>
            <p className="my-1 text-red-400">
              {errors?.category?.type === "required" && "category is required"}
            </p>
          </label>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered w-full max-w-xs"
              {...register("image", {
                required: item?.image ? false : true,
              })}
            />
            {errors?.image && (
              <p className="text-red-500 text-sm mt-1">Image is required</p>
            )}
            {item?.image && (
              <div className="avatar my-4">
                <div className="mask mask-squircle w-14 h-14">
                  <img src={item.image} alt="session" />
                </div>
              </div>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              defaultValue={item && item?.body}
              className="textarea textarea-bordered h-24"
              {...register("body", { required: true })}
            ></textarea>
            <p className="my-1 text-red-400">
              {errors?.body?.type === "required" && "Body are required"}
            </p>
          </div>
          <input
            className="btn my-8 btn-outline"
            value={item ? "Update Item" : "Add Item"}
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default ItemAddUpdate;

ItemAddUpdate.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    category: PropTypes.string,
    body: PropTypes.string,
    image: PropTypes.string,
  }),
  fromUser: PropTypes.bool,
};
