/* eslint-disable react/prop-types */
import { FaWallet } from "react-icons/fa";
import Loader from "../../../Shared/Loader/Loader";
import UseAuth from "../../../../Hooks/UseAuth";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import { BsCart, BsMenuApp, BsMenuButton, BsPeople } from "react-icons/bs";
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Helmet } from "react-helmet";

const AdminHome = () => {
  const { user, loading } = UseAuth();
  const [axiosSecure] = UseAxiosSecure();
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "stat", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/stat?email=${user?.email}`);
      return res?.data;
    },
  });
  // console.log(data);
  const statData = !isLoading && [
    {
      title: "Revenue",
      value: data?.revenue,
      icon: <FaWallet className="text-white" />,
      color: "cyan",
    },
    {
      title: "Customer",
      value: data?.user,
      icon: <BsPeople className="text-white" />,
      color: "lime",
    },
    {
      title: "Items",
      value: data?.item,
      icon: <BsMenuApp className="text-white" />,
      color: "amber",
    },
    {
      title: "Sessions",
      value: data?.session,
      icon: <BsMenuButton className="text-white" />,
      color: "lime",
    },
    {
      title: "Orders",
      value: data?.order,
      icon: <BsCart className="text-white" />,
      color: "amber",
    },
  ];
  const chartData =
    !isLoading &&
    data &&
    data?.sessionStat?.map(({ totalPrice, count, session }) => {
      const data = { price: totalPrice, value: count, name: session };
      return data;
    });

  // for bar charts
  const colors = scaleOrdinal(schemeCategory10).range();

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3} 
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
    Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  // for pie charts

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <div className="w-full mx-auto my-10">
      <Helmet>
        <title>Admin Home | Photography</title>
      </Helmet>
      {!isLoading ? (
        <div className="flex flex-col items-center gap-y-14">
          <h3 className="text-3xl font-bold text-left">
            Hi, Welcome Back{" "}
            <span className="text-secondary text-4xl font-bold">
              {user?.displayName}
            </span>
            !
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 shadow">
            {statData?.map(({ title, value, icon, color }, i) => (
              <div
                key={i}
                className={`stat bg-gradient-to-r from-${color}-200 to-white gap-x-8 flex items-center`}
              >
                <div className="stat-title text-3xl">{icon}</div>
                <div className="flex flex-col items-center">
                  <h3 className="stat-value">{value || 0}</h3>
                  <p>{title}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full flex flex-col lg:flex-row h-[850px] md:h-96 ">
            <div className="w-full h-full lg:w-1/2 bg-orange-100 border-b-2 md:border-r-2 border-secondary flex justify-center items-center">
              <BarChart
                width={400}
                height={300}
                data={chartData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis className="text-xs" dataKey="name" />
                <YAxis />
                <Bar
                  dataKey="price"
                  fill="#8884d8"
                  shape={<TriangleBar />}
                  label={{ position: "top" }}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                  ))}
                </Bar>
                <Legend />
                <Tooltip />
              </BarChart>
            </div>
            <div className="lg:w-1/2 bg-slate-100 w-full flex justify-center items-center pl-4">
              <PieChart width={380} height={380}>
                <Legend />
                <Pie
                  data={chartData}
                  cx={200}
                  cy={200}
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>
          </div>
        </div>
      ) : (
        <Loader></Loader>
      )}
    </div>
  );
};

export default AdminHome;
