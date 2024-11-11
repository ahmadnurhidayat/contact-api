import express from "express";
import {
  registerUser,
  loginUser,
  getAllUser,
  getSpecificUser,
  updateUserProfile,
  logoutUser,
  deleteUser,
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// User routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", protect, getAllUser);
router.get("/users/:id", protect, getSpecificUser);
router.put("/users", protect, updateUserProfile);
router.post("/logout", protect, logoutUser);
router.delete("/users/:id", protect, deleteUser);

export default router;
