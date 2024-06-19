
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const jwt=require("jsonwebtoken")
const jwtSecret="MynameisRamukumar"
router.post(
  "/createuser",
  [
    body("name").notEmpty().withMessage("Name  required"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("location").notEmpty().withMessage("Location is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, password, email, location } = req.body;

    try {
      if (mongoose.connection.readyState !== 1) {
        throw new Error("MongoDB connection not established");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await User.create({
        name,
        password: hashedPassword,
        email,
        location,
      });

      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: "Server error" });
    }
  }
);
router.post(
  "/loginuser",
  [
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success: false, error: "Invalid email or password" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ success: false, error: "Invalid email or password" });
      }
      const data={
        user:{
          id:user.id,
        }
      }
     const authToken=jwt.sign(data,jwtSecret)
     console.log(authToken)
      res.json({ success: true, message: "Logged in successfully",authToken:authToken});
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: "Server error" });
    }
  }
);

module.exports = router;

