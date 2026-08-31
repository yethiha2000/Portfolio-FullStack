import { Router } from "express";
import { deleteMessage, listMessages, updateMessageStatus } from "../controllers/adminController.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();

router.use(requireAdmin);
router.get("/messages", listMessages);
router.patch("/messages/:id/status", updateMessageStatus);
router.delete("/messages/:id", deleteMessage);

export default router;
