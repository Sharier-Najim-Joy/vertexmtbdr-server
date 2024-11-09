// mail.js
const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
require("dotenv").config(); // Load environment variables from .env file

// Set up Nodemailer transport
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // Your Gmail password or app password
    },
});

// Endpoint to send email
router.post("/send", (req, res) => {
    const { name, Email, number, message } = req.body; // Destructure incoming data

    // Create email options
    const mailOptions = {
        from: process.env.EMAIL_USER, // Sender address
        to: process.env.EMAIL_RECEIVER, // List of recipients
        subject: `New Message from ${name}`, // Subject line
        text: `You have received a new message from ${name} (${number}, ${Email}):\n\n${message}`, // Plain text body
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
            return res.status(500).json({ message: "Error sending email" });
        }
        console.log("Email sent:", info.response);
        res.status(200).json({ message: "Email sent successfully" });
    });
});

module.exports = router;
