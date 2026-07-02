const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    addToWishlist,
    getWishlist,
    removeFromWishlist
} = require("../controllers/wishlistController");

// Add listing to wishlist
router.post("/", protect, addToWishlist);

// Get logged-in user's wishlist
router.get("/", protect, getWishlist);

// Remove listing from wishlist
router.delete("/:listingId", protect, removeFromWishlist);

module.exports = router;