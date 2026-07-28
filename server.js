// Force Node.js to use Google DNS — fixes SRV lookup failures on restricted networks
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const mongoose = require("mongoose");
const User = require("./userModel");

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;
const MONGODB_URI = process.env.MONGODB_URI;

// ─── Startup Checks ──────────────────────────────────────────────────────────
if (!JWT_SECRET || JWT_SECRET === "change-this-to-a-long-random-secret-before-deploying") {
    console.error("❌ FATAL: JWT_SECRET is not set or is using the default value. Set it in your .env file.");
    process.exit(1); // fail fast — do not run with broken auth
}

// ─── MongoDB Connection ───────────────────────────────────────────────────────
mongoose.connect(MONGODB_URI)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch(err => console.error("❌ MongoDB connection error:", err.message));

// ─── Rate Limiting ────────────────────────────────────────────────────────────
// Max 10 login/signup attempts per IP per 15 minutes
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many attempts from this IP. Please try again in 15 minutes."
    }
});

// ─── CORS ─────────────────────────────────────────────────────────────────────
const allowedOrigins = [
    "http://localhost:5500",
    "http://127.0.0.1:5500",
    "http://localhost:3000"
    // Note: file:// protocol sends no origin header (undefined), handled by !origin check below
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, curl, etc.)
        if (!origin) return callback(null, true);
        // Allow localhost and file:// origins
        if (allowedOrigins.includes(origin)) return callback(null, true);
        // Allow any netlify.app subdomain (covers your deployed frontend)
        if (/^https:\/\/[a-z0-9-]+\.netlify\.app$/.test(origin)) return callback(null, true);
        callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// ─── JWT Auth Middleware (for future protected routes) ────────────────────────
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Expect: "Bearer <token>"

    if (!token) {
        return res.status(401).json({ success: false, message: "Access denied. No token provided." });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ success: false, message: "Invalid or expired token. Please log in again." });
    }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ─── Routes ───────────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
    res.send("Khata Backend Running");
});

// Signup
app.post("/signup", authLimiter, async (req, res) => {
    const { name, email, password } = req.body;

    // Validate inputs
    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    if (name.trim().length < 2) {
        return res.status(400).json({ success: false, message: "Name must be at least 2 characters" });
    }
    if (!isValidEmail(email)) {
        return res.status(400).json({ success: false, message: "Invalid email format" });
    }
    if (password.length < 6) {
        return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
    }

    try {
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name: name.trim(),
            email: email.toLowerCase(),
            password: hashedPassword
        });
        await user.save();

        res.json({ success: true, message: "Signup successful" });

    } catch (err) {
        console.error("Signup error:", err.message);
        res.status(500).json({ success: false, message: "Server error. Please try again." });
    }
});

// Login
app.post("/login", authLimiter, async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ email: email.toLowerCase() });

        // Generic error to prevent email enumeration
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // Issue a JWT valid for 7 days
        const token = jwt.sign(
            { id: user._id, email: user.email, name: user.name },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        // Return token + user info (no password)
        res.json({
            success: true,
            message: "Login successful",
            token,
            user: { name: user.name, email: user.email }
        });

    } catch (err) {
        console.error("Login error:", err.message);
        res.status(500).json({ success: false, message: "Server error. Please try again." });
    }
});

// Protected route — returns current user info from JWT (no DB call needed)
// Usage: GET /me  with  Authorization: Bearer <token>
app.get("/me", authenticateToken, (req, res) => {
    res.json({ success: true, user: { name: req.user.name, email: req.user.email } });
});

// Sync GET endpoint — retrieves logged-in user's ledger data
app.get("/sync", authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.json({
            success: true,
            customers: user.customers || [],
            vendors: user.vendors || []
        });
    } catch (err) {
        console.error("Fetch sync error:", err.message);
        res.status(500).json({ success: false, message: "Sync fetch failed" });
    }
});

// Sync POST endpoint — saves logged-in user's ledger data
app.post("/sync", authenticateToken, async (req, res) => {
    const { customers, vendors } = req.body;

    // Validate payload — must be arrays if present, max 500 entries each
    if (customers !== undefined && (!Array.isArray(customers) || customers.length > 500)) {
        return res.status(400).json({ success: false, message: "Invalid customers payload" });
    }
    if (vendors !== undefined && (!Array.isArray(vendors) || vendors.length > 500)) {
        return res.status(400).json({ success: false, message: "Invalid vendors payload" });
    }

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (customers !== undefined) user.customers = customers;
        if (vendors !== undefined) user.vendors = vendors;

        await user.save();
        res.json({ success: true, message: "Cloud sync completed successfully" });
    } catch (err) {
        console.error("Save sync error:", err.message);
        res.status(500).json({ success: false, message: "Sync save failed" });
    }
});


// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});