import express from "express";
import pool from "../db.js";
import bodyParser from "body-parser";

const router = express.Router()

router.use(bodyParser.urlencoded({extended: true}))

router.get("/", async (req, res) => {
const [tweets] = await pool.promise().query(`
    SELECT tweet.*, user.name
    FROM tweet
    JOIN user ON tweet.author_id = user.id;`)

    res.render("index.njk", {
        title: "- -- --- --- ----- Qvitter ----- --- --- -- -",
        tweets: tweets,
    })
})

router.post("/Qveets", async (req, res) => {
    
    const message = req.body.message

    const author_id = 1

    const [result] = await pool.promise().query('INSERT INTO tweet (message, author_id) VALUES (?, ?)', [message, author_id])

    res.redirect("/")
})

router.get("/post", async (req, res) => {
    res.render("post.njk", {
        title: "Qveet"
    })
})

export default router