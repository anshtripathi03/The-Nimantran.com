import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {CartContext} from "../context/CartContext.jsx";

const Card = ({ card }) => {
  const navigate = useNavigate();

//  const handleCardClick = () => {
//   navigate(`/card/${card._id}`);
//   setTimeout(() => {
//     window.scrollTo({ top: 0 });
//   }, 0);
// };


  const handleCardClick = () => {
    navigate(`/card/${card._id}`);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Instead of window.screenTop()
  };
  const {addToCart} = useContext(CartContext)
   const handleBuyNow = (card, e, navigate) => {
    e?.stopPropagation();
    navigate("/checkout", { state: { card } });
  };

  return (
   <div
  onClick={()=>{
    handleCardClick(card,navigate)
  }}
  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col cursor-pointer w-full max-w-[250px]"
>
  <img
    src={card.images.primaryImage}
    alt={card.title}
    className="w-full h-[200px] object-cover"
  />
  <div className="p-2 flex-1 flex flex-col justify-between">
    <div>
      <h3 className="text-md font-semibold font-serif text-gray-800 line-clamp-1">
        {card.title}
      </h3>
      <p className="text-xs text-gray-600 line-clamp-2">{card.description}</p>
    </div>
    <div className="mt-2">
      <p className="text-[#c28800] text-base font-bold">₹{card.price}</p>
      <div className="flex gap-1 mt-2">
        <button
          onClick={(e) =>{  
            e.stopPropagation()
            addToCart(card._id,1)}}
          className={` bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium`}
        >
        AddToCart
        </button>
        <button
          onClick={(e) => handleBuyNow(card, e, navigate)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-2 py-1 rounded text-xs font-medium"
        >
          Buy Now
        </button>
      </div>
    </div>
  </div>
</div>

  );
};

export default Card;
