const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
    origin_departure_time: String,
    destination_arrival_time: String,
    destination_departure_time: String,
    origin_arrival_time: String,
    round_trip_km: Number
});

const busSchema = new mongoose.Schema({
    bus_id: Number, 
    registration_number: String, 
    total_daily_km: Number, 
    schedule: [tripSchema] 
});

const routeSchema = new mongoose.Schema({
    route_number: { type: String, unique: true }, 
    route_name: String, 
    distance_km: Number, 
    
    stops: [String], 
    
    buses: [busSchema] 
});

module.exports = mongoose.model("Route", routeSchema);