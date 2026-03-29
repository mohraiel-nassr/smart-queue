import express from "express";
import { sendMessage, getMessages } from "../controllers/message.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", isAuth ,sendMessage);
router.get("/:ticketId", isAuth, getMessages);

export default router;