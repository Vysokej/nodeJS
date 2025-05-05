const express = require("express")
const router = express.Router();

router.get("/", (req, res) => {
    res.send("form")
})
router.post("/submit", (req, res) => {

})
router.get("/:id", (req, res) => {
    const id = req.params.id;
    console.log(id);
    res.send(`user id ${id}`)
})

module.exports = router;