import { Helmet } from "react-helmet";
import ManageItems from "../../../../Component/ManageItems/ManageItems";

const UserManageItems = () => {
  return (
    <div className="mx-auto">
      <Helmet>
        <title>Manage Items | Bridal Film</title>
      </Helmet>
      <ManageItems fromUser={true} />
    </div>
  );
};

export default UserManageItems;
