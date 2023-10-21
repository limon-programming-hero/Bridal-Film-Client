import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import image1 from "../../../assets/Images/Home/1.jpg";
import image2 from "../../../assets/Images/Home/2.jpg";
import image3 from "../../../assets/Images/Home/3.jpg";
import image4 from "../../../assets/Images/Home/4.jpg";
import image5 from "../../../assets/Images/Home/5.jpg";

const HomeCarousel = () => {
  const cardInfo = [
    {
      img: image1,
      title: "Lorem Ipsum Dolor Sit Amet Apple",
      body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit Numquam quidem eveniet sed repudiandae quos animi",
    },
    {
      img: image2,
      title: "Lorem Ipsum Dolor Sit Amet Apple",
      body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit Numquam quidem eveniet sed repudiandae quos animi",
    },
    {
      img: image3,
      title: "Lorem Ipsum Dolor Sit Amet Apple",
      body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit Numquam quidem eveniet sed repudiandae quos animi",
    },
    {
      img: image4,
      title: "Lorem Ipsum Dolor Sit Amet Apple",
      body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit Numquam quidem eveniet sed repudiandae quos animi",
    },
    {
      img: image5,
      title: "Lorem Ipsum Dolor Sit Amet Apple",
      body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit Numquam quidem eveniet sed repudiandae quos animi",
    },
  ];
  console.log(cardInfo[0].img);

  return (
    <Swiper
      className="py-10"
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      modules={[Navigation, Autoplay, Pagination]}
      navigation
      pagination={{ clickable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
    >
      {cardInfo.map((card, i) => (
        <SwiperSlide
          key={i}
          style={{ backgroundImage: `url(${card?.img})` }}
          className=" bg-cover bg-no-repeat bg-center"
        >
          <div
            className={`w-full h-[600px] bg-gradient-to-r from-black bg-opacity-5 flex `}
          >
            <div className="w-full  md:w-2/3 items-start text-white my-auto px-14">
              <h1 className="text-4xl my-3 font-semibold">{card?.title}</h1>
              <p>{card?.body}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HomeCarousel;
