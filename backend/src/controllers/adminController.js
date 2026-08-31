import { ContactMessage } from "../models/ContactMessage.js";

export async function listMessages(req, res, next) {
  try {
    const messages = await ContactMessage.find()
      .sort({ createdAt: -1 })
      .lean();

    res.json({ success: true, messages });
  } catch (error) {
    next(error);
  }
}

export async function updateMessageStatus(req, res, next) {
  try {
    const { status } = req.body;

    if (!["unread", "read", "archived"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid message status." });
    }

    const message = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).lean();

    if (!message) {
      return res.status(404).json({ success: false, message: "Message not found." });
    }

    res.json({ success: true, message });
  } catch (error) {
    next(error);
  }
}

export async function deleteMessage(req, res, next) {
  try {
    const result = await ContactMessage.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).json({ success: false, message: "Message not found." });
    }

    res.json({ success: true });
  } catch (error) {
    next(error);
  }
}
