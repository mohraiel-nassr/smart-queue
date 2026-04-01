import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ConnectDB from "./config/db.js";
import usersRoutes from "./routes/users.route.js";
import ticketRoutes from "./routes/ticket.route.js";
import { errorHandler } from "./middlewares/globalError.js";
import messageRoutes from "./routes/message.route.js";
import http from "http";
import { Server } from "socket.io";
import socketHandler from "./socket.js";
import dns from "dns";

// تغيير DNS إلى Google DNS
dns.setServers(["8.8.8.8", "8.8.4.4"]);

dotenv.config();
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

socketHandler(io);

app.use(cors());
app.use(express.json());
app.use(express.static("chat"));

app.use("/users", usersRoutes);

app.use("/tickets", ticketRoutes);
app.use("/messages", messageRoutes);

app.use(errorHandler);

ConnectDB();
server.listen(process.env.PORT_NUM, () => {
  console.log("Server running");
});
