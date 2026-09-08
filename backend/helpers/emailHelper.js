const nodemailer = require('nodemailer');

const sendConfirmationEmail = async (email, username) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Trackr Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Account Created Successfully',
      text: `Hello ${username},\n\nYour account has been successfully created on Trackr! Welcome aboard.\n\nBest regards,\nThe Trackr Team`,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error.message);
  }
};

module.exports = sendConfirmationEmail;
