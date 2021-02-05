import express from "express";
const router = express.Router();
import {registerUser, loginUser, forgotPassword, resetPassword} from "../controllers/authController.js";

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/forgotpassword").post(forgotPassword);
router.route("/resetpassword/:resetToken").put(resetPassword);

export default router;