const mongoose = require("mongoose");

const stopModel = mongoose.Schema({
    stopName: String,
    arrivalTime: String,
    departureTime: String,   
});

const busModel = mongoose.Schema({
    numberPlate: String,
    startPoint: String,
    endPoint: String,
    stops: [stopModel]       
});

module.exports = mongoose.model("Bus" , busModel)