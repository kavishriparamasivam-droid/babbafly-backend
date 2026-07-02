const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    getListings,
    getListing,
    createListing,
    updateListing,
    deleteListing
} = require("../controllers/listingController");

// Public Routes
router.get("/", getListings);
router.get("/:id", getListing);

// Protected Routes
router.post("/", protect, createListing);
router.put("/:id", protect, updateListing);
router.delete("/:id", protect, deleteListing);

module.exports = router;