import { format } from "date-fns";
import catchAsyncError from "../middleware/catchAsyncErrors.js";
import { OrderModel } from "../models/index.js";
export const createOrder = catchAsyncError(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    status,
    payment,
    shippingPrice,
    totalPrice,
    note,
    hoursOrder,
    hoursReceive,
  } = req.body;

  let calculatedHoursReceive;

  if (hoursOrder) {
    calculatedHoursReceive = new Date(hoursOrder);
    calculatedHoursReceive.setMinutes(calculatedHoursReceive.getMinutes() + 30);
  }

  const formattedHoursOrder = hoursOrder
    ? format(new Date(hoursOrder), "yyyy-MM-dd HH:mm:ss")
    : undefined;
  const formattedHoursReceive = calculatedHoursReceive
    ? format(calculatedHoursReceive, "yyyy-MM-dd HH:mm:ss")
    : undefined;

  const newOrder = await OrderModel.create({
    orderItems,
    shippingInfo,
    status,
    payment,
    shippingPrice,
    totalPrice,
    note,
    hoursOrder: formattedHoursOrder,
    hoursReceive: formattedHoursReceive,
    user: req.user._id,
  });

  res.status(200).json({
    success: true,
    newOrder,
  });
});

export const getAllOrder = catchAsyncError(async (req, res, next) => {
  const orders = await OrderModel.find({});
  res.status(200).json({
    message: "Get all order successfully...",
    orders,
  });
});
