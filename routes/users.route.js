import express from "express";
import {
  createUsers,
  getAllUsers,
  getSingleUser,
  loginUsers,
  refreshUser,
} from "../controllers/user.controller.js";
import { isAgent, isAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.get("/", isAuth, isAgent, getAllUsers);
router.get("/:id", isAuth, isAgent, getSingleUser);
router.post("/register", createUsers);
router.post("/login", loginUsers);
router.post("/refresh", refreshUser);

export default router;
