import ProductCard from "../components/ProductCard";
import { useState } from "react";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import PopularCards from "../components/PopularCards";
import CardPage from "./CardPage";
import OurServices from "../components/OurServices";
import WhyChooseUs from "../components/WhyChooseUs";
import WelcomeBanner from "../components/WelcomeBanner";
import TrendingCards from "../components/TrendingCards";

// Images
import weddingImg from "../assets/wedding.png";
import businessImg from "../assets/wedding.png";
import birthdayImg from "../assets/wedding.png";
import babyShowerImg from "../assets/wedding.png";
import festiveImg from "../assets/wedding.png";
import corporate1 from "../assets/wedding.png";

// Carousel Responsive
const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

// Banner images
const images = [
  {
    id: 1,
    link: "https://img.freepik.com/free-vector/traditional-happy-diwali-occasion-banner-indian-style_1017-40410.jpg",
  },
  {
    id: 2,
    link: "https://static.vecteezy.com/system/resources/previews/024/715/548/large_2x/modern-printing-press-creates-colorful-documents-indoors-generated-by-ai-photo.jpg",
  },
  {
    id: 3,
    link: "https://img.freepik.com/free-photo/modern-manufacturing-equipment-futuristic-factory-generated-by-ai_188544-18464.jpg",
  },
];

// Categories
const categories = [
  { title: "Wedding", price: "₹170", image: weddingImg, category: "wedding" },
  { title: "Business Inauguration", price: "₹180", image: businessImg, category: "business-inauguration" },
  { title: "Birthday", price: "₹120", image: birthdayImg, category: "birthday" },
  { title: "Baby Shower", price: "₹180", image: babyShowerImg, category: "baby-shower" },
  { title: "Festive Greetings", price: "₹100", image: festiveImg, category: "festive-greetings" },
  { title: "Corporate", price: "₹150", image: corporate1, category: "corporate" },
];

function Home() {
  const [category, setCategory] = useState("wedding");

  return (
    <div className="px-3 md:px-5 pt-3 md:pt-5 font-serif bg-white text-gray-800 relative">
      {/* Welcome Section */}
      <WelcomeBanner />

      
    {/* Categories */}
<section className="md:px-10 mt-6">
  <div className="relative w-full overflow-x-auto no-scrollbar">
    <div className="flex w-full md:gap-8 gap-7 px-1 md:px-2">
      {categories.map((card, index) => (
        <button
          onClick={() => setCategory(card.category)}
          key={index}
          className={`md:w-[200px] w-[120px] rounded-lg flex flex-col items-center text-center transition-all duration-300 ease-in-out p-4
            ${category === card.category 
              ? "bg-gray-300 text-white shadow-lg scale-101" 
              : "bg-white text-gray-800"
            }
            hover:bg-blue-800 hover:text-white hover:shadow-sm`}
        >
          <div className="w-[50px] h-[50px] md:w-16 md:h-16 rounded-md overflow-hidden transition-transform duration-300 ease-in-out hover:scale-101">
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-full object-cover"
            />
          </div>
        
        </button>
      ))}
    </div>
  </div>
</section>


      {/* Carousel */}
      <Carousel
        swipeable
        draggable
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={2500}
        keyBoardControl
        transitionDuration={500}
        containerClass="carousel-container mt-6"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        itemClass="carousel-item-padding-40px"
      >
        {images.map((img) => (
          <div
            key={img.id}
            className="w-full h-[235.5px] md:h-[330px] overflow-hidden rounded-xl"
          >
            <img
              src={img.link}
              alt={`Slide ${img.id}`}
              className="w-full h-full object-cover object-center"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </div>
        ))}
      </Carousel>

      {/* Card Section */}
      <CardPage category={category} />

      {/* Popular Cards */}
      <PopularCards />

      {/* Trending Cards */}
      <TrendingCards />

      {/* Services */}
      <OurServices />

      {/* Why Choose Us */}
      <WhyChooseUs />
    </div>
  );
}

export default Home;
