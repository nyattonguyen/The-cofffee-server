import { format } from "date-fns";
import catchAsyncError from "../middleware/catchAsyncErrors.js";
import { OrderModel } from "../models/index.js";
import ErrorHandler from "../utills/errorHandle.js";
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
export const getOneOrder = catchAsyncError(async (req, res, next) => {
  const order = await OrderModel.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) return next(new ErrorHandler("Order not found", 404));

  res.status(200).json({
    success: true,
    message: "get single order successfully",
    order,
  });
});
export const myOrders = catchAsyncError(async (req, res, _next) => {
  const orders = await OrderModel.find({ user: req.user._id });
  res.status(200).json({
    message: "get my orders successfully",
    orders,
    success: true,
  });
});
export const updateStatusOrder = catchAsyncError(async (req, res, next) => {
  const order = await OrderModel.findById(req.params.id);

  if (!order) return next(new ErrorHandler("Order not found", 404));
  if (order.status == "Delivered") {
    return next(new ErrorHandler("You have already delivered this order", 400));
  }
  if (order.status === "Shipping") {
    order.status = "Delivered";
  } else if (order.status === "Prepare") {
    order.status = "Shipping";
  }
  await order.save({ new: true });
  res.status(200).json({
    success: true,
    order,
  });
});
export const cancelOrder = catchAsyncError(async (req, res, next) => {
  const order = await OrderModel.findById(req.params.id);

  if (!order) return next(new ErrorHandler("Order not found", 404));
  if (order.status == "Prepare") {
    order.status = "Cancel";
  } else if (order.status !== "Prepare") {
    return next(new ErrorHandler("You have already shipping this order", 400));
  }

  order.status = await order.save({ new: true });
  res.status(200).json({
    success: true,
    order,
  });
});
export const calculateMonthlyRevenue = catchAsyncError(
  async (req, res, next) => {
    const pipeline = [
      {
        $match: {
          status: "Delivered",
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m",
              date: { $toDate: "$createdAt" },
            },
          },
          revenue: {
            $sum: {
              $toDouble: {
                $ifNull: [{ $toDouble: "$totalPrice" }, 0],
              },
            },
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ];

    const monthlyRevenue = await OrderModel.aggregate(pipeline);

    res.status(200).json({
      success: true,
      monthlyRevenue,
    });
  }
);

export const calculateWeeklyRevenue = catchAsyncError(
  async (req, res, next) => {
    const pipeline = [
      {
        $match: {
          status: "Delivered",
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%U",
              date: { $toDate: "$createdAt" },
            },
          },
          revenue: {
            $sum: {
              $toDouble: {
                $ifNull: [{ $toDouble: "$totalPrice" }, 0],
              },
            },
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ];

    const monthlyRevenue = await OrderModel.aggregate(pipeline);

    res.status(200).json({
      success: true,
      monthlyRevenue,
    });
  }
);

export const calculateDaylyRevenue = catchAsyncError(async (req, res, next) => {
  const pipeline = [
    {
      $match: {
        status: "Delivered",
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%h",
            date: { $toDate: "$createdAt" },
          },
        },
        revenue: {
          $sum: {
            $toDouble: {
              $ifNull: [{ $toDouble: "$totalPrice" }, 0],
            },
          },
        },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ];

  const monthlyRevenue = await OrderModel.aggregate(pipeline);

  res.status(200).json({
    success: true,
    monthlyRevenue,
  });
});
