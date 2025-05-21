const express = require("express");
const router = express.Router();
const session = require("express-session")
const db = require("./db")
const multer = require("multer")
const upload = multer()

// if user's not logged in, redirect them to auth
router.use((req, res, next) => {
    if(req.session.user === undefined) {
        res.redirect("/auth")
    }
    else {
        next();
    }
})

// base chats render
router.get("/", (req, res) => {
    res.render("chat", {user: req.session.user})
})

// handling new chats creation
router.post("/createChat", upload.none(), async (req, res) => {
    try {
        const userId = req.session.user.userId;
        const searchedUser = req.body.search;
        let searchedUserId;
        // checking whether searched user exists
        let sqlQuery = `SELECT * FROM users WHERE username LIKE CONCAT('%', ?, '%')`
        let [results] = await db.query(sqlQuery, [searchedUser])
        
        if(results.length === 0) {
            res.json({state: "fail", message: "user doesn't exist"})
        }
        else {
            searchedUserId = results[0].googleId
            // user exists, now we check if the user and searchedUser already have a chat
            sqlQuery = `SELECT * FROM chats
                        WHERE idChats IN (
                        SELECT idChats FROM chats WHERE userId = ?
                        );`;
            [results] = await db.query(sqlQuery, [userId])

            // | here we try to find the searchedUserId in the results response 
            // | to asses whether they already have a chat set up
            const matchingId = results.filter(chat => chat.userId === searchedUserId)
            if(matchingId.length === 0) {
                // no matching id's, so we create a new chat
                let chatUID = `${userId}${searchedUserId}`;
                sqlQuery = `INSERT INTO chats (chatId, userId) VALUES (?, ?)`;

                let newChatId
                const allUserIds = [userId, searchedUserId]
                for(let i = 0; i <= 1; i++) {
                    const [results] = await db.query(sqlQuery, [chatUID, allUserIds[i]])
                    newChatId = results.insertId
                }
                res.json({state: "success", message: newChatId})
            }
            else {
                // chat exists, we return the chat id for frontend to open
                // !!! IN FUTURE, WE WILL RETURN THE WHOLE MESSAGE SO ALL REQUESTS ARE REST API
                // !!! AND NOT USER EXPERIENCE HEAVY (LESS REQUESTS FROM USER)
                // !!! basically, we just fetch the messages here
                // !!! we should create a global function for getting messages, will make
                // !!! everything a whole lot easier
                res.json({state: "exists", message: matchingId[0].idChats})
            }
        }
    }
    catch(error) {
        console.log(error)
    }
})

// giving user all of their chats for frontend rendering
router.get("/getChats", async (req, res) => {
    try {
        const userId = req.session.user.userId
        let sqlQuery = `
            SELECT DISTINCT u.*, c2.idChats
            FROM chats c1
            JOIN chats c2 ON c1.chatId = c2.chatId
            JOIN users u ON u.googleId = c2.userId
            WHERE c1.userId = ? AND c2.userId != ?

        `
        let [results] = await db.query(sqlQuery, [userId, userId])
        res.json(results);
    }
    catch(error) {
        console.log(error)
    }
})

// live user search
router.get("/getUsers", async (req, res) => {
    try {
        const search = req.query.search;

        let sqlQuery = `SELECT username, imageURL FROM users WHERE username LIKE CONCAT('%', ?, '%') AND username != ? LIMIT 5`;
        const [results] = await db.query(sqlQuery, [search, req.session.user.username])
        res.json(results);
    }
    catch(error) {
        console.log(error)
    }
})

// exporting this router for server inclusion
module.exports = router;