import { Link } from "react-router-dom";
import Loader from "../../../Shared/Loader/Loader";
import UseSessions from "./../../../../Hooks/UseSessions";
import { MdDelete, MdEdit } from "react-icons/md";
import { motion } from "framer-motion";
import rowAnimation from "../../../Shared/Animation/rowAnimation";
import { Helmet } from "react-helmet";

const Sessions = () => {
  const { sessions, isSessionLoading } = UseSessions();
  return (
    <div className="mx-auto">
      <Helmet>
        <title>Sessions | Bridal Film</title>
      </Helmet>
      {isSessionLoading && <Loader className="mx-auto"></Loader>}
      {sessions && (
        <>
          <h3 className="text-2xl font-semibold my-8">
            Total Session: {sessions.length}
          </h3>
          <h3 className="text-4xl text-secondary font-semibold text-center mb-5">
            Manage All Booking Sessions
          </h3>
          <div>
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Sessions</th>
                  <th>Features</th>
                  <th>Price</th>
                  <th>Update</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {sessions.map((item, index) => {
                  const { _id, sessionType, image, features, price } = item;
                  return (
                    <motion.tr
                      initial={"initial"}
                      animate={"animate"}
                      custom={index}
                      key={index}
                      viewport={{ once: true }}
                      variants={rowAnimation}
                    >
                      <td className="text-sm font-semibold">
                        <div className="flex gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img src={image && image} alt="session" />
                            </div>
                          </div>
                          {sessionType}
                        </div>
                      </td>
                      <td>
                        <ul>
                          {features?.map((feature, index) => (
                            <li className="text-xs" key={index}>
                              - {feature}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td>{price}</td>
                      <td>
                        <Link
                          to={`/dashboard/updateSession/${_id}`}
                          className="btn btn-ghost"
                        >
                          <MdEdit />
                        </Link>
                      </td>
                      <td>
                        <button className="btn btn-ghost text-red-600 hover:bg-red-400 hover:text-white">
                          <MdDelete />
                        </button>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Sessions;
