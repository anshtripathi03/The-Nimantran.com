import { Router } from "express";
import { getCurrentUser, loginUser, logoutUser, refreshAccessToken, registerUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middlerware.js";
import { checkOtp, sendOTP } from "../controllers/verification.controller.js";
import { addToCart, getCartItems, removeCartItem, totalCartAmount, updateCartItemQuantity } from "../controllers/cart.controller.js";
import { addProduct, fetchProducts } from "../controllers/product.controller.js";
import { addNewAdress, getAddresses } from "../controllers/address.controller.js";

const  router = Router()



console.log(registerUser)
router.route("/auth/register").post(registerUser);
router.route("/auth/login").post(loginUser)
router.route("/auth/logout").post(verifyJWT,logoutUser)
router.route("/auth/sendOtp").get(verifyJWT,sendOTP)
router.route("/auth/loginOtp").post(sendOTP)
router.route("/cart/add").post(verifyJWT,addToCart)
router.route("/auth/refresh-token").post(refreshAccessToken)
router.route("/auth/me").post(verifyJWT,getCurrentUser)
router.route("/cart").get(verifyJWT,getCartItems)
router.route("/admin/addProduct").post(addProduct)
router.route("/product/fetchProduct").get(fetchProducts)
router.route("/cart/remove/:productId").delete(verifyJWT,removeCartItem)
router.route("/product/totalAmount").get(verifyJWT,totalCartAmount)
router.route("/cart/update/:productId").put(verifyJWT,updateCartItemQuantity)
router.route("/auth/checkOtp").post(checkOtp)











// Address routes

router.route("/addAddress").post(verifyJWT,addNewAdress)
router.route("/getAddresses").get(verifyJWT,getAddresses)




export default router;