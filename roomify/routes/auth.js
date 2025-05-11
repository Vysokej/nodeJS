const express = require("express");
const router = express.Router();
require('dotenv').config();
const googleStrategy = require("passport-google-oauth20").Strategy;
const session = require("express-session")
const googleClientData = require("./o2AuthCredentials.json");
const passport = require("passport");
const db = require("./db")
const crypto = require("crypto")

// creating session to save user data 
router.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

// declaring google client data for /auth/google for the login popup
router.use(passport.initialize());
router.use(passport.session());

// passport.serializeUser((user, done) => {
//     done(null, user)
// })
// passport.deserializeUser((user, done) => {
//     user
//     done(null, user)
// })
passport.use(new googleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
    async function(accessToken, refreshToken, profile, cb) {
      const userName = profile._json.name;
      const userId = profile._json.sub;
      const userPfp = profile._json.picture;
      const userUID = crypto.randomBytes(16).toString("hex")

      try {
        let [results] = await db.query("SELECT * FROM users WHERE googleId = ?", [userId])
        if(results.length === 0) {
          [results] = await db.query("INSERT INTO users (`username`, `googleId`, `imageURL`, `uid`) VALUES (?, ?, ?, ?)", [userName, userId, userPfp, userUID])
        } 
        else {
          console.log("user exists")
        }
      }
      catch(error) {
        console.log(error)
      }
    }
));

// declaring paths
router.get("/", (req,res) => {
    res.render("auth")
})
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    console.log(req.user)
    res.redirect('/');
  });

module.exports = router;