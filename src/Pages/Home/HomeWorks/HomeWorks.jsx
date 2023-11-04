import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Autoplay, Pagination } from "swiper/modules";

import image1 from "../../../assets/Images/Home/Works/1.jpg";
import image2 from "../../../assets/Images/Home/Works/2.jpg";
import image3 from "../../../assets/Images/Home/Works/3.jpg";
import image4 from "../../../assets/Images/Home/Works/4.jpg";
import image5 from "../../../assets/Images/Home/Works/5.jpg";
import image6 from "../../../assets/Images/Home/Works/6.jpg";
import image7 from "../../../assets/Images/Home/Works/7.jpg";
import image8 from "../../../assets/Images/Home/Works/8.jpg";
import image9 from "../../../assets/Images/Home/Works/9.jpg";
import { BsInstagram } from "react-icons/bs";

const HomeWorks = () => {
  const img = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
  ];
  return (
    <div className="relative">
      <div className="px-5">
        <button className="text-white btn btn-secondary rounded-none -mx-14 absolute top-32 left-1/2 z-10">
          <BsInstagram></BsInstagram> Follow Me
        </button>
      </div>
      <Swiper
        className="h-72"
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        slidesPerView={4}
        spaceBetween={0}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Autoplay, Pagination]}
      >
        {img.map((img, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${img})` }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeWorks;
