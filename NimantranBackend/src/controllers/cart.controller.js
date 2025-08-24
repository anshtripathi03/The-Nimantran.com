import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { Card } from "../models/card.model.js";
import { Cart } from "../models/cart.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";

const addToCart = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { cardId, quantity } = req.body;

  if (!mongoose.Types.ObjectId.isValid(cardId)) {
    throw new ApiError(400, "Invalid cardId");
  }
  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new ApiError(400, "Quantity must be a positive integer");
  }

  const card = await Card.findById(cardId);
  if (!card) {
    throw new ApiError(404, "Card not found");
  }

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = await Cart.create({
      userId,
      cards: [{ cardId, quantity }],
    });
  } else {
    const existingItem = cart.cards.find(
      item => item.cardId.toString() === cardId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.cards.push({ cardId, quantity });
    }
    await cart.save();
  }

  res.status(200).json(new ApiResponse(200, cart, "Item added to cart"));
});

const getCartCards = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user._id })
    .populate("cards.cardId", "name price images discount")
    .lean();

  if (!cart || cart.cards.length === 0) {
    return res.status(200).json(new ApiResponse(200, [], "Cart is empty"));
  }

  res.status(200).json(new ApiResponse(200, cart.cards, "Cart fetched"));
});

const removeCartCard = asyncHandler(async (req, res) => {
  const { cardId } = req.params;
  console.log(cardId)
  if (!mongoose.Types.ObjectId.isValid(cardId)) {
    throw new ApiError(400, "Invalid cardId");
  }

  const updatedCart = await Cart.findOneAndUpdate(
    { userId: req.user._id },
    { $pull: { cards: { cardId } } },
    { new: true }
  ).populate("cards.cardId", "name price images");

  if (!updatedCart) {
    throw new ApiError(404, "Cart or item not found");
  }

  res.status(200).json(new ApiResponse(200, updatedCart, "Item removed"));
});

const totalCartAmount = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user._id })
    .populate("cards.cardId", "price")
    .lean();

  if (!cart || cart.cards.length === 0) {
    throw new ApiError(404, "Cart is empty");
  }

  const total = cart.cards.reduce(
    (acc, item) => acc + item.cardId.price * item.quantity,
    0
  );

  res.status(200).json(new ApiResponse(200, { total }, "Total calculated"));
});

const updateCartCardQuantity = asyncHandler(async (req, res) => {
  const { cardId } = req.params;
  const { quantity } = req.body;

  if (!mongoose.Types.ObjectId.isValid(cardId)) {
    throw new ApiError(400, "Invalid cardId");
  }
  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new ApiError(400, "Quantity must be a positive integer");
  }

  const cart = await Cart.findOneAndUpdate(
    { userId: req.user._id, "cards.cardId": cardId },
    { $set: { "cards.$.quantity": quantity } },
    { new: true }
  ).populate("cards.cardId", "name price images");

  if (!cart) {
    throw new ApiError(404, "Cart or card not found");
  }

  res.status(200).json(new ApiResponse(200, cart, "Quantity updated"));
});
const emptyCart = asyncHandler(async(req,res)=>{
  const userId = req.user?._id;

  const cart = await Cart.findOneAndDelete({userId})


 if(!cart)
 {
  throw new ApiError(400,"Something went wrong while deleting the cart")
 }

 return res.status(200).json(
  new ApiResponse(202,{},"Cart is empty")
 )










})
export {
  addToCart,
  getCartCards,
  removeCartCard,
  totalCartAmount,
  emptyCart,
  updateCartCardQuantity
};
