const emailService = require('../services/EmailVerifyService');

exports.sendVerificationEmail = async (req, res) => {
    const data = req.body;

    try {
        await emailService.sendVerificationEmail(data);
        res.send('Verification email sent successfully');
    } catch (error) {
        console.error('Error sending verification email:', error);
        res.status(500).send('Failed to send verification email');
    }
};