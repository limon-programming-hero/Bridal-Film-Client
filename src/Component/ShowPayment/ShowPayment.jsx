import { PropTypes } from "prop-types";
import { motion } from "framer-motion";
import rowAnimation from "../../Pages/Shared/Animation/rowAnimation";
import titleCSS from "../../Pages/Shared/CSS/DashboardTitle";
const ShowPayment = ({ payments }) => {
  return (
    <div>
      <div className="mx-auto text-xl">
        <h3 className={titleCSS}>Payment History</h3>
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>User</th>
              <th>Items</th>
              <th>Transaction Id</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody className="text-xs md:text-sm">
            {/* rows */}
            {payments?.map(
              ({ email, name, price, items, transactionId }, index) => (
                <motion.tr
                  initial={"initial"}
                  animate={"animate"}
                  custom={index}
                  key={index}
                  viewport={{ once: true }}
                  variants={rowAnimation}
                >
                  <td>
                    <div className="flex flex-col items-center space-x-3">
                      <div>
                        <div className="font-bold">{name}</div>
                      </div>
                      <div>
                        <div>{email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-col">
                      {items?.map(({ sessionId, sessionType, date }) => (
                        <div key={sessionId}>
                          <ul className="flex flex-row gap-x-7">
                            <li>{sessionType}</li>
                            <li className="text-xs">{date}</li>
                          </ul>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td>{transactionId}</td>
                  <td>${price}</td>
                </motion.tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowPayment;
ShowPayment.propTypes = {
  payments: PropTypes.array.isRequired,
};
