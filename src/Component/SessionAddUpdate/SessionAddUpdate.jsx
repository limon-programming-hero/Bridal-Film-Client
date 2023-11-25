import { PropTypes } from "prop-types";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import UseAuth from "../../Hooks/UseAuth";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const SessionAddUpdate = ({ session }) => {
  const navigate = useNavigate();
  const defaultFeatures = session && session.features.toString();
  const [axiosSecure] = UseAxiosSecure();
  const { user, loading } = UseAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //imgbb link with api key
  const imageLink = `https://api.imgbb.com/1/upload?key=${
    import.meta.env.VITE_ImageBB_api_key
  }`;
  // image uploading to imgbb and getting display_url
  const UploadImgHandler = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile[0]);
    const imageData = await axios
      .post(imageLink, formData)
      .then((res) => res?.data?.data);
    return imageData;
  };
  const onSubmit = async (data) => {
    console.log(data);
    const { sessionType, price, features, image } = data;

    const imageData = image.length && (await UploadImgHandler(image));
    const featureArray = features.split(",").filter(Boolean);
    const sessionData = {
      sessionType,
      price,
      image: imageData ? imageData.display_url : session?.image,
      features: featureArray,
    };
    const res =
      !loading && session
        ? await axiosSecure.patch(
            `/sessions/${session?._id}?email=${user?.email}`,
            {
              sessionData,
            }
          )
        : await axiosSecure.post(`/sessions?email=${user?.email}`, {
            sessionData,
          });
    res?.data?.acknowledged &&
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Item Added Successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    reset();
    navigate("/dashboard/manageSessions");
  };
  return (
    <div className="mx-auto w-full">
      <div className="flex gap-y-2 flex-col">
        <h3 className="text-xl font-semibold text-center">
          Want to add new Session?
        </h3>
        <h3 className="text-3xl text-center font-bold text-secondary">
          Add Now!
        </h3>
      </div>
      <div className="w-full md:w-2/3 mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="md:px-20">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Session Type</span>
            </label>
            <input
              type="text"
              defaultValue={session && session?.sessionType}
              {...register("sessionType", { required: true })}
              className="input input-bordered"
            />
            <p className="my-1 text-red-400">
              {errors?.sessionType?.type === "required" &&
                "sessionType is required"}
            </p>
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              type="number"
              defaultValue={session && session?.price}
              {...register("price", { required: true })}
              className="input input-bordered"
            />
            <p className="my-1 text-red-400">
              {errors?.price?.type === "required" && "price is required"}
            </p>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered w-full max-w-xs"
              {...register("image", {
                required: session?.image ? false : true,
              })}
            />
            {errors?.image && (
              <p className="text-red-500 text-sm mt-1">Image is required</p>
            )}
            {session?.image && (
              <div className="avatar my-4">
                <div className="mask mask-squircle w-14 h-14">
                  <img src={session.image} alt="session" />
                </div>
              </div>
            )}
          </div>
          <div
            title="use , (comma) to indicate individual feature"
            className="form-control"
          >
            <label className="label">
              <span className="label-text">Features</span>
            </label>
            <textarea
              defaultValue={session && defaultFeatures}
              className="textarea textarea-bordered h-24"
              {...register("features", { required: true })}
            ></textarea>
            <p className="my-1 text-red-400">
              {errors?.features?.type === "required" && "Features are required"}
            </p>
          </div>
          <input
            className="btn my-8 btn-outline"
            value={session ? "Update Session" : "Add Session"}
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

SessionAddUpdate.propTypes = {
  session: PropTypes.object,
};

export default SessionAddUpdate;
