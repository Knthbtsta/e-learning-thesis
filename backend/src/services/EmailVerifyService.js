// services/emailService.js
const nodemailer = require('nodemailer');

exports.sendVerificationEmail = async (email, verificationToken, formData) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'kenbautista1008@gmail.com',
            pass: 'tmtb gmwl jppl lcdg'
        }
    });

    const verificationLink = `http://localhost:5173/emailverificationsucess?token=${verificationToken}`;

    const mailOptions = {
        from: 'kenbautista1008@gmail.com',
        to: email,
        subject: 'Verification Email',
        html: `
            <p>Please click the following link to verify your email:</p>
            <a href="${verificationLink}">${verificationLink}</a>
            <p>Form Data:</p>
            <pre>${JSON.stringify(formData, null, 2)}</pre>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Verification email sent');
    } catch (error) {
        console.error('Error sending verification email:', error);
        throw new Error('Failed to send verification email');
    }
};
