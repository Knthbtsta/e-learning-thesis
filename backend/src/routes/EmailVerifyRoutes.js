// routes/verification.js
const express = require('express');
const router = express.Router();
const verificationController = require('../controllers/EmailVerifyController');

router.post('/send-verification-email', verificationController.sendVerificationEmail);
router.get('/verify-email', async (req, res) => {
    const { token } = req.query;

    // Implement email verification logic here
    try {
        // Verify the email using the token
        // Update the user's email verification status in the database

        // Example: Send a success response if email is verified
        res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
        console.error('Failed to verify email:', error);
        // Example: Send an error response if verification fails
        res.status(500).json({ error: 'Failed to verify email' });
    }
});
module.exports = router;