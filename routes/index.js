import express from "express";
import pool from "../db.js";
import bodyParser from "body-parser";
import bcrypt from "bcrypt"

const router = express.Router()

router.use(bodyParser.urlencoded({extended: true}))

router.get("/feed", async (req, res) => {
  if (req.session.loggedin == true) {
      const [tweets] = await pool.promise().query(`
      SELECT tweet.*, user.name
      FROM tweet
      JOIN user ON tweet.author_id = user.id;`)

      res.render("qveets.njk", {
          title: "- -- --- --- ----- Qvitter ----- --- --- -- -",
          tweets: tweets,
      })
  }
  else {
    res.redirect("/login")
  }
}) 

router.get("/", (req, res) => {
    if (req.session.views) {
      req.session.views++
    } else {
      req.session.views = 1
    }
    res.render("index.njk",
      { title: "Test", message: "Funkar?", views: req.session.views }
    )
  })

router.get("/login", async (req, res) => {

  res.render("login.njk")
})

router.post("/check", async (req, res) => {
  const {name, password} = req.body

  const [result] = await pool.promise().query('SELECT password FROM user WHERE name = ?', [name])

  console.log(result)
  console.log(password)

  if (result != "") {
    bcrypt.compare(password, result[0].password , function(err, result) {
      if (result == true) {
        console.log("Rätt")
        req.session.loggedin = true
        console.log(req.session.loggedin)
        res.redirect("/feed")
      }
      else {
        req.session.loggedin = false
        console.log("Fel")
        res.redirect("/login")
      }
    })
  }
  else {
    req.session.loggedin = false
    console.log("Fel")
    res.redirect("/login")
  }
})

router.get("/register", async (req, res) => {

  res.render("register.njk")
})

router.post("/create", async (req, res) => {
  const {name, password} = req.body
  
  bcrypt.hash(password, 10, async(err, hash) => {
    const [result] = await pool.promise().query('INSERT INTO user (name, password) VALUES (?, ?)', [name, hash])
    console.log(hash)
  })
  res.redirect("/login")
})
  

router.post("/Qveets", async (req, res) => {
    
    const message = req.body.message

    const author_id = 1

    const [result] = await pool.promise().query('INSERT INTO tweet (message, author_id) VALUES (?, ?)', [message, author_id])

    res.redirect("/feed")
})

router.get("/post", async (req, res) => {
    res.render("post.njk", {
        title: "Qveet"
    })
})

export default router