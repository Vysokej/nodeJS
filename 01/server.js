const express = require("express");
const path = require("path");
const fs = require("fs");
require("dotenv").config();
const app = express();

app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")));

const formRouter = require("./routes/form")
const nameRouter = require("./routes/name")

app.use("/form", formRouter);
app.use("/name", nameRouter);

app.get("/", (req, res) => {
    console.log("home section")
    res.send("home section")
})

app.listen(3000, () => {
    console.log("http://localhost:3000")
});