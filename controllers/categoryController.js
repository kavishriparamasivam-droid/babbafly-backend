const Category = require("../models/Category");
const Listing = require("../models/Listing");

// Create Category
exports.createCategory = async (req, res) => {
    try {

        const { name, image } = req.body;

        const exists = await Category.findOne({ name });

        if (exists) {
            return res.status(400).json({
                message: "Category already exists"
            });
        }

        const category = await Category.create({
            name,
            image
        });

        res.status(201).json(category);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// Get All Categories
exports.getCategories = async (req, res) => {

    try {

        const categories = await Category.find();

        res.json(categories);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Get Listings by Category
exports.getCategoryListings = async (req, res) => {

    try {

        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        const listings = await Listing.find({
            category: category.name
        });

        res.json(listings);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};