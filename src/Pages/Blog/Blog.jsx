import { Helmet } from "react-helmet";
import ItemsTab from "../../Component/ItemsTab/ItemsTab";

const Blog = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Blog | Bridal Film</title>
      </Helmet>
      <ItemsTab location={"blog"}></ItemsTab>
    </div>
  );
};

export default Blog;
