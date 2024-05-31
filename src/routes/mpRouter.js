import { Router } from "express";
import {
  testMPController,
  preferencesMp,
  feedbackMp,
} from "../controllers/mpController.js";
const router = Router();

router.get("/code", testMPController);
router.post("/create_preference", preferencesMp);
router.post("/feedback", feedbackMp);

export default router;
