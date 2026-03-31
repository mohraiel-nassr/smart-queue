import messageModel from "./models/message.model.js";

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("joinTicket", (ticketId) => {
      socket.join(ticketId);
      console.log(`Socket ${socket.id} joined ${ticketId}`);
    });
    try{
        socket.on("sendMessage", async (data) => {
      const { text, senderId, ticketId } = data;

      const newMessage = await messageModel.create({
        text,
        senderId,
        ticketId,
      });

      io.to(ticketId).emit("receiveMessage", newMessage);
    });

    } catch (error) {
        console.log("Socket Error:", error.message);
    }
    

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

export default socketHandler;