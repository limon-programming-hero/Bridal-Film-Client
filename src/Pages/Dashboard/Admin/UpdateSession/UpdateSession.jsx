import { useParams } from "react-router-dom";
import SessionAddUpdate from "../../../../Component/SessionAddUpdate/SessionAddUpdate";
import UseSessions from "../../../../Hooks/UseSessions";

const UpdateSession = () => {
  const { id } = useParams();
  const { sessions, isSessionLoading } = UseSessions();
  const item =
    !isSessionLoading && sessions.find((session) => session._id === id);
  console.log(item);
  return (
    <div className="w-full">
      <SessionAddUpdate session={item}></SessionAddUpdate>
    </div>
  );
};

export default UpdateSession;
