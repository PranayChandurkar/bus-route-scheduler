const busModel = require("../models/busModel");

module.exports.createBus = async ({ numberPlate, startPoint, endPoint, stops }) => {
    if (!numberPlate || !startPoint || !endPoint || !stops) {
        throw new Error("All fields are required");
    }

    const bus = await busModel.create({
        numberPlate,
        startPoint,
        endPoint,
        stops
    });

    return bus;
};
