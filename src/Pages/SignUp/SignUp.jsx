import axios from "axios";
import { useForm } from "react-hook-form";
import UseAuth from "./../../Hooks/UseAuth";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { LineWave } from "react-loader-spinner";
import { Helmet } from "react-helmet";

const SignUp = () => {
  const [localLoading, setLocalLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const path = location?.state?.from?.pathname || "/";

  const { SignUpWithEmail, addNameAndPhoto } = UseAuth();

  const {
    register,
    handleSubmit,
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
  // login submit button
  const onSubmit = async (data) => {
    setLocalLoading(true);
    const { name, image, email, password } = data;
    const imageData = await UploadImgHandler(image);

    SignUpWithEmail(email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
        // adding user name and profile picture
        addNameAndPhoto(name, imageData?.display_url).then(() => {
          // const email = user.email;
          const userDetails = {
            name,
            email,
            image: user?.photoURL,
          };
          // adding user to database
          axios
            .post("https://bridal-film-server.vercel.app/users", {
              userDetails,
            })
            .then((res) => {
              console.log({ userToDb: res?.data });
              setLocalLoading(false);
              navigate(path);
            });
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        Swal.fire({
          position: "top-end",
          icon: "warning",
          title: "Email already signed up! Log in now",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <div className="hero min-h-screen">
      <Helmet>
        <title>Sign Up | Bridal Film</title>
      </Helmet>
      <div className="hero-content flex-col mx-14 gap-4 text-black md:flex-row">
        <div className="text-center w-full md:w-1/2 md:text-left">
          <h1 className="text-5xl font-bold">Sign Up now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                {...register("name", { required: true })}
                className="input input-bordered"
              />
              {errors?.name && (
                <p className="text-red-500 text-sm mt-1">Name is required</p>
              )}
              <label className="label">
                <span className="label-text">Photo</span>
              </label>
              <input
                type="file"
                className="file-input file-input-bordered w-full max-w-xs"
                {...register("image", { required: true })}
              />
              {errors?.image && (
                <p className="text-red-500 text-sm mt-1">Image is required</p>
              )}
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email", { required: true })}
                className="input input-bordered"
              />
              {errors?.email && (
                <p className="text-red-500 text-sm mt-1">Email is required</p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                {...register("password", {
                  required: true,
                  pattern:
                    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{6,16}$/,
                })}
                className="input input-bordered"
              />
              {errors?.password?.type === "required" && (
                <p className="text-red-500 text-sm mt-1">
                  Password is required
                </p>
              )}
              {errors?.password?.type === "pattern" && (
                <small className="text-sm">
                  password must carry one upper case, one lower case, one
                  number, one special character , minimum of 6 character and
                  maximum 16 character
                </small>
              )}
            </div>
            <div className="form-control mx-auto mt-6">
              {localLoading ? (
                <LineWave
                  height="100"
                  width="100"
                  color="rgb(255, 145, 0)"
                  ariaLabel="line-wave"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  firstLineColor=""
                  middleLineColor=""
                  lastLineColor=""
                />
              ) : (
                <input
                  type="submit"
                  value="Sign Up"
                  className="btn px-10 w-fit btn-outline"
                />
              )}
            </div>
          </form>
          <div className="text-sm flex gap-2 justify-center mb-4 align-baseline">
            {`Already have an account? `}
            <Link className="text-primary" to="/logIn">
              LogIn
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
