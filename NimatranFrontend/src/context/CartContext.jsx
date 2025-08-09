// context/C
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import {API_BASE_URL} from "../config.js"
const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Load from localStorage on init
    try {
      return JSON.parse(localStorage.getItem("cartItems")) || [];
    } catch {
      return [];
    }
  });
  const [loading, setLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  // Calculate total locally
  const calculateTotal = useCallback((items) => {
    console.log(items)
    return items.reduce((acc, item) => {
      const price = typeof item?.productId?.price === "number" ? item.productId?.price : 0;
      const qty = typeof item?.quantity === "number" ? item.quantity : 1;
      return acc + price * qty;
    }, 0);
  }, []);

  // Fetch cart items from API
  const fetchCartItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/cart`);
      if (Array.isArray(res.data?.data)) {
        setCartItems(res.data.data);
        setTotalAmount(calculateTotal(res.data.data));
        localStorage.setItem("cartItems", JSON.stringify(res.data.data));
      } else {
        console.error("Invalid cart data format", res.data);
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  }, [calculateTotal]);

  // Add item to cart
  const addToCart = useCallback(async (productId, quantity = 1) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/cart/add`, { productId, quantity });
      if (res.status === 200) {
        await fetchCartItems();
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  }, [fetchCartItems]);

  // Remove item from cart
  const removeFromCart = useCallback(async (productId) => {
    try {
      const res = await axios.delete(`${API_BASE_URL}/api/cart/remove/${productId}`);
      if (res.status === 200) {
        await fetchCartItems();
      }
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  }, [fetchCartItems]);

  // Update quantity
  const updateQuantity = useCallback(async (productId, quantity) => {
    try {
      const res = await axios.put(`${API_BASE_URL}/api/cart/update/${productId}`, { quantity });
      if (res.status === 200) {
        await fetchCartItems();
      }
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  }, [fetchCartItems]);

  // Initial fetch from backend to sync
  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalAmount,
        loading,
        fetchCartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export  {CartContext};