import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "./Card";
import dummyCards from "../Data.jsx";

const PopularCards = () => {
  const [popularCards, setPopularCards] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchPopularCards = () => {
      try {
        const result = dummyCards.filter((card) => card.isPopular === true);
        setPopularCards(result);
      } catch (err) {
        console.log("Failed to fetch popular cards", err);
      }
    };

    fetchPopularCards();

    // Detect mobile
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
    tablet: { breakpoint: { max: 1024, min: 768 }, items: 2 },
    mobile: { breakpoint: { max: 768, min: 0 }, items: 2 },
  };

  return (
    <div className="px-4 md:px-20 py-10 bg-white text-heading font-serif">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#6A4E3A]">
        🔥 Popular Cards
      </h2>

      {isMobile ? (
        <div className="grid grid-cols-2 gap-4">
          {popularCards.map((card) => (
            <Card key={card._id} card={card} />
          ))}
        </div>
      ) : (
        <Carousel responsive={responsive} infinite autoPlay={false}>
          {popularCards.map((card) => (
            <div key={card._id} className="px-2">
              <Card card={card} />
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default PopularCards;
