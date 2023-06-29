import express from "express";
import { orderController } from "../controllers/index.js";
import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";

const orderRoute = express.Router();
orderRoute.get(
  "/",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  orderController.getAllOrder
);
orderRoute.post("/", isAuthenticatedUser, orderController.createOrder);

export default orderRoute;
