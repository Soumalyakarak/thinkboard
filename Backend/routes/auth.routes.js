import { Router } from "express";
import { register, login, logout, Me,forgotPassword,resetPassword } from "../controllers/auth.controller.js";
import { validateRegister,validateLogin } from "../middlewares/validation.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register",validateRegister, register);
router.post("/login", validateLogin, login);
router.post("/logout", logout);
router.get("/me", authenticateUser, Me);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password",  resetPassword);

export default router;
