import cloundinary from "cloudinary";
import catchAsyncError from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utills/errorHandle.js";
import { BlogModel } from "../models/index.js";

export const getAllBlog = catchAsyncError(async (req, res, next) => {
  const blog = await BlogModel.find().where({ status: false });
  const blogCount = await BlogModel.count();

  res.status(200).json({
    blog,
    message: "get blog successfully",
    success: true,
    blogCount,
  });
});
export const getAllBlogMain = catchAsyncError(async (req, res, next) => {
  const blog = await BlogModel.find();
  const blogCount = await BlogModel.count();

  res.status(200).json({
    blog,
    message: "get all blog successfully",
    success: true,
    blogCount,
  });
});
export const createBlog = catchAsyncError(async (req, res, next) => {
  const { title, desc, image } = req.body;

  const newBlog = await BlogModel.create({
    title,
    desc,
    image,
  });
  if (!newBlog) return next(new ErrorHandler("Create new blog...", 400));

  res.status(200).json({
    newBlog,
    success: true,
    message: "Create blog successfully!!!",
  });
});
export const getOneBlog = catchAsyncError(async (req, res, next) => {
  const blogId = await BlogModel.findById(req.params.id).select("-user");
  if (!blogId) return next(new ErrorHandler("Create new category...", 400));

  res.status(200).json({
    blogId,
    success: true,
    message: "Get category id successfully!!!",
  });
});
export const updateBlog = catchAsyncError(async (req, res, next) => {
  const blog = await BlogModel.findById(req.params.id);
  if (!blog) return next(new ErrorHandler("Blog not found", 404));

  const updateBlog = await BlogModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    updateBlog,
    message: "update blog success",
  });
});
export const updateBlogStatus = catchAsyncError(async (req, res, next) => {
  const blog = await BlogModel.findById(req.params.id);

  if (!blog) {
    return next(new ErrorHandler("Not found", 404));
  }

  blog.status = !blog.status; // change status

  await blog.save();

  res.status(200).json({
    blog,
    success: true,
  });
});
