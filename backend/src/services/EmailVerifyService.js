// services/emailService.js
const nodemailer = require('nodemailer');

exports.sendVerificationEmail = async (data) => {
    console.log(data);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'kenbautista1008@gmail.com',
            pass: 'tmtb gmwl jppl lcdg'
        }
    });

    const verificationLink = `https://e-learning-thesis-tupm.onrender.com/emailverificationsucess?token=${data._id}`;

    const mailOptions = {
        from: 'kenbautista1008@gmail.com',
        to: data.email,
        subject: 'Verification Email',
        html: `
            <p>Please click the following link to verify your email:</p>
            <a href="${verificationLink}">${verificationLink}</a>
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