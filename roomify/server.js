const express = require("express");
const app = express();
const busboy = require("busboy");
const path = require("path");
const fs = require("fs");
require("dotenv").config();
const session = require("express-session")

// page rendering
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")))

// creating session to save user data 
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

// getting routers
const loginRouter = require("./routes/auth")
app.use("/auth", loginRouter)

const chatRouter = require("./routes/chat")
app.use("/", chatRouter)

app.listen(3000, () => {
    console.log("http://localhost:3000")
})