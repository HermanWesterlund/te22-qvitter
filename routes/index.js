import express from "express";
import pool from "../db.js";
import bodyParser from "body-parser";
import bcrypt from "bcrypt"

const router = express.Router()

router.use(bodyParser.urlencoded({extended: true}))

let myPlaintextPassword = "detlösenordsomduvillha"
bcrypt.hash(myPlaintextPassword, 10, function(err, hash) {
	// här får vi nu tag i lösenordets hash i variabeln hash
	console.log(hash)
})

router.get("/feed", async (req, res) => {
const [tweets] = await pool.promise().query(`
    SELECT tweet.*, user.name
    FROM tweet
    JOIN user ON tweet.author_id = user.id;`)

    res.render("qveets.njk", {
        title: "- -- --- --- ----- Qvitter ----- --- --- -- -",
        tweets: tweets,
    })
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


  if (result == [""])
  {
    console.log("Bheif")
  }

  console.log(result)
  console.log(password)

  // bcrypt.compare(password, , function(err, result) {
  //   if (result == true) {
  //     console.log("Rätt")      
  //   }
  //   else {
  //     console.log("Fel")
  //   }
  // })

  res.redirect("/login")
})

router.get("/register", async (req, res) => {

  res.render("register.njk")
})

router.post("/login", async (req, res) => {
  const {name, password} = req.body

  const [result] = await pool.promise().query('INSERT INTO user (name, password) VALUES (?, ?)', [name, password])
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