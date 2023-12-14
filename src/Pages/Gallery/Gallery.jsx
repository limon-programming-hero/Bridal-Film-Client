import { Helmet } from "react-helmet";
import ItemsTab from "../../Component/ItemsTab/ItemsTab";

const Gallery = () => {
  return (
    <div>
      <Helmet>
        <title>Gallery | Bridal Film</title>
      </Helmet>
      <ItemsTab location={"gallery"}></ItemsTab>
    </div>
  );
};

export default Gallery;
