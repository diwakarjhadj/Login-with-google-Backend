const router = require('express').Router();
const passport = require('passport');
const nodemailer = require('nodemailer');
// When Login Failed by the google
router.get("/login/failed", (req, res) => {
    res.status(401).json({
        error: true,
        message: "Login Failure",
    });
});
// For Login the user
router.get("/login/success", (req, res) => {
    if (req.user) {
        console.log("req.user",req.user._json.email);
        sendWelcomeEmail(req.user._json.email);
        res.status(200).json({
            error: false,
            message: "Successfully Logged in",
            user: req.user,
        });
    }
    else {
        res.status(403).json({ error: true, message: "Not Authorized" });
    }
});
// These Are the Two Route which is Used From Oauth2.0 
router.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: "/login/failed",
    })
);

router.get("/google", passport.authenticate("google", ["profile", "email"]));

// Perform The Logout Operation 
router.get("/logout", (req, res) => {
    // Perform any additional cleanup or tasks before logging out

    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: "Error logging out" });
        }

        // Redirect or respond as needed after successful logout
        res.redirect(process.env.CLIENT_URL);
    });
});

function sendWelcomeEmail(userEmail) {
    // Create a nodemailer transporter using your email service credentials
    // console.log(userEmail);
    const password=process.env.PASSWORD;
    // console.log(password)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'dkj9910419457@gmail.com', // Replace with your email
            pass: password, // Replace with your email password

        }
    });

    // Email content
    const mailOptions = {
        from: 'dkj9910419457@gmail.com', // Replace with your email
        to: userEmail,
        subject: 'Welcome to Your App',
        text: 'Thank you for logging in! Welcome to our application.'
    };
     // Send the email
     transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending welcome email:', error);
        } else {
            console.log('Welcome email sent:', info.response);
        }
    });
}
module.exports = router;
