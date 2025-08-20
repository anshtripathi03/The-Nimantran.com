import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../config.js";

// --- Async thunks ---

// Fetch cart
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/user/cart/getCartCards`, {
        withCredentials: true,
      });
      return res.data.data; // array of cart items
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch cart");
    }
  }
);

// Add to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ cardId, quantity = 1 }, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/user/cart/addToCart`,
        { cardId, quantity },
        { withCredentials: true }
      );
      if (res.status === 200) {
        // re-fetch cart after add
        dispatch(fetchCartItems());
      }
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to add to cart");
    }
  }
);

// Remove item
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (cardId, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.delete(
        `${API_BASE_URL}/api/user/cart/removeCartCard/${cardId}`,
        { withCredentials: true }
      );
      if (res.status === 200) {
        dispatch(fetchCartItems());
      }
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to remove from cart");
    }
  }
);

// Update quantity
export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ cardId, quantity }, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${API_BASE_URL}/api/user/cart/updateCartCardQuantity/${cardId}`,
        { quantity },
        { withCredentials: true }
      );
      if (res.status === 200) {
        dispatch(fetchCartItems());
      }
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to update quantity");
    }
  }
);






// --- Helpers ---
const calculateTotal = (items) =>
  items.reduce((acc, item) => {
    console.log(item)
    const price = typeof item?.cardId?.price === "number" ? item.cardId.price : 0;
    const qty = typeof item?.quantity === "number" ? item.quantity : 1;
    return acc + price * qty;
  }, 0);

const calculateTotalDiscountPrice = (items) =>
  items.reduce((acc, item) => {
    const price =
      typeof item?.cardId?.discount === "number"
        ? item.cardId.discount
        : 0;
    const qty = typeof item?.quantity === "number" ? item.quantity : 1;
    return acc + price * qty;
  }, 0);



  
// --- Slice ---
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems:  [],
    totalAmount: 0,
    discountAmount: 0,
    loading: false,
    error: null,
    isAdded:false
  },
  reducers: {
  
  }, // (no direct reducers yet)
  extraReducers: (builder) => {
    builder
      // Fetch cart
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload || [];
        state.totalAmount = calculateTotal(state.cartItems);
        state.discountAmount = calculateTotalDiscountPrice(state.cartItems);
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
