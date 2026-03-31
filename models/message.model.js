import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "message text is required"],
    },

    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "senderId is required"],
    },

    ticketId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
      required: [true, "ticketId is required"],
    },
  },
  { timestamps: true }
);

const messageModel = mongoose.model("Message", messageSchema);

export default messageModel;