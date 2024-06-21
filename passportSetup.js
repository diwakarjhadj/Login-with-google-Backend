// passportSetup.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

function passportSetup() {
  // Set up your Google OAuth 2.0 strategy here
  passport.use(
    new GoogleStrategy({
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
      proxy: true, // Add this line
      scope: ['profile', 'email'],
      userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo', 
    },
    // function(accessToken, refreshToken, profile, callback) {
    //   // Your strategy logic here
    //   callback(null, profile);
    // })

    function(accessToken, refreshToken, profile, callback) {
      try {
        // Your strategy logic here
        callback(null, profile);
      } catch (error) {
        console.error('Error in GoogleStrategy callback:', error);
        callback(error, null);
      }
    })
  );

  // Serialize user to the session
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  // Deserialize user from the session
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
}

module.exports = passportSetup;
