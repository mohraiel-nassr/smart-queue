import messageModel from "./models/message.model.js";

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("joinTicket", (ticketId) => {
      socket.join(ticketId);
      console.log(`Socket ${socket.id} joined ${ticketId}`);
    });

    socket.on("sendMessage", async (data) => {
      try {
        const { text, senderId, ticketId } = data;

        if (!text || !senderId || !ticketId) {
          return socket.emit("error", "Missing required data");
        }

        console.log("Incoming message:", data);

        const newMessage = await messageModel.create({
          text,
          senderId,
          ticketId,
        });

        io.to(ticketId).emit("receiveMessage", newMessage);

      } catch (error) {
        console.log("Socket Error:", error.message);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

export default socketHandler;