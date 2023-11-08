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
                <div
                  className="radial-progress text-secondary "
                  style={{ "--value": skill.percentage, "--thickness": "2px" }}
                >
                  {skill.percentage}%
                </div>
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
