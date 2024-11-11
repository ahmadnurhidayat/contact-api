import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// Standard Response Structure
const sendResponse = (res, status, message, data = []) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

// @desc Get all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  sendResponse(res, 200, "Success", products);
});

// @desc Get product by ID
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return sendResponse(res, 400, "Invalid ID format");
  }
  const product = await Product.findById(id);
  if (product) {
    sendResponse(res, 200, "Success", product);
  } else {
    sendResponse(res, 404, "Product not found");
  }
});

// @desc Create new product
// @route POST /api/products
// @access Private
const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, image, category } = req.body;
  if (!name || !description || !price || !image || !category) {
    return sendResponse(res, 400, "Please add all fields");
  }
  const product = await Product.create({
    name,
    description,
    price,
    image,
    category,
  });
  if (product) {
    sendResponse(res, 201, "Product created successfully", product);
  } else {
    sendResponse(res, 400, "Invalid product data");
  }
});

// @desc Update product
// @route PUT /api/products/:id
// @access Private
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return sendResponse(res, 400, "Invalid ID format");
  }
  const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
  if (product) {
    sendResponse(res, 200, "Product updated successfully", product);
  } else {
    sendResponse(res, 404, "Product not found");
  }
});

// @desc Update product using PATCH
// @route PATCH /api/products/:id
// @access Private
const updateProductPatch = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return sendResponse(res, 400, "Invalid ID format");
  }
  const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
  if (product) {
    sendResponse(res, 200, "Product updated successfully", product);
  } else {
    sendResponse(res, 404, "Product not found");
  }
});

// @desc Delete product
// @route DELETE /api/products/:id
// @access Private
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return sendResponse(res, 400, "Invalid ID format");
  }
  const product = await Product.findById(id);
  if (product) {
    await product.remove();
    sendResponse(res, 200, "Product removed");
  } else {
    sendResponse(res, 404, "Product not found");
  }
});

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  updateProductPatch,
  deleteProduct,
};
