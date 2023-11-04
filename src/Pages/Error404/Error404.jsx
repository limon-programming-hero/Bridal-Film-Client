import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-8">
        Oops! The page you are looking for does not exist.
      </p>
      <Link to="/">
        <button className="btn btn-outline btn-secondary hover:text-white font-bold py-2 px-4 rounded">
          Return Home
        </button>
      </Link>
    </div>
  );
};

export default Error404;
