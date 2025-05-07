const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs").promises;

/* API calls */
async function findImage(req, res, next) {
    const search = req.query.search;
    try {
        // searching the folder for matching file names
        const folder = await fs.readdir(path.join(__dirname, "../imagesAPI"));
        const files = folder.filter(folder => folder.includes(search))
        
        // checking whether the file even exists
        if(files.length === 0) {
            res.status(404).json({error: "Image not found"})
        }
        else {
            req.imagePath = path.join(__dirname, "../imagesAPI", files[0])
            next();
        }
    }
    catch(err) {
        console.log(err);
    }
}
router.get("/", findImage, (req, res) => {
    res.sendFile(req.imagePath)
})

module.exports = router;