import { useParams } from "react-router-dom";
import ItemAddUpdate from "../../../../Component/ItemAddUpdate/ItemAddUpdate";
import UseItems from "../../../../Hooks/UseItems";
import { Helmet } from "react-helmet";
import titleCSS from "../../../Shared/CSS/DashboardTitle";

const UpdateItem = () => {
  const { id } = useParams();
  // console.log(id);
  const { items, isItemsLoading } = UseItems();
  const item = !isItemsLoading && items?.find((item) => item?._id === id);
  // console.log(item);
  return (
    <div className="w-full">
      <Helmet>
        <title>Update Item | Bridal Film</title>
      </Helmet>
      <div className="flex my-5 gap-y-2 flex-col">
        <h3 className="text-xl font-semibold text-center">
          Want to Update a new Item?
        </h3>
        <h3 className={titleCSS}>Update Now!</h3>
      </div>
      <ItemAddUpdate item={item}></ItemAddUpdate>
    </div>
  );
};

export default UpdateItem;
