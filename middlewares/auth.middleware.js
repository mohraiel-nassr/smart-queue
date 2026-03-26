import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

export const isAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res
      .status(401)
      .json({ message: "Unauthorized - Should Login First" });
  }
  const decoded = jwt.verify(authorization, process.env.SECRET_KEY);
  if (!decoded) {
    return res.status(401).json({ message: "Invalid Token" });
  }
  const user = await userModel.findById(decoded.id);
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }
  req.user = user;
  next();
};

export const isAgent = async (req, res, next) => {
  if (req.user.role != "agent") {
    return res
      .status(403)
      .json({ message: "Access denied - Agents only can do this" });
  }
  next();
};
