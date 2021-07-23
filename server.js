/* Planning the Server

/ ---> It's working = res
/signin ---> POST = sucess or fail
/register ---> POST = user
/profile/:userId ---> GET = user 
/image ---> PUT (update user object)

*/
// Liberaries
import express from "express"
import cors from "cors"
import kenx from "knex"
import bcrypt from "bcrypt"
import dotenv from "dotenv/config"
const parse = require("pg-connection-string").parse

//  Controlers
import register from "./Controllers/register.js"
import signin from "./Controllers/signin.js"
import profile from "./Controllers/profile.js"
import image from "./Controllers/image.js"

//server
const app = express()
app.use(cors())
app.use(express.json())

//Database
const pgconfig = parse(process.env.DATABASE_URL)
pgconfig.ssl = { rejectUnauthorized: false }
const db = knex({
  client: "pg",
  connection: pgconfig,
})

const SERVER_PATH = process.env.SERVER_PATH
// Root Page
app.get("/", (req, res) => {
  res.send("it is working")
})

//Signin Page
app.post("/signin", signin.login(db, bcrypt))

//Register Page
app.post("/register", register.handleRegister(db, bcrypt))

//Profile/:userId Page
app.get("/profile/:id", profile.profileId(db))

//Image Page
app.put("/image", image.imgCounter(db)) //update the entries
app.post("/imageurl", image.handleAPI())

//Listen the Server
app.listen(process.env.PORT || SERVER_PATH, () => {
  // console.log(db("login").select("*"))
  console.log(`App is running, server ${process.env.PORT}!!`)
})
