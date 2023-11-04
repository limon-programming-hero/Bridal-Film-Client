import { Pie, PieChart } from "recharts";
import image from "../../assets/Images/About/about1.jpg";
const AboutSkills = () => {
  const skills = [
    {
      title: "Portraits",
      body: "lorem ipsum dolor sit amet, consectetur adip euismod tempor incididunt ut labore et dolore magna aliqu",
      percentage: 90,
    },
    {
      title: "Studio",
      body: "lorem ipsum dolor sit amet, consectetur adip euismod tempor incididunt ut labore et dolore magna aliqu",
      percentage: 80,
    },
    {
      title: "Fashion",
      body: "lorem ipsum dolor sit amet, consectetur adip euismod tempor incididunt ut labore et dolore magna aliqu",
      percentage: 85,
    },
    {
      title: "Lifestyle",
      body: "lorem ipsum dolor sit amet, consectetur adip euismod tempor incididunt ut labore et dolore magna aliqu",
      percentage: 75,
    },
  ];
  const data = [{ name: "Skills", value: 400 }];
  return (
    <div className="hero bg-base-200 py-10">
      <div className="hero-content flex gap-10 flex-col md:flex-row-reverse">
        <div className="w-full md:w-1/3">
          <img src={image} alt="Img" className="w-full rounded-lg shadow-2xl" />
        </div>
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl my-10 text-center font-bold">My Skills</h1>
          <div className="grid gap-4 grid-cols-2">
            {skills.map((skill, index) => (
              <div className="flex flex-col gap-y-2" key={index}>
                <PieChart
                  width={100}
                  height={100}
                  className="text-white relative"
                >
                  <text
                    x={29}
                    y={59}
                    dy={8}
                    textAnchor="middle"
                    fill="rgb(255, 145, 0)"
                  >
                    {`${skill.percentage}%`}
                  </text>
                  <Pie
                    data={data}
                    cx={25}
                    cy={55}
                    innerRadius={25}
                    outerRadius={27}
                    startAngle={90}
                    endAngle={-(skill.percentage * 3.6 - 90)} //converting percentage to degree considering starting angle
                    fill="rgb(255, 145, 0)"
                    dataKey="value"
                  />
                </PieChart>
                <h2 className="text-2xl font-bold">{skill.title}</h2>
                <small>{skill.body}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSkills;
