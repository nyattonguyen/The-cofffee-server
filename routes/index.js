import express from "express";
import userRouter from "./userRoute.js";
import categoryRouter from "./categoryRoute.js";

const router = express.Router();
router.use("/api/v1/user", userRouter);
router.use("/api/v1/category", categoryRouter);

export default router;
