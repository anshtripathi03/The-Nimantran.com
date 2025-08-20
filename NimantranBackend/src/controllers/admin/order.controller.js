import asyncHandler from "../../utils/asyncHandler.js";
import Order from "../../models/order.model.js"
import ApiResponse from "../../utils/apiResponse.js";
import ApiError from "../../utils/apiError.js";






export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate("user", "name email phone")
    .populate("items.product", "title price")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, orders, "Orders fetched successfully"));
});


export const updatePaymentStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { paymentStatus, transactionId } = req.body;

  const order = await Order.findById(id);

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  order.paymentStatus = paymentStatus;
  if (transactionId) order.transactionId = transactionId;

  await order.save();

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Payment status updated successfully"));
});


export const addTrackingInfo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { deliveryPartner, trackingId } = req.body;

  const order = await Order.findById(id);

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  order.deliveryPartner = deliveryPartner;
  order.trackingId = trackingId;

  await order.save();

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Tracking information added successfully"));
});
export const deleteOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const order = await Order.findByIdAndDelete(id);

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Order deleted successfully"));
});
// 📌 Update Order Status
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const order = await Order.findById(id);

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  order.status = status;
  order.statusHistory.push({ status, date: new Date() });

  await order.save();

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Order status updated successfully"));
});
export const getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const order = await Order.findById(id)
    .populate("user", "name email phone")
    .populate("items.product", "title price");

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Order fetched successfully"));
});
