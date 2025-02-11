const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Ensure the correct path
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// LOGIN ROUTE
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body; // ✅ Fix 1: Get email & password from req.body

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." }); // ✅ Add return here
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." }); // ✅ Add return here
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password." }); // ✅ Add return here
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    }); // ✅ Add return here
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Server error. Please try again later." }); // ✅ Add return here
  }
});

module.exports = router;
