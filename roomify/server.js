const express = require("express");
const app = express();
const busboy = require("busboy");
const path = require("path");
const fs = require("fs");

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")))

const loginRouter = require("./routes/login")
app.use("/", loginRouter)

const chatRouter = require("./routes/chat")
app.use("/chat", chatRouter)

app.listen(3000, () => {
    console.log("http://localhost:3000")
})