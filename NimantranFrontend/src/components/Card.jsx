import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { addToCart } from "../redux/slices/cartSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
const Card = ({ card }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [isAdded, setIsAdded] = useState(false);

  console.log("I am card ", cartItems)
  useEffect(() => {
    const itemInCart = cartItems.some(item => item?.cardId?._id === card._id);
    console.log(itemInCart)
    setIsAdded(itemInCart);
  }, [cartItems, card._id]);



  const handleCardClick = () => {
    navigate(`/card/${card._id}`,{state:isAdded});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBuyNow = (e) => {
    e?.stopPropagation();
    navigate("/checkout", { state: { card } });
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();

    if (!user) {
      toast.error("Please login to add items to your cart");
      return;
    }

    if (isAdded) {
      toast.info("This item is already in your cart");
      return;
    }

    dispatch(addToCart({ cardId: card._id, quantity: 1 }));
    setIsAdded(true);
    toast.success("Item added to cart successfully");
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-[#eef9f7] rounded-lg shadow-md hover:shadow-lg 
      transition-all duration-300 overflow-hidden flex flex-col cursor-pointer 
      h-full w-full max-w-[280px] min-h-[300px] sm:min-h-[320px]"
    >
      {/* Image */}
      <div className="flex-shrink-0 h-48 sm:h-52 w-full bg-gray-100 p-2">
        <img
          src={card.images?.primaryImage}
          alt={card.name}
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>

      {/* Details */}
      <div className="flex-1 px-3 py-2 flex flex-col justify-between">
        {card.discount && card.discount > 0 ? (
          <>
            <h3 className="text-sm sm:text-base font-semibold font-serif text-gray-800 line-clamp-1">
              {card.name}
            </h3>
            <div className="flex flex-wrap items-center gap-1 text-xs sm:text-sm">
              <span className="text-[#183B4E] line-through">
                ₹{card.price}
              </span>
              <span className="bg-[#ACFADF] px-2 py-0.5 rounded">
                Discount: {Math.round((card.discount / card.price) * 100)}%
              </span>
              <span className="bg-[#ACFADF] px-2 py-0.5 rounded">
                Pack of 50 Cards
              </span>
            </div>
            <div className="text-green-600 font-bold text-sm sm:text-base">
              ₹{card.price - card.discount}
            </div>
          </>
        ) : (
          <>
            <h3 className="text-sm sm:text-base font-semibold font-serif text-gray-800 line-clamp-1">
              {card.name}
            </h3>
            <div className="text-green-600 font-bold text-sm sm:text-base">
              ₹{card.price}
            </div>
          </>
        )}

        {/* Buttons */}
        <div className="flex gap-2 justify-between items-center mt-2 sm:mt-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (isAdded) {
                navigate("/cart"); // ✅ navigate to cart directly
              } else {
                handleAddToCart(e); // add to cart
              }
            }}
            className={`${isAdded
                ? "bg-blue-300 cursor-pointer"
                : "bg-[#ecfbe8] hover:bg-[#A2FF86]"
              } h-8 sm:h-10 w-full text-black rounded-3xl text-xs sm:text-sm font-medium`}
          >
            {isAdded ? "Go to Cart" : "Add to Cart"}
          </button>

          <button
            onClick={(e) => handleBuyNow(e)}
            className="bg-[#A8F1FF] hover:bg-[#6FE6FC] h-8 sm:h-10 w-full 
            text-black rounded-3xl text-xs sm:text-sm font-medium"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;