const express = require("express");
const router = express.Router();
const session = require("express-session")

router.get("/", (req,res) => {
    res.render("chat")
})

module.exports = router;