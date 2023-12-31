import cloundinary from "cloudinary";
import catchAsyncError from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utills/errorHandle.js";
import { CategoryModel, UserModel } from "../models/index.js";

export const getCategories = catchAsyncError(async (req, res, next) => {
  const categories = await CategoryModel.find().where({ status: false });
  const categoriesCount = await CategoryModel.count();

  res.status(200).json({
    categories,
    message: "get categories successfully",
    success: true,
    categoriesCount,
  });
});
export const getAllCategory = catchAsyncError(async (req, res, next) => {
  const categories = await CategoryModel.find();
  const categoriesCount = await CategoryModel.count();

  res.status(200).json({
    categories,
    message: "get all categories successfully",
    success: true,
    categoriesCount,
  });
});
export const createCategory = catchAsyncError(async (req, res, next) => {
  const user = req.user;
  const { title, status } = req.body;

  const newCategory = await CategoryModel.create({
    user: user._id,
    title,
  });
  if (!newCategory)
    return next(new ErrorHandler("Create new category...", 400));

  res.status(200).json({
    newCategory,
    success: true,
    message: "Create category successfully!!!",
  });
});
export const getCategoryId = catchAsyncError(async (req, res, next) => {
  const categoryId = await CategoryModel.findById(req.params.id).select(
    "-user"
  );
  if (!categoryId) return next(new ErrorHandler("Create new category...", 400));

  res.status(200).json({
    categoryId,
    success: true,
    message: "Get category id successfully!!!",
  });
});
export const updateCategoryId = catchAsyncError(async (req, res, next) => {
  const user = req.user;

  const category = await CategoryModel.findById(req.params.id).select("-user");
  if (!category) return next(new ErrorHandler("Category not found", 404));

  const updateCategory = await CategoryModel.findByIdAndUpdate(
    req.params.id,
    user.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    updateCategory,
    message: "update category success",
  });
});
export const updateCategoryStatus = catchAsyncError(async (req, res, next) => {
  const category = await CategoryModel.findById(req.params.id);

  if (!category) {
    return next(new ErrorHandler("Not found", 404));
  }

  category.status = !category.status; // change status

  await category.save();

  res.status(200).json({
    category,
    success: true,
  });
});
