const express = require("express");
const router = express.Router();
const busServices = require("../services/busServices")
const busControllers = require("../controllers/busControllers")

router.post("/create-bus" , busControllers.createBus)

router.get("/get-all-buses" , busControllers.getAllBuses)

<<<<<<< HEAD
router.post("/search-bus" ,)
=======
router.post("/search-bus" , busControllers.searchBus)
>>>>>>> 4eeb9e74517bab7b511e7063c9ec02653d416501

router.delete("/delete-bus/:id" , busControllers.deleteBus)

module.exports = router