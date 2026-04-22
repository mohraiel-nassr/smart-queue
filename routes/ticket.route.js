import express from "express";
import {
  createTicket,
  getAllTickets,
  getTicketById,
} from "../controllers/tickets.controller.js";

import { isAdmin, isAgent, isAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", isAuth, isAdmin, createTicket);

router.get("/:id", isAuth, isAgent, getTicketById);

router.get("/", isAuth, isAgent, getAllTickets);

export default router;
