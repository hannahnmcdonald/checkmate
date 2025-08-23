import { Router } from "express";
import { getPrivacy, updatePrivacy } from "../services/settings.service";
import { protectedRoute } from "../middleware/authMiddleware";

export const settingsRoute = Router();

settingsRoute.get(
  "/settings/privacy",
  protectedRoute,
  async (req: any, res) => {
    console.log("GET /api/settings/privacy called for user:", req.user.id);
    if (!req.user || !req.user.id) {
      console.error("Unauthorized access attempt to privacy settings");
      return res.status(401).json({ error: "Unauthorized" });
    }
    try {
      const data = await getPrivacy(req.user.id);
      res.json(data);
    } catch (e: any) {
      console.error("GET /api/settings/privacy failed:", e);
      res.status(400).json({ error: e?.message ?? "bad request" });
    }
  }
);

settingsRoute.patch(
  "/settings/privacy",
  protectedRoute,
  async (req: any, res) => {
    try {
      const data = await updatePrivacy(req.user.id, req.body ?? {});
      res.json(data);
    } catch (e: any) {
      console.error("PATCH /api/settings/privacy failed:", e);
      res.status(400).json({ error: e?.message ?? "bad request" });
    }
  }
);

export default settingsRoute;
