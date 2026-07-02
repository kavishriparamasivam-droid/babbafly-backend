const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    createOrder,
    getUserOrders,
    getOrderById
} = require("../controllers/orderController");

// Place a new order (Protected)
router.post("/", protect, createOrder);

// Get all orders of a user
router.get("/user/:userId", protect, getUserOrders);

// Get single order
router.get("/:id", protect, getOrderById);

module.exports = router;