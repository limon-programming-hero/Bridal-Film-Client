import { Helmet } from "react-helmet";
import ItemsTab from "../../../Component/ItemsTab/ItemsTab";
import HomeAbout from "../HomeAbout/HomeAbout";
import HomeCarousel from "../HomeCarousel/HomeCarousel";
import HomeWorks from "../HomeWorks/HomeWorks";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home | Bridal Film</title>
      </Helmet>
      <HomeCarousel></HomeCarousel>
      <HomeAbout></HomeAbout>
      <HomeWorks></HomeWorks>
      <ItemsTab location={"home"}></ItemsTab>
    </div>
  );
};

export default Home;
