import ProductCard from "../components/ProductCard";
import { Link, NavLink } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import PopularCards from "../components/PopularCards";
import CardPage from "./CardPage";

import weddingImg from "../assets/wedding.png";
import businessImg from "../assets/wedding.png";
import birthdayImg from "../assets/wedding.png";
import babyShowerImg from "../assets/wedding.png";
import festiveImg from "../assets/wedding.png";
import corporate1 from "../assets/wedding.png";
import corporate2 from "../assets/wedding.png";
import corporate3 from "../assets/wedding.png";
import OurServices from "../components/OurServices";
import WhyChooseUs from "../components/WhyChooseUs";
import WelcomeBanner from "../components/WelcomeBanner";
import TrendingCards from "../components/TrendingCards";

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};


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

const categories = [
  { title: "Wedding", price: "₹170", image: weddingImg, category: "wedding" },
  { title: "Business Inauguration", price: "₹180", image: businessImg, category: "business-inauguration" },
  { title: "Birthday", price: "₹120", image: birthdayImg, category: "birthday" },
  { title: "Baby Shower", price: "₹180", image: babyShowerImg, category: "baby-shower" },
  { title: "Festive Greetings", price: "₹100", image: festiveImg, to: "festive-greetings" },
  { title: "Corporate", price: "₹150", image: corporate1, category: "corporate" },
 
];


function Home() {

   const [category, setCategory] = useState('wedding')


  return (
    <div className="space-y-16 px-4 py-8 font-serif bg-white text-gray-800 relative">
      
      <WelcomeBanner/>

<Carousel
        swipeable
        draggable
        responsive={responsive}
        infinite
         autoPlay = {false}
        autoPlaySpeed={2500}
        keyBoardControl
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        itemClass="carousel-item-padding-40-px"
      >
        {images.map((img) => (
          <img
            key={img.id}
            src={img.link}
            alt={`Slide ${img.id}`}
            className="w-full h-[320px] object-cover rounded-lg shadow-lg"
          />
        ))}
      </Carousel>


     


    

<section className="px-4 md:px-20 py-10 bg-background">
  <h2 className="text-3xl font-bold text-center mb-8 text-heading">Our Categories</h2>

  <div className="flex flex-wrap justify-center gap-6">
    {categories.map((card, index) => (
      <button
        onClick={ ()=>
          setCategory(card.category)
        }
        key={index}
        className="flex flex-col items-center text-center"
      >
        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden shadow-md hover:shadow-xl transition">
          <img
            src={card.image}
            alt={card.title}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="mt-2 text-xs sm:text-sm md:text-base font-semibold">{card.title}</h3>
      </button>
    ))}
  </div>
</section>

<CardPage  category={category} />



    
      
      <PopularCards/>
      <TrendingCards/>



      
      <OurServices />
      <WhyChooseUs />
    </div>
  );
}

export default Home;
