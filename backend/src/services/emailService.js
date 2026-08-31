import nodemailer from "nodemailer";
import { env } from "../config/env.js";

function isConfigured() {
  return Boolean(
    env.smtp.host &&
    env.smtp.user &&
    env.smtp.pass &&
    env.smtp.from &&
    env.smtp.to
  );
}

export async function sendContactNotification({ name, email, message }) {
  if (!isConfigured()) return false;

  const transporter = nodemailer.createTransport({
    host: env.smtp.host,
    port: env.smtp.port,
    secure: env.smtp.secure,
    auth: {
      user: env.smtp.user,
      pass: env.smtp.pass,
    },
  });

  await transporter.sendMail({
    from: env.smtp.from,
    to: env.smtp.to,
    replyTo: email,
    subject: `Portfolio contact from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  });

  return true;
}
