import { Router } from "express";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateProfile
} from "../controllers/user.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  addToCart,
 emptyCart,
 getCartCards,
 removeCartCard,
  updateCartCardQuantity,
} from "../controllers/cart.controller.js";

import {
  createReview,
  deleteReview,
  updateReview
} from "../controllers/review.controller.js";

import { checkOtp, sendOTP } from "../controllers/verification.controller.js";
import {
  cancelOrder,
  createOrder,
  getUserOrders
} from "../controllers/order.controller.js";

import { getAllCards } from "../controllers/card.controller.js";
import { addAddress, getAllAddresses } from "../controllers/address.controller.js";

const router = Router();

/* ========================
   AUTH ROUTES
======================== */
router.post("/auth/registerUser", registerUser);
router.post("/auth/loginUser", loginUser);
router.post("/auth/getLoginOtp", sendOTP);
router.get("/auth/me", verifyJWT, getCurrentUser);
router.post("/auth/logoutUser", verifyJWT, logoutUser);
router.put("/auth/updateProfile", verifyJWT, updateProfile);
router.post("/auth/checkOtp", checkOtp);
router.get("/auth/sendOtp", verifyJWT, sendOTP);
router.post("/token/refreshAccessToken", refreshAccessToken);

/* ========================
   CART ROUTES
======================== */
router.post("/cart/addToCart", verifyJWT, addToCart);
router.get("/cart/getCartCards", verifyJWT,getCartCards);
router.delete("/cart/removeCartCard/:cardId", verifyJWT,removeCartCard);
router.put("/cart/updateCartCardQuantity/:cardId", verifyJWT, updateCartCardQuantity);
router.delete("/cart/emptyCart",verifyJWT,emptyCart)
/* ========================
   REVIEW ROUTES
======================== */
router.post("/review/createReview", verifyJWT, createReview);
router.put("/review/updateReview/:id", verifyJWT, updateReview);
router.delete("/review/deleteReview/:id", verifyJWT, deleteReview);

/* ========================
   CARD ROUTES
======================== */
router.get("/card/getAllCards", getAllCards); // use query params for filters

/* ========================
   ORDER ROUTES
======================== */
router.post("/order/createOrder", verifyJWT, createOrder);
router.get("/order/getUserOrders", verifyJWT, getUserOrders);
router.put("/order/cancelOrder/:id", verifyJWT, cancelOrder);



// Address

router.route("/addAddress").post(verifyJWT,addAddress)
router.route("/getAllAddresses").get(verifyJWT,getAllAddresses)





export default router;