import cloundinary from "cloudinary";
import catchAsyncError from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utills/errorHandle.js";
import { StoreModel } from "../models/index.js";

export const createStore = catchAsyncError(async (req, res, next) => {
  const { title, desc, image, address, state, city } = req.body;

  const newStore = await StoreModel.create({
    title,
    desc,
    image,
    address,
    state,
    city,
  });
  if (!newStore) return next(new ErrorHandler("Create new blog...", 400));

  res.status(200).json({
    newStore,
    success: true,
    message: "Create blog successfully!!!",
  });
});
export const getAllStore = catchAsyncError(async (req, res, next) => {
  const store = await StoreModel.findOne({}).where({ status: false });
  const storeCount = await StoreModel.count();

  res.status(200).json({
    store,
    message: "get store successfully",
    success: true,
    storeCount,
  });
});
export const getAllStoreMain = catchAsyncError(async (req, res, next) => {
  const store = await StoreModel.find({});
  const storeCount = await StoreModel.count();

  res.status(200).json({
    store,
    message: "get all store successfully",
    success: true,
    storeCount,
  });
});

export const getOneStore = catchAsyncError(async (req, res, next) => {
  const storeId = await StoreModel.findById(req.params.id);
  if (!storeId) return next(new ErrorHandler("Create new category...", 400));

  res.status(200).json({
    storeId,
    success: true,
    message: "Get category id successfully!!!",
  });
});
export const updateStore = catchAsyncError(async (req, res, next) => {
  const store = await StoreModel.findById(req.params.id);
  if (!store) return next(new ErrorHandler("Store not found", 404));

  const updateStore = await StoreModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    updateStore,
    message: "update blog success",
  });
});
export const updateStoreStatus = catchAsyncError(async (req, res, next) => {
  const store = await StoreModel.findById(req.params.id);

  if (!store) {
    return next(new ErrorHandler("Not found", 404));
  }

  store.status = !store.status; // change status

  await store.save();

  res.status(200).json({
    blog,
    success: true,
  });
});
