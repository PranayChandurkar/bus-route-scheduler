const busModel = require("../models/busModel")
const busServices = require("../services/busServices")


module.exports.createBus = async (req, res) => {
    try {
        const bus = await busServices.createBus(req.body)
        res.status(201).json({
            success : true,
            message : "Bus created successfully",
            bus
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }       
}

module.exports.getAllBuses = async (req, res) => {
    try {
        const buses = await busModel.find()
        res.status(200).json({
            success : true,
            message : "Buses fetched successfully",
            buses
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }    
}

module.exports.deleteBus = async (req, res) => {
    try {
        const { id } = req.params 
        const deletedBus = await busModel.findByIdAndDelete(id)

        if (!deletedBus) {
            return res.status(404).json({
                success : false,
                message : "Bus not found"
            })
        }   
        res.status(200).json({
            success : true,
            message : "Bus deleted successfully",
            deletedBus
        })
    } catch (error) {  
        res.status(500).json({
            result : false,
            message : error.message 
        })
    }
}
