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


module.exports.findBusByRoute = async (req, res) => {
  // 1. Get 'from' and 'to' stops from the URL query parameters
  const { from, to } = req.query;

  // 2. Validate the input
  if (!from || !to) {
    return res.status(400).json({ message: 'Please provide both "from" and "to" stops.' });
  }

  try {
    // 3. Construct and execute the MongoDB query
    const buses = await Bus.find({
      $expr: {
        $and: [
          // Condition A: Ensure the 'from' stop exists in the route
          { $ne: [{ $indexOfArray: ["$route", from] }, -1] },
          
          // Condition B: Check that the 'from' stop's index is less than the 'to' stop's index
          // This elegantly handles both order and the existence of the 'to' stop.
          // If 'to' doesn't exist, its index is -1, and the condition fails.
          {
            $lt: [
              { $indexOfArray: ["$route", from] },
              { $indexOfArray: ["$route", to] }
            ]
          }
        ]
      }
    });

    // 4. Handle the response based on the query result
    if (buses.length === 0) {
      // If no buses match, send a 404 Not Found response
      return res.status(404).json({ message: 'No direct bus route found.' });
    }

    // If buses are found, send a 200 OK response with the data
    res.status(200).json(buses);

  } catch (error) {
    // 5. Handle any server-side errors
    console.error('Error finding bus route:', error);
    res.status(500).json({ message: 'An error occurred on the server.' });
  }
};
