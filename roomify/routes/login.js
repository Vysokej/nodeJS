const express = require("express");
const router = express.Router();
const busboy = require("busboy");
const path = require("path");
const fs = require("fs");

router.get("/", (req,res) => {
    res.render("login")
})

module.exports = router;