const Order = require("../models/Order");
const Listing = require("../models/Listing");

// PLACE A NEW ORDER
exports.createOrder = async (req, res) => {
    try {

        const { listingId } = req.body;

        const listing = await Listing.findById(listingId);

        if (!listing) {
            return res.status(404).json({
                message: "Listing not found"
            });
        }

        const order = await Order.create({
            userId: req.user.id,
            listingId,
            amount: listing.price
        });

        res.status(201).json(order);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// GET ALL ORDERS OF A USER
exports.getUserOrders = async (req, res) => {
    try {

        const orders = await Order.find({
            userId: req.params.userId
        }).populate("listingId");

        res.status(200).json(orders);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// GET SINGLE ORDER
exports.getOrderById = async (req, res) => {
    try {

        const order = await Order.findById(req.params.id)
            .populate("listingId")
            .populate("userId");

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.status(200).json(order);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};