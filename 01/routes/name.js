const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    const firstName = req.query.firstName;
    const lastName = req.query.lastName;
    response = `Hello ${firstName} ${lastName}`
    console.log(response)
    res.send(response);
})

module.exports = router;