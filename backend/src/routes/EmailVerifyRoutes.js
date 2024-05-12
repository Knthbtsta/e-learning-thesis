// routes/verification.js
const express = require("express");
const router = express.Router();
const verificationController = require("../controllers/EmailVerifyController");
const user = require("../models/UserModel");

router.post(
  "/send-verification-email",
  verificationController.sendVerificationEmail
);
router.post("/verify-email", async (req, res) => {
  const { token } = req.query;
  console.log(token);
  // Implement email verification logic here
  try {
    const result = await user.findByIdAndUpdate(
      { _id: token },
      { verified: true },
      { new: true }
    );

    // Example: Send a success response if email is verified
    res.status(200).json(result);
  } catch (error) {
    console.error("Failed to verify email:", error);
    // Example: Send an error response if verification fails
    res.status(500).json({ error: "Failed to verify email" });
  }
});
module.exports = router;
