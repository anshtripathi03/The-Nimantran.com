import { useNavigate, Link } from "react-router-dom";
import { useEffect, useCallback, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCartItems, removeFromCart, updateQuantity } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems, totalAmount, discountAmount } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  // Local state to track custom quantity inputs per item
  const [customInputs, setCustomInputs] = useState({});

  // Memoized calculations
  const { discountPercentage, deliveryCharge, finalAmount } = useMemo(() => {
    const discountPercentage = totalAmount > 0
      ? Math.round((discountAmount / totalAmount) * 100)
      : 0;

    const deliveryCharge = totalAmount > 200 ? 0 : 40;
    const finalAmount = totalAmount - discountAmount + deliveryCharge;

    return { discountPercentage, deliveryCharge, finalAmount };
  }, [totalAmount, discountAmount]);

  // Fetch cart items on mount
  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  // Handle card click
  const handleCardClick = useCallback((item) => {
    if (!item?.cardId?._id) return toast.error("Invalid card item");
    navigate(`/card/${item.cardId._id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [navigate]);

  // Login reminder
  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => {
        toast.info("Dear User! Please login to get your cart");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  // Quantity update
  const handleQuantityUpdate = useCallback((cardId, quantity) => {
    if (!isNaN(quantity) && quantity > 0) {
      dispatch(updateQuantity({ cardId, quantity }));
    }
  }, [dispatch]);

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="text-center py-20 min-h-screen text-gray-500">
        <div className="text-6xl mb-4">🛒</div>
        <p className="text-xl mb-6">Your cart is empty</p>
        <Link
          to="/"
          className="inline-block bg-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-pink-700 transition"
        >
          Go Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 md:mb-8 text-gray-800 border-b pb-4">
        🛒 Your Shopping Cart
      </h1>

      <ul className="space-y-4 md:space-y-6">
        {cartItems.map((item) => {
          const showCustomInput = customInputs[item.cardId._id]?.show || false;
          const inputValue = customInputs[item.cardId._id]?.value || item.quantity;

          return (
            <li
              key={item.cardId._id}
              className="flex flex-col md:flex-row md:items-center justify-between p-3 md:p-4 border rounded-lg hover:shadow-lg transition-shadow"
            >
              <div
                className="flex items-center space-x-3 md:space-x-4 mb-3 md:mb-0 cursor-pointer"
                onClick={() => handleCardClick(item)}
              >
                <img
                  src={item?.cardId?.images?.primaryImage || "/fallback.jpg"}
                  alt={item.cardId?.name}
                  className="w-20 h-16 md:w-24 md:h-20 object-cover rounded-md border"
                />
                <div className="flex-1">
                  <h2 className="font-semibold text-base md:text-lg text-gray-800 hover:text-pink-600 transition">
                    {item?.cardId?.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    ₹{item.cardId.price.toFixed(2)} × {item.quantity} (Pack of 50 Cards)
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end space-x-2">
                {/* Quantity buttons */}
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleQuantityUpdate(item.cardId._id, num)}
                    className={`px-3 py-1 rounded border ${
                      item.quantity === num ? "bg-pink-600 text-white" : "bg-white text-gray-800"
                    }`}
                  >
                    {num}
                  </button>
                ))}

                
                {/* More / Custom input */}
{customInputs[item.cardId._id]?.show ? (
  <>
    <input
      type="number"
      min="1"
      value={inputValue}
      onChange={(e) =>
        setCustomInputs((prev) => ({
          ...prev,
          [item.cardId._id]: { ...prev[item.cardId._id], value: parseInt(e.target.value) }
        }))
      }
      className="w-16 px-2 py-1 border rounded text-sm md:text-base"
    />
    <button
      onClick={() => {
        handleQuantityUpdate(item.cardId._id, inputValue);
        setCustomInputs((prev) => ({
          ...prev,
          [item.cardId._id]: { show: false, value: inputValue }
        }));
        toast.success("Saved successfully")
      }}
      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
    >
      Save
    </button>
  </>
) : (
  <button
    onClick={() =>
      setCustomInputs((prev) => ({
        ...prev,
        [item.cardId._id]: { show: true, value: item.quantity }
      }))
    }
    className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
  >
    More
  </button>
)}


                {/* Remove button */}
                <button
                  onClick={() => dispatch(removeFromCart(item.cardId._id))}
                  className="text-red-500 hover:text-red-700 transition text-sm md:text-base"
                >
                  Remove
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 md:mt-8 bg-gray-50 p-4 md:p-6 rounded-lg shadow-inner">
        <h2 className="text-xl font-semibold mb-3 md:mb-4">Price Details</h2>
        <div className="space-y-2">
          <div className="flex justify-between text-gray-700">
            <span>Price ({cartItems.length} items)</span>
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>Discount ({discountPercentage}%)</span>
            <span>-₹{discountAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Delivery Charges</span>
            <span className={deliveryCharge === 0 ? "text-green-600" : ""}>
              {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge.toFixed(2)}`}
            </span>
          </div>
        </div>
        <hr className="my-3 border-gray-300" />
        <div className="flex justify-between font-bold text-lg text-gray-800">
          <span>Total Amount</span>
          <span>₹{finalAmount.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-6 text-center md:text-right">
        <Link
          to="/checkout"
          className="inline-block bg-pink-600 text-white px-6 py-2 md:px-8 md:py-3 rounded-lg font-medium hover:bg-pink-700 transition"
        >
          Proceed to Pay ₹{finalAmount.toFixed(2)}
        </Link>
      </div>
    </div>
  );
}

export default Cart;
