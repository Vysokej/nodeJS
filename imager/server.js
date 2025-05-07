const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const busboy = require("busboy")


app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index");
})

// saveage of images
app.post("/submit", (req, res) => {

    // presetting variables like bb, fields, and extension
    const bb = busboy({
        headers: req.headers
    });
    let fields = {};
    let extension = "";
    let saveFolder = "";

    bb.on("field", (fieldname, value) => {
        fields[fieldname] = value;
    })
    bb.on("file", (fieldname, file, filename) => {
        console.log(filename);

            // setting temporary file name with time for UID and ext to keep the image functioning
            extension = path.extname(filename.filename)
            const temporaryName = Date.now() + "_" + extension;

            // declaring where to save and the saveage the image
            saveFolder = path.join(__dirname, "imagesAPI", temporaryName)
            const writeStream = fs.createWriteStream(saveFolder);
            file.pipe(writeStream);
    })
    bb.on("finish", () => {
        console.log(fields);
        const temporaryImageLocation = saveFolder;

        const newUniqueName = fields.imageName + "_" + Date.now() + extension;
        const newImageLocation = path.join(__dirname, "imagesAPI", newUniqueName)

        fs.rename(temporaryImageLocation, newImageLocation, (err) => {
            if(err) {
                console.log("image renaming failed", err)
            }

            res.json("success!")
        })
    })
    req.pipe(bb);
})

const apiRouter = require("./routes/api")
app.use("/api", apiRouter);

app.listen(3000, () => {
    console.log("http://localhost:3000")
})
