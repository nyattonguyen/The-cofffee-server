import cloudinary from "cloudinary";
import catchAsyncError from "../middleware/catchAsyncErrors.js";
import ProductModel from "../models/product.js";

export const getProduct = catchAsyncError(async (req, res, next) => {
  const products = await ProductModel.findById(req.params.id);
  res.status(200).json({
    products,
    message: "get products successfully",
    success: true,
  });
});
export const getAllProduct = catchAsyncError(async (req, res, next) => {
  const product = await ProductModel.find().where({ status: false });
  const productCount = await ProductModel.count();

  res.status(200).json({
    product,
    message: "get products successfully",
    success: true,
    productCount,
  });
});
export const getAllAdminProduct = catchAsyncError(async (req, res, next) => {
  const product = await ProductModel.find().sort({ status: false });
  const productCount = await ProductModel.count();

  res.status(200).json({
    product,
    message: "get products successfully",
    success: true,
    productCount,
  });
});
export const createProduct = catchAsyncError(async (req, res, next) => {
  // const { title, desc, image, price, stick, status, userId, sizes, extraOptions } = req.body;
  const user = req.user;
  //   if (!req.body.images) {
  //     const newProduct = await ProductModel.create({
  //       user: user._id,
  //       ...req.body,
  //     });

  //     if (!newProduct)
  //       return next(new ErrorHandler("Create new category...", 400));

  //     res.status(200).json({
  //       newProduct,
  //       success: true,
  //       message: "Create category successfully!!!",
  //     });
  //   }

  //   const myCloud = await cloudinary.v2.uploader.upload(req.body.images, {
  //     folder: "products",
  //     crop: "scale",
  //     width: 330,
  //   });

  const newProduct = await ProductModel.create({
    // img: {
    //   public_id: myCloud.public_id,
    //   url: myCloud.secure_url,
    // },
    user: user._id,
    ...req.body,
  });

  if (!newProduct) return next(new ErrorHandler("Create new product...", 400));

  res.status(200).json({
    newProduct,
    success: true,
    message: "Create product successfully!!!",
  });
});

export const updateProduct = catchAsyncError(async (req, res, next) => {
  const product = await ProductModel.findById(req.params.id);
  if (!product) return next(new ErrorHandler("Product not found", 404));

  const updatedProduct = await ProductModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    updatedProduct,
    message: "Update product success",
  });
});

export const getProductsByCategory = catchAsyncError(async (req, res, next) => {
  const categoryId = req.params.categoryId;
  const products = await ProductModel.find({ category: categoryId });
  res.status(200).json({
    products,
    message: "get products successfully",
    success: true,
  });
});
export const updateProductStatus = catchAsyncError(async (req, res, next) => {
  const product = await ProductModel.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Not found", 404));
  }

  product.status = !product.status; // change status

  await product.save();

  res.status(200).json({
    product,
    success: true,
  });
});
