const express = require("express");
const router = express.Router();
const busServices = require("../services/busServices")
const busControllers = require("../controllers/busControllers")

router.post("/create-bus" , busControllers.createBus)

router.get("/get-all-buses" , busControllers.getAllBuses)

router.post("/search-bus" ,)

router.delete("/delete-bus/:id" , busControllers.deleteBus)

module.exports = router