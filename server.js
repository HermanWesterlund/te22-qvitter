import "dotenv/config"
import express from "express"
import nunjucks from "nunjucks"
import indexRouter from "./routes/index.js"
import tweetsRouter from "./routes/tweets.js"
import bodyParser from "body-parser"

const app = express()

const port = 3000

nunjucks.configure("views", {
    autoescape: true,
    express: app,
})

app.use(express.static("public"))

app.use("/", indexRouter)

app.use("/tweets", tweetsRouter)

app.use(express.json())

app.use(bodyParser.urlencoded({extended: true}))

app.listen(port, () => {
    console.log(`Exampel app listening at http://localhost:${port}`)
})