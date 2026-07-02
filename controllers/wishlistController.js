const Wishlist = require("../models/Wishlist");

// Add item to wishlist
exports.addToWishlist = async (req, res) => {
    try {

        const { listingId } = req.body;

        const exists = await Wishlist.findOne({
            userId: req.user.id,
            listingId
        });

        if (exists) {
            return res.status(400).json({
                message: "Listing already in wishlist"
            });
        }

        const wishlist = await Wishlist.create({
            userId: req.user.id,
            listingId
        });

        res.status(201).json(wishlist);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get logged-in user's wishlist
exports.getWishlist = async (req, res) => {
    try {

        const wishlist = await Wishlist.find({
            userId: req.user.id
        }).populate("listingId");

        res.json(wishlist);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Remove item from wishlist
exports.removeFromWishlist = async (req, res) => {
    try {

        const wishlist = await Wishlist.findOneAndDelete({
            userId: req.user.id,
            listingId: req.params.listingId
        });

        if (!wishlist) {
            return res.status(404).json({
                message: "Wishlist item not found"
            });
        }

        res.json({
            message: "Removed from wishlist"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};