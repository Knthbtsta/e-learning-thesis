// controllers/EmailVerifyController.js
const emailService = require("../services/emailService");
const user = require("../models/UserModel");

exports.sendVerificationEmail = async (req, res) => {
  const { email, firstName, lastName } = req.body;
  const newUser = new user({ email, firstName, lastName, verified: false });

  try {
    await newUser.save();
    await emailService.sendVerificationEmail(newUser);
    res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    console.error("Error sending verification email:", error);
    res.status(500).json({ error: "Failed to send verification email" });
  }
};
