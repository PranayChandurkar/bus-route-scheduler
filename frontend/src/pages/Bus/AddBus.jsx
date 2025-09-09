import React, { useState } from "react";

import axios from "axios";


const AddBus = () => {
  const [numberPlate, setNumberPlate] = useState("");
  const [startPoint, setStartPoint] = useState("");
  const [endPoint, setEndPoint] = useState("");
  const [stops, setStops] = useState([
    { stopName: "", arrivalTime: "", departureTime: "" },
  ]);

  // handle stop change
  const handleStopChange = (index, field, value) => {
    const newStops = [...stops];
    newStops[index][field] = value;
    setStops(newStops);
  };

  // add new stop
  const addStop = () => {
    setStops([
      ...stops,
      { stopName: "", arrivalTime: "", departureTime: "" },
    ]);
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const busData = { numberPlate, startPoint, endPoint, stops };

    const res = await axios.post("http://localhost:3000/bus/create-bus", busData,{
  headers: { "Content-Type": "application/json" }
});  
    console.log("Bus data:", busData);
    // Reset
    setNumberPlate("");
    setStartPoint("");
    setEndPoint("");
    setStops([{ stopName: "", arrivalTime: "", departureTime: "" }]);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-lg font-semibold mb-4">Add New Bus</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2>Bus Number Plate</h2>
        <input
          type="text"
          placeholder="e.g., KBC 123X"
          value={numberPlate}
          onChange={(e) => setNumberPlate(e.target.value)}
          className="w-full p-3 border rounded-lg"
          required
        />

        <h2>Start Point</h2>
        <input
          type="text"
          placeholder="e.g., Nairobi CBD"
          value={startPoint}
          onChange={(e) => setStartPoint(e.target.value)}
          className="w-full p-3 border rounded-lg"
          required
        />

        <h2>End Point</h2>
        <input
          type="text"
          placeholder="e.g., Mombasa"
          value={endPoint}
          onChange={(e) => setEndPoint(e.target.value)}
          className="w-full p-3 border rounded-lg"
          required
        />

        <h2>Bus Stops</h2>
        {stops.map((stop, index) => (
          <div key={index} className="mt-3 border p-3 rounded-lg bg-gray-50">
            <p className="font-semibold mb-2">Stop {index + 1} Details</p>

            <h2>Stop Name</h2>
            <input
              type="text"
              placeholder="e.g., Central Station"
              value={stop.stopName}
              onChange={(e) =>
                handleStopChange(index, "stopName", e.target.value)
              }
              className="w-full p-2 border rounded-lg mb-2"
              required
            />

            <h2>Arrival Time</h2>
            <input
              type="time"
              value={stop.arrivalTime}
              onChange={(e) =>
                handleStopChange(index, "arrivalTime", e.target.value)
              }
              className="w-full p-2 border rounded-lg mb-2"
              required
            />

            <h2>Departure Time</h2>
            <input
              type="time"
              value={stop.departureTime}
              onChange={(e) =>
                handleStopChange(index, "departureTime", e.target.value)
              }
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addStop}
          className="w-full mt-3 py-2 border-2 border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50"
        >
          + Add Stop
        </button>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          Save Bus
        </button>
      </form>
    </div>
  );
};

export default AddBus;
