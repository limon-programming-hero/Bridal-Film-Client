import { Helmet } from "react-helmet";
import ItemAddUpdate from "../../../../Component/ItemAddUpdate/ItemAddUpdate";

const AddItems = () => {
  return (
    <div className="w-full">
      <Helmet>
        <title>Add Item | Photography</title>
      </Helmet>
      <ItemAddUpdate></ItemAddUpdate>
    </div>
  );
};

export default AddItems;
