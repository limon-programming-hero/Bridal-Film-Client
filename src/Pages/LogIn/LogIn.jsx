import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UseAuth from "./../../Hooks/UseAuth";
import Swal from "sweetalert2";

const LogIn = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location?.state?.from?.pathname || "/";

  const { LogInWithEmail } = UseAuth();
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const { email, password } = data;
    LogInWithEmail(email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Signed up successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(path);
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
    <div className="hero min-h-screen mt-10">
      <div className="hero-content flex flex-col mx-14 gap-x-5 text-black md:flex-row">
        <div className="text-center w-full md:w-1/2 md:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card flex-shrink-0 w-full md:w-1/2  max-w-sm shadow-2xl bg-base-100">
          <h2 className="text-2xl font-semibold text-center my-5">Log In</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
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
                {...register("password", { required: true })}
                className="input input-bordered"
              />
              {errors?.password && (
                <p className="text-red-500 text-sm mt-1">
                  Password is required
                </p>
              )}
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mx-auto mt-6">
              <input
                type="submit"
                value="LogIn"
                className="btn px-10 w-fit btn-outline"
              />
            </div>
          </form>
          <div className="text-sm flex gap-2 justify-center mb-4 align-baseline">
            {`Don't have an account? `}
            <Link className="text-primary" to="/signUp">
              sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
