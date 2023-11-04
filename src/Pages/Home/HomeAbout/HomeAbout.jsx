import image from "../../../assets/Images/Home/portfolio.jpg";
const HomeAbout = () => {
  const isBlack = false;
  const bgColor = isBlack ? "bg-black" : "bg-white";
  const textColor = isBlack ? "text-white" : "text-black";
  const cardInfo = [
    { number: 155, title: "Finished Photo Sessions" },
    { number: 105, title: "Studio Sessions" },
    { number: 125, title: "Happy Clients" },
  ];
  return (
    <div className={`hero my-10 w-full ${textColor} ${bgColor}`}>
      <div className="w-full hero-content flex-col mx-auto md:flex-row">
        <div className="w-full md:w-1/2">
          <img src={image} className="rounded-full shadow-2xl" />
        </div>
        <div className="w-full md:p-8 md:w-1/2">
          <h3 className="text-secondary text-xl font-semibold">About Me</h3>
          <h1 className="text-4xl my-5 font-bold">
            My Name is Alex! <br /> I am a
            <span className="text-secondary"> photographer.</span>
          </h1>
          <p className="pb-6">
            The world without photography will be meaningless to us if there is
            no light and color, which opens up our minds and expresses passion.
            My photos are inspired by light, color, creative perspective,
            techniques & personalities.
          </p>
          <div className="stats stats-vertical lg:stats-horizontal shadow">
            {cardInfo.map((card, index) => (
              <div key={index} className="stat">
                <div className="stat-value text-secondary">{card?.number}</div>
                <div className={`stat-title ${textColor}`}>{card?.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeAbout;
