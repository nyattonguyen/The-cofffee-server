import express from "express";
import { productController } from "../controllers/index.js";
import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";

const productRoute = express.Router();

productRoute.get("/", productController.getAllProduct);
// productRoute.get(
//   "/all",
//   isAuthenticatedUser,
//   authorizeRoles("admin"),
//   productController.getAllCategory
// );

productRoute.post(
  "/",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  productController.createProduct
);
productRoute.put(
  "/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  productController.updateProduct
);
productRoute.get("/:id", productController.getProduct);
productRoute.get("/:id", productController.updateProductStatus); // change disable // enable product

productRoute.get("/:categoryId", productController.getProductsByCategory);
export default productRoute;
