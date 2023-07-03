import express from "express";
import { blogController } from "../controllers/index.js";
import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";

const blogRoute = express.Router();

blogRoute.get("/", blogController.getAllBlog);
blogRoute.get(
  "/all",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  blogController.getAllBlogMain
);
blogRoute.post(
  "/",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  blogController.createBlog
);
blogRoute.get("/:id", blogController.getOneBlog);

blogRoute.put(
  "/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  blogController.updateBlog
);

blogRoute.get(
  "/change-status/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  blogController.updateBlogStatus
);
export default blogRoute;
