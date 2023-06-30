import express from "express";
import { orderController } from "../controllers/index.js";
import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";

const orderRoute = express.Router();
orderRoute.post("/", isAuthenticatedUser, orderController.createOrder);
orderRoute.get(
  "/",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  orderController.getAllOrder
);
orderRoute.get("/:id", isAuthenticatedUser, orderController.getOneOrder);
orderRoute.get("/me", isAuthenticatedUser, orderController.myOrders);
orderRoute.put("/:id", isAuthenticatedUser, orderController.updateStatusOrder);
orderRoute.get("/cancel/:id", isAuthenticatedUser, orderController.cancelOrder);
export default orderRoute;
