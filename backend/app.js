const dotenv = require("dotenv")
dotenv.config()
const express = require("express");
const app = express();
const connectDB = require("./config/db")
const busRoutes = require("./routes/busRoutes")
const cors = require("cors")

app.use(cors())

connectDB()


app.use(express.json())
app.use(express.urlencoded({extended : true}))

<<<<<<< HEAD
app.use("/", homeRoute)
=======
>>>>>>> 4eeb9e74517bab7b511e7063c9ec02653d416501
app.use("/bus", busRoutes)


module.exports = app