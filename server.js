
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const passport = require('passport'); // Use For Authentication From Google
const session = require('express-session');
const passportSetup = require('./passportSetup');
const authRoute = require('./routes/auth');
const app = express();

// Configure session
app.use(
  session({
    secret: 'cyberwolve', // Replace with a more secure secret
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);

// Initialize Passport
passportSetup();

app.use(passport.initialize());
app.use(passport.session());
// Cors Issue Resolve
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);
// Used For Route
app.use('/auth', authRoute);

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Listening on port ${port}`));
