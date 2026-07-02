const express = require("express");
const dotenv = require("dotenv");
const dns = require("dns");

const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const listingRoutes = require("./routes/listingRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const orderRoutes = require("./routes/orderRoutes");

dotenv.config();

// Fix MongoDB DNS issue
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
    res.send("BabbaFly Backend Running");
});

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});