import express from "express";
import {
  createUsers,
  getAllUsers,
  getSingleUser,
  loginUsers,
  logOutUser,
  refreshUser,
} from "../controllers/user.controller.js";
import { isAdmin, isAgent, isAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.get("/", isAuth, isAdmin, getAllUsers);
router.get("/:id", isAuth, isAdmin, getSingleUser);
router.post("/register", createUsers);
router.post("/login", loginUsers);
router.post("/refresh", refreshUser);
router.post("/logout", isAuth, logOutUser);

export default router;
