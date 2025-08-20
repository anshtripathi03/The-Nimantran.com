import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../config.js";


 export  const fetchUser = createAsyncThunk("auth/fetchUser", async ( name = "ayush" ,thunkAPI) => {


  try {
    const res = await axios.get(`${API_BASE_URL}/api/user/auth/me`, {
      withCredentials: true,
    });
    console.log(res)
    return res?.data?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch user");
    console.log("error getting fetching")
  }
})






const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    showLogin: { login: false, signup: false },
    loading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setShowLogin: (state, action) => {
      state.showLogin = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.showLogin = { login: true, signup: false };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.showLogin = { login: false, signup: false };
      })
      .addCase(fetchUser.rejected, (state) => {
        state.loading = false;
        console.log("Rejected")
        state.user = null;
        state.showLogin = { login: true, signup: false };
      });

  }


})

export const { setUser, setShowLogin, logout } = authSlice.actions;
export default authSlice.reducer;