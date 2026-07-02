const Listing = require("../models/Listing");
const { listingSchema } = require("../validators/listingValidator");


// GET ALL LISTINGS
exports.getListings = async (req, res) => {
    try {

        let filter = {};

        if (req.query.location) {
            filter.location = req.query.location;
        }

        if (req.query.category) {
            filter.category = req.query.category;
        }

        if (req.query.price) {

            const prices = req.query.price.split("-");

            filter.price = {
                $gte: Number(prices[0]),
                $lte: Number(prices[1])
            };
        }

        let query = Listing.find(filter);

        if (req.query.sort === "latest")
            query = query.sort({ createdAt: -1 });

        if (req.query.sort === "price_low")
            query = query.sort({ price: 1 });

        if (req.query.sort === "price_high")
            query = query.sort({ price: -1 });

        if (req.query.sort === "popular")
            query = query.sort({ rating: -1 });

        const listings = await query;

        res.json(listings);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


// GET SINGLE LISTING
exports.getListing = async (req, res) => {

    try {

        const listing = await Listing.findById(req.params.id);

        if (!listing) {
            return res.status(404).json({
                message: "Listing not found"
            });
        }

        res.json(listing);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// CREATE LISTING
exports.createListing = async (req, res) => {

    try {

        // Joi Validation
        const { error } = listingSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            });
        }

        const listing = await Listing.create(req.body);

        res.status(201).json(listing);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// UPDATE LISTING
exports.updateListing = async (req, res) => {
    try {

        const listing = await Listing.findById(req.params.id);

        if (!listing) {
            return res.status(404).json({
                message: "Listing not found"
            });
        }

        // Check ownership
        if (listing.sellerId.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Not authorized to update this listing"
            });
        }

        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedListing);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// DELETE LISTING
exports.deleteListing = async (req, res) => {
    try {

        const listing = await Listing.findById(req.params.id);

        if (!listing) {
            return res.status(404).json({
                message: "Listing not found"
            });
        }

        // Check ownership
        if (listing.sellerId.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Not authorized to delete this listing"
            });
        }

        await Listing.findByIdAndDelete(req.params.id);

        res.json({
            message: "Listing deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};