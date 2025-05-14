const express = require("express");
const router = express.Router();
const session = require("express-session")

// if user's not logged in, redirect them to auth
router.use((req, res, next) => {
    if(req.session.user === undefined) {
        res.redirect("/auth")
    }
    else {
        next();
    }
})

router.get("/", (req, res) => {
    res.render("chat", {user: req.session.user})
})

module.exports = router;