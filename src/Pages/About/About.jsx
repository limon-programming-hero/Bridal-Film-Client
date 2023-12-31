import { Helmet } from "react-helmet";
import AboutMe from "./AboutMe";
import AboutSkills from "./AboutSkills";

const About = () => {
  return (
    <div>
      <Helmet>
        <title>About Me | Bridal Film</title>
      </Helmet>
      <AboutMe></AboutMe>
      <AboutSkills></AboutSkills>
    </div>
  );
};

export default About;
