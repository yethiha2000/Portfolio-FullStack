import bcrypt from "bcryptjs";
import { env } from "../config/env.js";
import { clearAdminCookie, setAdminCookie, signAdminToken } from "../middleware/auth.js";

export async function login(req, res) {
  const { username, password } = req.body;

  if (!env.adminPasswordHash || !env.jwtSecret) {
    return res.status(503).json({ success: false, message: "Admin authentication is not configured." });
  }

  const validUsername = username === env.adminUsername;
  const validPassword = validUsername && await bcrypt.compare(password, env.adminPasswordHash);

  if (!validPassword) {
    return res.status(401).json({ success: false, message: "Invalid username or password." });
  }

  setAdminCookie(res, signAdminToken());
  return res.json({ success: true, user: { username: env.adminUsername } });
}

export function me(req, res) {
  res.json({ success: true, user: req.admin });
}

export function logout(req, res) {
  clearAdminCookie(res);
  res.json({ success: true });
}
