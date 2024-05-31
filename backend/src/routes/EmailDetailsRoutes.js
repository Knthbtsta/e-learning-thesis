const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const user = require("../models/UserModel");

router.post("/send-email", async (req, res) => {
  const { firstName, lastName, email, details } = req.body;

  // Compose email message
  const mailOptions = {
    from: "capstoneproject2001@gmail.com",
    to: "denmarkdorado20@gmail.com",
    subject: "Form Submission",
    html: `
      <p>First Name: ${firstName}</p>
      <p>Last Name: ${lastName}</p>
      <p>Email: ${email}</p>
      <p>Details: ${details}</p>
    `,
  };

  // Create transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "capstoneproject2001@gmail.com",
      pass: "capstoneproject2024",
    },
  });

  try {
    // Send email
    await transporter.sendMail(mailOptions);

    // Insert the user to the database
    const newUser = new user({ email, firstName, lastName, verified: false });
    await newUser.save();

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

module.exports = router;
