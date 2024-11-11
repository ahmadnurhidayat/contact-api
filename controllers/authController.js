import dotenv from "dotenv";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

dotenv.config();

// Helper function for consistent response structure
const sendResponse = (res, status, message, data = []) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// @desc Register new user
// @route POST /api/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return sendResponse(res, 400, "Please add all fields");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return sendResponse(res, 400, "User already exists, Email already registered");
  }

  const user = await User.create({ name, email, password });
  if (user) {
    sendResponse(res, 201, "User registered successfully", {
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    sendResponse(res, 400, "Invalid user data");
  }
});

// @desc Authenticate a user
// @route POST /api/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    sendResponse(res, 200, "Login successful", {
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    sendResponse(res, 401, "Invalid email or password");
  }
});

// @desc Get all users
// @route GET /api/users
// @access Private
const getAllUser = asyncHandler(async (req, res) => {
  if (!req.user) {
    return sendResponse(res, 401, "Not authorized, no user found");
  }

  const users = await User.find();
  sendResponse(res, 200, "Users retrieved successfully", users);
});

// @desc Get User by ID
// @route GET /api/users/:id
// @access Private
const getSpecificUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return sendResponse(res, 400, "Invalid ID format");
  }

  const user = await User.findById(id);
  if (user) {
    sendResponse(res, 200, "User retrieved successfully", user);
  } else {
    sendResponse(res, 404, "User not found");
  }
});

// @desc Update user profile
// @route PUT /api/users/:id
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    sendResponse(res, 200, "User profile updated", {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      token: generateToken(updatedUser._id),
    });
  } else {
    sendResponse(res, 404, "User not found");
  }
});

// @desc Logout user
// @route POST /api/logout
// @access Private
const logoutUser = asyncHandler(async (req, res) => {
  sendResponse(res, 200, "Logged out successfully");
});

// @desc Delete user
// @route DELETE /api/users/:id
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    await user.remove();
    sendResponse(res, 200, "User removed");
  } else {
    sendResponse(res, 404, "User not found");
  }
});

export {
  registerUser,
  loginUser,
  getAllUser,
  getSpecificUser,
  updateUserProfile,
  logoutUser,
  deleteUser,
};