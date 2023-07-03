import express from "express";
import { storeController } from "../controllers/index.js";
import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";

const storeRoute = express.Router();

storeRoute.get("/", storeController.getAllStore);
storeRoute.get(
  "/all",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  storeController.getAllStoreMain
);
storeRoute.post(
  "/",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  storeController.createStore
);
storeRoute.get("/:id", storeController.getOneStore);

storeRoute.put(
  "/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  storeController.updateStore
);

storeRoute.put(
  "/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  storeController.updateStoreStatus
);
export default storeRoute;
