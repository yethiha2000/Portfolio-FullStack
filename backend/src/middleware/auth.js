import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

const COOKIE_NAME = "portfolio_admin";

export function signAdminToken() {
  return jwt.sign(
    { sub: env.adminUsername, role: "admin" },
    env.jwtSecret,
    { expiresIn: "8h" }
  );
}

export function setAdminCookie(res, token) {
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: env.nodeEnv === "production",
    sameSite: env.nodeEnv === "production" ? "none" : "lax",
    maxAge: 8 * 60 * 60 * 1000,
    path: "/",
  });
}

export function clearAdminCookie(res) {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    secure: env.nodeEnv === "production",
    sameSite: env.nodeEnv === "production" ? "none" : "lax",
    path: "/",
  });
}

export function requireAdmin(req, res, next) {
  const token = req.cookies?.[COOKIE_NAME];

  if (!token || !env.jwtSecret) {
    return res.status(401).json({ success: false, message: "Authentication required." });
  }

  try {
    const payload = jwt.verify(token, env.jwtSecret);

    if (payload.role !== "admin" || payload.sub !== env.adminUsername) {
      throw new Error("Invalid administrator token.");
    }

    req.admin = { username: payload.sub };
    next();
  } catch {
    return res.status(401).json({ success: false, message: "Your session has expired." });
  }
}
