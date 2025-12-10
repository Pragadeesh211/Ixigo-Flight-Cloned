import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import "./CarouselStyle.css";
import { Card } from "antd";

import card1 from "../Images/card1.jpg";
import card2 from "../Images/card2.jpg";
import card3 from "../Images/card3.jpg";
import card4 from "../Images/card4.jpg";
import card5 from "../Images/card5.jpeg";
import card6 from "../Images/card6.jpg"
import { image } from "fontawesome";

const cardData = [
  { id: 1, image: card5 },
  { id: 2, image: card2 },
  { id: 3, image: card3 },
  { id: 4, image: card4 },
  { id: 5, image: card6 },
  { id: 6, image: card3 },
  { id: 7, image: card4 },
  { id: 8, image: card5 },
];

const CardCarousel = () => {
  return (
    <div className="offer-carousel-container">
      <Swiper
        slidesPerView={4}
        spaceBetween={20}
        navigation
        pagination={{ clickable: true }}
        modules={[Navigation]}
        loop={false}
        breakpoints={{
          0: { slidesPerView: 1.2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        className="offer-swiper1"
      >
        {cardData.map((card) => (
          <SwiperSlide key={card.id}>
            <Card 
            className="offer-card"
            hoverable
            cover={
                <img
                src={card.image}
                />
            }
            >
              
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CardCarousel;
