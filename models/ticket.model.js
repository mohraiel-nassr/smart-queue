import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "userId is required"],
    },

    agentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "agentId is required"],
    },

    status: {
      type: String,
      enum: ["active", "pending", "closed"],
      default: "active",
    },
  },
  { timestamps: true },
);

const ticketModel = mongoose.model("Ticket", ticketSchema);

export default ticketModel;
