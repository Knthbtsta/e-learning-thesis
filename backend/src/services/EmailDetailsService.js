const nodemailer = require("nodemailer");

exports.sendFormSubmissionEmail = async (data) => {
  const { firstName, lastName, email, details } = data;

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
    console.log("Form submission email sent successfully");
  } catch (error) {
    console.error("Error sending form submission email:", error);
    throw new Error("Failed to send form submission email");
  }
};
