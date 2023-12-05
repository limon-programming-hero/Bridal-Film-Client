import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import UseItems from "../../Hooks/UseItems";
import BlogItemCard from "../ItemCards/BlogItemCard";
import { PropTypes } from "prop-types";
import HomeItemCard from "../ItemCards/HomeItemCard";
import Loader from "./../../Pages/Shared/Loader/Loader";
import GalleryItemCard from "../ItemCards/GalleryItemCard";
import { motion } from "framer-motion";

const ItemsTab = ({ location }) => {
  let isHome = false,
    isGallery = false,
    isBlog = false;

  if (location === "gallery") {
    isGallery = true;
    isHome = false;
    isBlog = false;
  } else if (location === "blog") {
    isBlog = true;
    isHome = false;
    isGallery = false;
  } else if (location === "home") {
    isHome = true;
    isBlog = false;
    isGallery = false;
  }
  const { items, isItemsLoading = true, isItemsRefetch } = UseItems();
  const tabDetails = [
    { name: "All", data: items },
    {
      name: "Fashion",
      data:
        !isItemsLoading && items?.filter((item) => item.category === "fashion"),
    },
    {
      name: "Lifestyle",
      data:
        !isItemsLoading &&
        items?.filter((item) => item.category === "lifestyle"),
    },
    {
      name: "Nature",
      data:
        !isItemsLoading && items?.filter((item) => item.category === "nature"),
    },
    {
      name: "Portraits",
      data:
        !isItemsLoading &&
        items?.filter((item) => item.category === "portraits"),
    },
    {
      name: "Studio",
      data:
        !isItemsLoading && items?.filter((item) => item.category === "studio"),
    },
  ];
  const divVariants = {
    offscreen: {
      y: 200,
    },
    onscreen: {
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 1.7,
      },
    },
  };
  const divVariantsGallery = {
    offscreen: {
      x: -500,
    },
    onscreen: {
      x: 0,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };
  return (
    <div className="my-8">
      <div className={isHome ? "" : "mt-24"}>
        {isHome && (
          <h1 className="text-4xl my-8 font-bold text-black text-center">
            Latest <span className="text-secondary">Works</span>
          </h1>
        )}
        {isGallery && (
          <h1 className="text-4xl my-8 font-bold text-black text-center">
            Gallery
          </h1>
        )}
        {isBlog && (
          <h1 className="text-4xl my-8 font-bold text-black text-center">
            Blog
          </h1>
        )}
      </div>
      <Tabs>
        <div className="w-full items-center">
          {/* this is tablist heading portion */}
          <TabList className="mx-auto bg-slate-100 p-x-3 p-y-2 z-10 flex gap-x-3 w-fit">
            {tabDetails?.map((tabDetail, index) => (
              <Tab
                key={index}
                className="hover:text-secondary cursor-pointer p-3"
              >
                {tabDetail?.name}
              </Tab>
            ))}
          </TabList>
        </div>
        {/* this is tablist data or tab panel portion. tab list is dynamic here*/}
        {isItemsLoading && <Loader></Loader>}
        {tabDetails?.map((tabDetail, index) => (
          <TabPanel key={index}>
            {/* if it is called from blog page then it will show like this */}
            {!isItemsLoading && isBlog && (
              <motion.div
                initial="offscreen"
                whileInView={"onscreen"}
                variants={divVariants}
                className="w-full gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              >
                {tabDetail.data?.map((singleData, index) => (
                  <BlogItemCard
                    key={index}
                    refetch={isItemsRefetch}
                    data={singleData}
                  ></BlogItemCard>
                ))}
              </motion.div>
            )}
            {/* if it is called from home page then it will show like this */}
            {!isItemsLoading && isHome && (
              <motion.div
                initial={"offscreen"}
                whileInView={"onscreen"}
                variants={divVariants}
                viewport={{ once: true }}
                className="w-full grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
              >
                {tabDetail.data?.map((singleData, index) => (
                  <HomeItemCard
                    key={index}
                    index={index}
                    data={singleData}
                  ></HomeItemCard>
                ))}
              </motion.div>
            )}
            {/* if it is called from gallery page then it will show like this */}
            {!isItemsLoading && isGallery && (
              <motion.div
                initial={"offscreen"}
                whileInView={"onscreen"}
                variants={divVariantsGallery}
                className="w-full gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              >
                {tabDetail.data?.map((singleData, index) => (
                  <GalleryItemCard
                    key={index}
                    data={singleData}
                  ></GalleryItemCard>
                ))}
              </motion.div>
            )}
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
};
ItemsTab.propTypes = {
  location: PropTypes.string,
};
export default ItemsTab;
