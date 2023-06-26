import express from "express";
import { userController } from "../controllers/index.js";
import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.get("/logout", userController.logout);
userRouter.get("/me", isAuthenticatedUser, userController.getUserDetails);
userRouter.get(
  "/admin/user",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  userController.getAllUser
);
userRouter.get(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  userController.getOneUser
);

export default userRouter;
