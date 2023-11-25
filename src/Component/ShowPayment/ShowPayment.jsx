import { PropTypes } from "prop-types";
const ShowPayment = ({ payments }) => {
  console.log(payments);
  return (
    <div>
      <div className="overflow-x-auto mx-auto text-xl">
        <h3 className="text-4xl text-secondary font-semibold text-center mb-5">
          Payment History
        </h3>
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
          <tbody>
            {/* rows */}
            {payments.map(
              ({ email, name, price, items, transactionId }, index) => (
                <tr key={index}>
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
                </tr>
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
