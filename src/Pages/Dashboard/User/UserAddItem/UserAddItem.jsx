import { Helmet } from "react-helmet";
import ItemAddUpdate from "../../../../Component/ItemAddUpdate/ItemAddUpdate";

const UserAddItem = () => {
  return (
    <div className="w-full">
      <Helmet>
        <title>Add Photo | Bridal Film</title>
      </Helmet>
      <h3 className="text-center mt-10 font-semibold ">
        Do you want to publicly share your photo?{" "}
      </h3>
      <h3 className="text-secondary font-semibold text-center text-2xl my-8">
        Add Your Photo Now!
      </h3>
      <ItemAddUpdate fromUser={true}></ItemAddUpdate>
    </div>
  );
};

export default UserAddItem;
