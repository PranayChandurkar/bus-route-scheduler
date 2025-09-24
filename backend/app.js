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

app.use("/", homeRoute)
app.use("/bus", busRoutes)


module.exports = app