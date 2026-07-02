const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerSchema, loginSchema } = require("../validators/userValidator");

// Register User
exports.registerUser = async (req, res) => {
    try {

        // Joi Validation
        const { error } = registerSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            });
        }

        const { name, email, password, phone } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            phone,
            password: hashedPassword
        });

        res.status(201).json({
            message: "User registered successfully",
            user
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: error.message
        });
    }
};

// Login User
exports.loginUser = async (req, res) => {
    try {

        // Joi Validation
        const { error } = loginSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            });
        }

        const { email, password } = req.body;

        console.log("==================================");
        console.log("Email Entered:", email);
        console.log("Password Entered:", password);

        const user = await User.findOne({ email });

        console.log("User Found:", user);

        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        const match = await bcrypt.compare(password, user.password);

        console.log("Stored Password Hash:", user.password);
        console.log("Password Match:", match);

        if (!match) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: error.message
        });
    }
};