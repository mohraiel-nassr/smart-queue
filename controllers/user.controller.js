import asyncHandler from "express-async-handler";
import userModel from "../models/user.model.js";
import { generateTokken, refreshTokken } from "../config/utils.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export const getAllUsers = asyncHandler(async (_, res) => {
  const Allusers = await userModel.find().select("-password");
  res.status(201).json({ message: "success", Allusers });
});

export const createUsers = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;
  const newUser = await userModel.create({ username, email, password, role });
  res.status(200).json({ message: "success", newUser });
});

export const loginUsers = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res
      .status(400)
      .json({ message: "failed", error: "Invalid credentials" });
  }

  const isPassword = await user.comparedPassword(password);
  if (!isPassword) {
    return res
      .status(400)
      .json({ message: "failed", error: "Invalid credentials" });
  }
  const token = generateTokken(user);
  const refreshToken = refreshTokken(user);
  res.status(200).json({
    message: "success",
    user: `Wellcome ${user.role} ${user.username}`,
    token,
    refreshToken,
  });
});

export const refreshUser = asyncHandler(async (req, res) => {
  const { refresh } = req.body;

  const decodeUser = jwt.verify(refresh, process.env.REFRESH_SECRETR_KEY);
  if (!decodeUser) {
    res.status(500).json({ message: "failed", error: "Invalid Token" });
  }
  const user = await userModel.findById(decodeUser.id);
  if (!user) {
    res.status(500).json({ message: "failed", error: "User not found" });
  }
  const newToken = generateTokken(user);
  res.status(200).json({ messgae: "success", newToken });
});

export const getSingleUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await userModel.findById(id).select("-password");
  if (!user) {
    res.status(500).json({ message: "failed", error: "User not found" });
  }
  res.status(200).json({ messgae: "success", user });
});
