import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import Order from "../models/order.model.js";
import { v4 as uuidv4 } from "uuid"; // For unique order IDs


export const createOrder = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const {
    items,
    totalAmount,
    discount,
    tax,
    shippingFee,
    finalAmount,
    paymentMethod,
    shippingAddress
  } = req.body;

  if (!items || items.length === 0) {
    throw new ApiError(400, "Order items are required");
  }

  const order = await Order.create({
    orderId: uuidv4(),
    user: userId,
    items,
    totalAmount,
    discount,
    tax,
    shippingFee,
    finalAmount,
    paymentMethod,
    shippingAddress,
    status: "pending",
    statusHistory: [{ status: "pending", date: new Date() }]
  });

  return res
    .status(201)
    .json(new ApiResponse(201, order, "Order created successfully"));
});

export const getUserOrders = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  const orders = await Order.find({ user: userId })
    .populate("items.product", "title price")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, orders, "User orders fetched successfully"));
});

export const cancelOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user?._id;

  const order = await Order.findOne({ _id: id, user: userId });

  if (!order) {
    throw new ApiError(404, "Order not found or unauthorized");
  }

  if (order.status !== "pending") {
    throw new ApiError(400, "Only pending orders can be cancelled");
  }

  order.status = "cancelled";
  order.statusHistory.push({ status: "cancelled", date: new Date() });

  await order.save();

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Order cancelled successfully"));
});







 