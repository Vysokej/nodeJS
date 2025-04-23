const express = require("express");
const path = require("path");
const fs = require("fs");
require("dotenv").config();
const app = express();

// predefining functions
function ranNum() {
    const randomValue = Math.random();
    return
}
function fn1(req, res, next) {
    console.log(req.url)
    next();
}
function fn2(req, res, next) {
    console.log("fn2")
    next();
}

app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    console.log("home section")
    res.send("home section")
})

app.get("/about", (req, res) => {
    console.log("about section")
    res.render("about")
})

app.get("/random", fn1, fn2, (req, res, next) => {
    next();
})


app.listen(3000, () => {
    console.log("http://localhost:3000")
});