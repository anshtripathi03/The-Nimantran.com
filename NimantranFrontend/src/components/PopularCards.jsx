import React, { useEffect, useState, useCallback } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "./Card";
import { API_BASE_URL } from "../config";
import axios from "axios";

const PopularCards = () => {
  const [popularCards, setPopularCards] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  const fetchProducts = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/user/card/getAllCards?isPopular=true`);
      const popular = res.data.data?.filter(card => card.isPopular === true) || [];
      setPopularCards(popular);
    } catch (error) {
      console.error("Issue while fetching products", error);
      setPopularCards([]);
    }
  }, []);

  useEffect(() => {
    fetchProducts();

    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [fetchProducts]);

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
    tablet: { breakpoint: { max: 1024, min: 768 }, items: 2 },
    mobile: { breakpoint: { max: 768, min: 0 }, items: 2 },
  };

  return (
    <div className="px-4 md:px-16 py-10 bg-gradient-to-b from-white to-gray-50 font-serif">
      {/* Section Heading */}
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800 relative">
        <span className="relative z-10">🔥 Popular Cards</span>
        <span className="absolute bottom-0 left-1/2 w-20 h-1 bg-yellow-400 rounded-full -translate-x-1/2"></span>
      </h2>

      {isMobile ? (
        <div className="grid grid-cols-2 gap-4">
          {popularCards.map(card => (
            <div key={card._id} className="transition-transform duration-300 hover:scale-105">
              <Card card={card} />
            </div>
          ))}
        </div>
      ) : (
        <Carousel
          responsive={responsive}
          infinite
          autoPlay={false}
          containerClass="pb-6"
          itemClass="px-3"
        >
          {popularCards.map(card => (
            <div
              key={card._id}
              className="transition-transform duration-300 hover:scale-105"
            >
              <Card card={card} />
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default PopularCards;
