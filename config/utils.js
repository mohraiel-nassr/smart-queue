import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateTokken = (user) => {
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1d" },
  );
  return token;
};
export const refreshTokken = (user) => {
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    process.env.REFRESH_SECRETR_KEY,
    { expiresIn: "30d" },
  );
  return token;
};
