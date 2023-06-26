import { UserModel } from "../models/index.js";
import catchAsyncError from "../middleware/catchAsyncErrors.js";
import sendToken from "../utills/jwtToken.js";
import ErrorHandler from "../utills/errorHandle.js";

export const register = catchAsyncError(async (req, res, _next) => {
  const { username, phone, password, email } = req.body;

  const user = await UserModel.create({
    username,
    phone,
    email,
    password,
  });

  return sendToken(user, 200, res);
});
export const login = catchAsyncError(async (req, res, _next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return _next(new ErrorHandler("Please enter email/password...", 400));
  }
  const user = await UserModel.findOne({ email }).select("+password");
  console.log(user);
  if (!user) {
    return _next(new ErrorHandler("Wrong email or password", 401));
  }
  const isPasswordMatched = await user.comparePassword(password);
  console.log("eo match", isPasswordMatched);
  if (!isPasswordMatched) {
    return _next(new ErrorHandler("Wrong email or password...", 401));
  }

  sendToken(user, 200, res);
});
export const logout = catchAsyncError(async (req, res, _next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully!!",
  });
});

export const getAllUser = catchAsyncError(async (_req, res, _next) => {
  const users = await UserModel.find({});

  res.status(200).json({
    users,
    success: true,
    message: "get all users successfully",
  });
});
export const getOneUser = catchAsyncError(async (req, res, _next) => {
  const user = await UserModel.findById(req.params.id);

  if (!user) {
    return _next(new ErrorHandler("User not found", 404));
  }

  res.status(200).json({
    user,
    message: "get user successfully",
    success: true,
  });
});
export const getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await UserModel.findById(req.user.id);
  if (!user) {
    return next(new ErrorHandler("User not found or not logged in", 404));
  }

  res.status(200).json({
    success: true,
    user,
    message: "get user details successfully completed",
  });
});
