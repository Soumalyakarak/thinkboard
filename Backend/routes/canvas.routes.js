import { Router } from "express";
import { createCanvas,getAllCanvases,loadCanvas,updateCanvas,shareCanvas,deleteCanvas } from "../controllers/canvas.controller.js";
import {authenticateUser} from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", authenticateUser, createCanvas);
router.get("/", authenticateUser, getAllCanvases);
router.get("/:canvasId", authenticateUser, loadCanvas);
router.put("/:canvasId", authenticateUser, updateCanvas);
router.delete("/:canvasId", authenticateUser, deleteCanvas);
router.put("/:canvasId/share", authenticateUser, shareCanvas);


export default router;
