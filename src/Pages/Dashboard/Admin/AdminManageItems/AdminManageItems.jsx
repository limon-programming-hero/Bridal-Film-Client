import { Helmet } from "react-helmet";
import ManageItems from "../../../../Component/ManageItems/ManageItems";

const AdminManageItems = () => {
  return (
    <div className="w-full">
      <Helmet>
        <title>Manage Items | Bridal Film</title>
      </Helmet>
      <ManageItems />
    </div>
  );
};

export default AdminManageItems;
