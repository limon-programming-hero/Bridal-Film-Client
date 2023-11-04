import { Triangle } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex align-middle justify-center my-20">
      <div className="w-fit">
        <Triangle
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      </div>
    </div>
  );
};

export default Loader;
