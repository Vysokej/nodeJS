const express = require("express");
const router = express.Router();
require('dotenv').config();
const googleStrategy = require("passport-google-oauth20").Strategy;
const googleClientData = require("./o2AuthCredentials.json");
const passport = require("passport");
const db = require("./db")
const crypto = require("crypto")

// declaring google client data for /auth/google for the login popup
router.use(passport.initialize());
router.use(passport.session());

passport.use(new googleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    // This is where Passport will get the user profile from Google, but we don't save or query the database here
    return cb(null, profile); // You can use this for serialization if needed
  }
));

// declaring paths
router.get("/", (req,res) => {
    res.render("auth")
})
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// handling the req.profile google user data
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login', session: false }), async (req, res) => {

  // getting all of the data we want
  const profile = req.user; // ->
  const userName = profile._json.name;
  const userId = profile._json.sub;
  const userPfp = profile._json.picture;
  const userUID = crypto.randomBytes(16).toString("hex")
  
  // getting that data in the users session
  req.session.user = {
    username: userName,
    userId: userId,
    userPfp: userPfp,
    userUID: userUID,
    isLogged: true
  }

  try {
    let [results] = await db.query("SELECT * FROM users WHERE googleId = ?", [userId])
    if(results.length === 0) {
      [results] = await db.query("INSERT INTO users (`username`, `googleId`, `imageURL`, `uid`) VALUES (?, ?, ?, ?)", [userName, userId, userPfp, userUID])
    } 
        
    res.redirect("/");
  } catch(error) {
      console.log(error)
  }
})


module.exports = router;