const busModel = require("../models/busModel")

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

module.exports.searchBus = async (req, res) => {
  const { from, to } = req.body; 

  if (!from || !to) {
    return res.status(400).json({ message: "From and To stops are required" });
  }

  try {
    const routes = await busModel.find({
      stops: { $all: [from, to] }
    });

    const results = [];

    routes.forEach((route) => {
      const fromIdx = route.stops.indexOf(from);
      const toIdx = route.stops.indexOf(to);

      if (fromIdx !== -1 && toIdx !== -1 && fromIdx !== toIdx) {
        route.buses.forEach((bus) => {
          results.push({
            bus_id: bus.bus_id,
            registration_number: bus.registration_number,
            route_number: route.route_number,
            route_name: route.route_name,
            schedule: bus.schedule,
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