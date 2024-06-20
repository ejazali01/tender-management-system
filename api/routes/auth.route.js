import express from "express";
import {
  forgotPassword,
  logOutController,
  loginController,
  resetPassword,
  signupController,
  verifyOtp,
} from "../controllers/auth.controller.js";

const router = express.Router();

//signup route
router.post("/signup", signupController);

//login route
router.post("/login", loginController);

//logout route
router.get("/logout", logOutController);

// forget password
router.post("/forgotPassword", forgotPassword);

//very otp
router.post("/verifyOtp", verifyOtp);

// reset password
router.post("/resetPassword", resetPassword);



export default router;
