import mongoose, { trusted } from "mongoose";
import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { Cart } from "../models/cart.model.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";

const addToCart = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { productId, quantity } = req.body;
  
  // console.log(productId,quantity)









  // Validate productId
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Invalid productId" });
  }

  // const product = await Product.findById(productId);
  // if (!product) {
  //   return res.status(404).json({ message: "Product not found" });
  // }

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = await Cart.create({
      userId,
      items: [{ productId, quantity }],
    });
  } else {
    const existingItem = cart.items.find(item => item.productId.toString() === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
  }

  res.status(200).json({ message: "Item added to cart", cart });
});
const getCartItems = asyncHandler(async (req, res) => {
  const userId = req.user._id; 

  const cart = await Cart.findOne({ userId })
    .populate("items.productId")
    .exec();

  if (!cart || cart.items.length === 0) {
    return res.status(200).json(new ApiResponse(200, [], "Cart is empty"));
  }

  res.status(200).json(new ApiResponse(200, cart.items, "Cart items fetched successfully"));
});
const removeCartItem = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new ApiError(400, "Invalid Product ID");
  }

  const updatedCart = await Cart.findOneAndUpdate(
    { userId: req.user._id },
    { $pull: { items: { productId: new mongoose.Types.ObjectId(productId) } } },
    { new: true }
  ).populate().exec();

  if (!updatedCart) {
    throw new ApiError(404, "Cart or item not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedCart, "Item removed from cart"));
});
const totalCartAmount = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  if (!userId) {
    throw new ApiError(401, "Unauthorized: User not logged in");
  }

  console.log("I am user " + userId);

  const cart = await Cart.findOne({ userId })
    .populate("items.productId")
    .exec();

  if (!cart || !cart.items || cart.items.length === 0) {
    throw new ApiError(404, "Please add some item first");
  }

  const total = cart.items.reduce((acc, item) => {
    return acc + (item.productId.price * item.quantity);
  }, 0);

  return res.status(202).json(
    new ApiResponse(200, total, "Total amount has been fetched successfully")
  );
});
const updateCartItemQuantity = asyncHandler(async(req,res)=>{


  let {quantity} = req.body

  quantity = JSON.parse(quantity)

console.log(quantity)

const userId = req.user?._id
let {productId} = req.params

 if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new ApiError(400, "Invalid Product ID");
  }
productId = new mongoose.Types.ObjectId(productId)
console.log("I am user Id"+userId)
console.log("I am product Id"+productId)
console.log(quantity)
const cart = await Cart.findOneAndUpdate(
{userId},
{
  $set:{
    "items.$[elem].quantity": quantity
  }
},
{
  new:true,
   arrayFilters:[{"elem._id":new mongoose.Types.ObjectId(productId)}]
}

)
if(!cart)
{
  throw new ApiError(400,"Please ensure that the cart exists")
}
console.log("Success")
return res.status(200)
.json(
  new ApiResponse(200,{},"Quantity updated successfully")
)

})
  



export { addToCart,getCartItems,removeCartItem,totalCartAmount,updateCartItemQuantity };
