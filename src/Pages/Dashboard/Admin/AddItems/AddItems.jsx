import { Helmet } from "react-helmet";
import ItemAddUpdate from "../../../../Component/ItemAddUpdate/ItemAddUpdate";
import titleCSS from "../../../Shared/CSS/DashboardTitle";

const AddItems = () => {
  return (
    <div className="w-full">
      <Helmet>
        <title>Add Item | Bridal Film</title>
      </Helmet>
      <h3 className={titleCSS}>Add New Item!</h3>
      <ItemAddUpdate></ItemAddUpdate>
    </div>
  );
};

export default AddItems;
