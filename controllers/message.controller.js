import messageModel from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { text, ticketId } = req.body;

    const message = await messageModel.create({
      text,
      senderId: req.user.id,
      ticketId,
    });

    res.json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { ticketId } = req.params;

    const messages = await messageModel
      .find({ ticketId })
      .populate("senderId", "username email");

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};