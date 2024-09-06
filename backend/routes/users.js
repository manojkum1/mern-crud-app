import express from "express";
import { signUp,login } from "../controller/auth.controller.js";
import { loginValidation, signupValidation } from "../middlewares/AuthValidation.js";

const router = express.Router();

router.post("/signup", signupValidation, signUp);
router.post("/login", loginValidation, login);


export default router;
