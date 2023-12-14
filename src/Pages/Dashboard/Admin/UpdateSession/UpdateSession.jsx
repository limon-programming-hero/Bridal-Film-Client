import { useParams } from "react-router-dom";
import SessionAddUpdate from "../../../../Component/SessionAddUpdate/SessionAddUpdate";
import UseSessions from "../../../../Hooks/UseSessions";
import { Helmet } from "react-helmet";

const UpdateSession = () => {
  const { id } = useParams();
  const { sessions, isSessionLoading } = UseSessions();
  const item =
    !isSessionLoading && sessions.find((session) => session._id === id);
  console.log(item);
  return (
    <div className="w-full">
      <Helmet>
        <title>Update Session | Bridal Film</title>
      </Helmet>
      <SessionAddUpdate session={item}></SessionAddUpdate>
    </div>
  );
};

export default UpdateSession;
