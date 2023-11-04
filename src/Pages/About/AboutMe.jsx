import image from "../../assets/Images/About/about2.jpg";
const AboutMe = () => {
  return (
    <div className="hero bg-base-200">
      <div className="hero-content flex gap-10 flex-col md:flex-row">
        <div className="w-full md:w-1/3">
          <img src={image} alt="Img" className="w-full rounded-lg shadow-2xl" />
        </div>
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-bold">
            My Name is <span className="text-secondary">Ripon Ali</span> <br />I
            am a Photographer.
          </h1>
          <p className="py-6">
            A photographer is an artist who captures images using a camera. They
            create visually compelling images that tell a story or evoke
            emotion. They may specialize in a particular genre and must have a
            keen eye for detail and a passion for their craft.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
