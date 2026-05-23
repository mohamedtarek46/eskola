import express from "express";
import { authRequired } from "../../middleware/auth.js";
const router = express.Router();

import {
  loginUser,
  createUser,
  getMe,
  updateMe,
  logoutUser,
} from "../controllers/userControllers.js";

router
  .post("/login", loginUser)
  .post("/logout", logoutUser)
  .post("/register", createUser)
  .get("/me", authRequired, getMe)
  .put("/me", authRequired, updateMe);

export default router;
