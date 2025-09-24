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


module.exports.searchBus = async (req, res) => {
  const { from, to } = req.body; 

  if (!from || !to) {
    return res.status(400).json({ message: "From and To stops are required" });
  }

  try {
<<<<<<< HEAD
    const routes = await Route.find({
=======
    const routes = await busModel.find({
>>>>>>> 4eeb9e74517bab7b511e7063c9ec02653d416501
      stops: { $all: [from, to] }
    });

    const results = [];

    routes.forEach((route) => {
      const fromIdx = route.stops.indexOf(from);
      const toIdx = route.stops.indexOf(to);

      if (fromIdx < toIdx) {
        route.buses.forEach((bus) => {
          results.push({
            bus_id: bus.bus_id,
            registration_number: bus.registration_number,
            route_number: route.route_number,
            route_name: route.route_name,
            from,
            to
          });
        });
      }
    });

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}