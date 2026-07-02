const express = require("express");
const router = express.Router();

const {
    createCategory,
    getCategories,
    getCategoryListings
} = require("../controllers/categoryController");

const protect = require("../middleware/authMiddleware");

// Public Routes
router.get("/", getCategories);
router.get("/:id/listings", getCategoryListings);

// Protected Route
router.post("/", protect, createCategory);

module.exports = router;