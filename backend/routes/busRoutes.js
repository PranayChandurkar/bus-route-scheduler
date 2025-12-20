const express = require("express");
const router = express.Router();
const busControllers = require("../controllers/busControllers")

router.get("/get-all-buses" , busControllers.getAllBuses)

router.post("/search-bus" , busControllers.searchBus)

module.exports = router