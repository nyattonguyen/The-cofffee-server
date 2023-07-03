import express from "express";
import userRouter from "./userRoute.js";
import categoryRouter from "./categoryRoute.js";
import productRouter from "./productRoute.js";
import orderRouter from "./orderRoute.js";
import blogRouter from "./blogRoute.js";
import storeRouter from "./storeRoute.js";

const router = express.Router();
router.use("/api/v1/user", userRouter);
router.use("/api/v1/category", categoryRouter);
router.use("/api/v1/product", productRouter);
router.use("/api/v1/order", orderRouter);
router.use("/api/v1/blog", blogRouter);
router.use("/api/v1/store", storeRouter);

export default router;
