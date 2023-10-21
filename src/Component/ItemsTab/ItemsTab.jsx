import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import UseItems from "../../Hooks/UseItems";
import BlogCard from "../BlogCards/BlogCard";
import { PropTypes } from "prop-types";
import HomeBlogCard from "../BlogCards/HomeBlogCard";
const ItemsTab = ({ location }) => {
  let isHome = false,
    isGallery = false,
    isBLog = false;
  if (location === "gallery") {
    isGallery = true;
  } else if (location === "blog") {
    isBLog = true;
  } else {
    isHome = true;
  }
  const {
    items,
    fashionItems,
    lifestyleItems,
    natureItems,
    portraitsItems,
    studioItems,
  } = UseItems();
  const tabDetails = [
    { name: "All", data: items },
    { name: "Fashion", data: fashionItems },
    { name: "Lifestyle", data: lifestyleItems },
    { name: "Nature", data: natureItems },
    { name: "Portraits", data: portraitsItems },
    { name: "Studio", data: studioItems },
  ];
  return (
    <div className="my-8">
      {isHome && (
        <h1 className="text-4xl my-8 font-bold text-black text-center">
          Latest <span className="text-secondary">Works</span>
        </h1>
      )}
      <Tabs>
        <div className="w-full items-center">
          {/* this is tablist heading portion */}
          <TabList className="mx-auto flex gap-x-3 w-fit">
            {tabDetails.map((tabDetail, index) => (
              <Tab
                key={index}
                className="hover:text-secondary cursor-pointer focus:border-l-2 focus:border-t-2 focus:border-r-2 focus:border-secondary p-3"
              >
                {tabDetail?.name}
              </Tab>
            ))}
          </TabList>
        </div>
        {/* this is tablist data or tab panel portion */}
        {tabDetails?.map((tabDetail, index) => (
          <TabPanel key={index}>
            {isBLog && (
              <div className="w-full gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {tabDetail?.data?.map((singleData, index) => (
                  <BlogCard key={index} data={singleData}></BlogCard>
                ))}
              </div>
            )}
            {isHome && (
              <div className="w-full grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {tabDetail?.data?.map((singleData, index) => (
                  <HomeBlogCard
                    key={index}
                    index={index}
                    data={singleData}
                  ></HomeBlogCard>
                ))}
              </div>
            )}
            {isGallery && (
              <div className="w-full gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {tabDetail?.data?.map((singleData, index) => (
                  <BlogCard key={index} data={singleData}></BlogCard>
                ))}
              </div>
            )}
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
};
ItemsTab.propTypes = {
  location: PropTypes.string.isRequired,
};

export default ItemsTab;
