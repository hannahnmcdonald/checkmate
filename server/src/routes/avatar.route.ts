import {
  Router,
  type RequestHandler,
  type Request,
  type Response,
} from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuid } from "uuid";
import { protectedRoute } from "../middleware/authMiddleware";
import { saveUserAvatar } from "../services/avatar.service";

export const avatarRoute = Router();

// fs setup
const uploadDir = path.join(process.cwd(), "uploads", "avatars");
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (req: any, file, cb) => {
    const ext = path.extname(file.originalname || "").toLowerCase() || ".png";
    cb(null, `avatar_${req.user?.id ?? "anon"}_${uuid()}${ext}`);
  },
});

const uploader = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!/^image\/(png|jpe?g|webp|gif)$/.test(file.mimetype)) {
      return cb(new Error("Invalid file type"));
    }
    cb(null, true);
  },
});

// Cast middlewares to your express types (avoid cross-package mismatch)
const protectedMw = protectedRoute as unknown as RequestHandler;
const uploadSingle: RequestHandler = uploader.single(
  "avatar"
) as unknown as RequestHandler;

// POST /api/users/me/avatar
avatarRoute.post("/users/me/avatar", protectedMw, uploadSingle, (async (
  req: Request,
  res: Response
) => {
  try {
    const file = (req as any).file as Express.Multer.File | undefined;
    const userId = (req as any).user?.id as string | undefined;

    if (!userId) return res.status(401).json({ error: "Unauthorized" });
    if (!file) return res.status(400).json({ error: "No file provided" });

    const publicUrl = `${process.env.PUBLIC_BASE_URL}/uploads/avatars/${file.filename}`;
    const { publicUrl: savedUrl } = await saveUserAvatar({ userId, publicUrl });

    res.json({ publicUrl: savedUrl });
  } catch (e: any) {
    console.error("POST /users/me/avatar error:", e);
    res.status(500).json({ error: e?.message ?? "Upload failed" });
  }
}) as RequestHandler);

export default avatarRoute;
