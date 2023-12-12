import { Helmet } from "react-helmet";
import SessionAddUpdate from "./../../../../Component/SessionAddUpdate/SessionAddUpdate";

const AddSession = () => {
  return (
    <div className="w-full">
      <Helmet>
        <title>Add Session | Photography</title>
      </Helmet>
      <SessionAddUpdate></SessionAddUpdate>
    </div>
  );
};

export default AddSession;
