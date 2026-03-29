import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ConnectDB from "./config/db.js";
import usersRoutes from "./routes/users.route.js";
import ticketRoutes from "./routes/ticket.route.js";
import { errorHandler } from "./middlewares/globalError.js";
import messageRoutes from "./routes/message.route.js";


const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

app.use("/users", usersRoutes);

app.use("/tickets", ticketRoutes);
app.use("/messages", messageRoutes);

app.use(errorHandler);

ConnectDB();
app.listen(process.env.PORT_NUM, () => {
  console.log("Server Connected on Port 5000");
});
