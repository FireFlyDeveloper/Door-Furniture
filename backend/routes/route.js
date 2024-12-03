const express = require('express');
const nodemailer = require("nodemailer");
const router = express.Router();
const Login = require('../models/loginmodel'); // Import login model

// Login route
router.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user exists in MongoDB
        const user = await Login.findOne({ username, password });

        if (user) {
            res.status(200).json({ message: 'Login successful', user });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post("/forgot", async (req, res) => {
    try {
        const { email } = req.body;;

        if (email) {
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: `${process.env.EMAIL}`,
                    pass: `${process.env.PASSWORD}`,
                },
            });

            const mailOptions = {
                from: `${process.env.EMAIL}`,
                to: `saludeskimdev@gmail.com`,
                subject: "User Forgot Password Notification",
                text: `${email} has requested to reset their password.`,
                html: `
                    <html>
                    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                        <h2 style="color: #4CAF50;">Password Reset Request Notification</h2>
                        <p>Dear Admin,</p>
                        <p>The following user has requested to reset their password:</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p>Please review and take any necessary actions if required.</p>
                        <p>Thank you,</p>
                        <p>Your Application Team</p>
                    </body>
                    </html>
                `,
            };            

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    res.status(500).json({ message: "Sending email error" });
                } else {
                    res.status(200).json({ message: "Email sent successful" });
                }
            });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (e) {
        res.status(500).json({ message: "Sending email error" });
    }
});


module.exports = router;
