import express from "express";
import userRouter from "./userRoute.js";
import categoryRouter from "./categoryRoute.js";
import productRouter from "./productRoute.js";
import orderRouter from "./orderRoute.js";

const router = express.Router();
router.use("/api/v1/user", userRouter);
router.use("/api/v1/category", categoryRouter);
router.use("/api/v1/product", productRouter);
router.use("/api/v1/order", orderRouter);

export default router;
