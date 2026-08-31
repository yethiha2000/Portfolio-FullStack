import { ContactMessage } from "../models/ContactMessage.js";
import { sendContactNotification } from "../services/emailService.js";

export async function createContactMessage(req, res, next) {
  try {
    const { name, email, message } = req.body;

    const saved = await ContactMessage.create({ name, email, message });

    let emailSent = false;
    try {
      emailSent = await sendContactNotification({ name, email, message });
    } catch (error) {
      console.error("Contact email notification failed:", error.message);
    }

    return res.status(201).json({
      success: true,
      message: "Your message has been received.",
      emailSent,
      id: saved.id,
    });
  } catch (error) {
    next(error);
  }
}
