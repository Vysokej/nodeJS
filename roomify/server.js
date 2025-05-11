const express = require("express");
const app = express();
const busboy = require("busboy");
const path = require("path");
const fs = require("fs");

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")))

const loginRouter = require("./routes/auth")
app.use("/auth", loginRouter)

const chatRouter = require("./routes/chat")
app.use("/", chatRouter)

app.listen(3000, () => {
    console.log("http://localhost:3000")
})