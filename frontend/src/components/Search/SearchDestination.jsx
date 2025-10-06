import React, { useContext, useState } from "react";
import { BusInfoContext } from "../../context/BusInfoContext";
import SearchStop from "./SearchStop";
import { motion } from "framer-motion";

const SearchDestination = () => {
  const { busInfo } = useContext(BusInfoContext);
  const [mainArea, setMainArea] = useState("");

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-100 flex flex-col items-center">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-10 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
          City Bus Timetable
        </h1>
        <p className="mt-2 text-gray-600 text-lg">
          Find the best route and bus for your journey 🚍
        </p>
      </motion.div>

      {/* Route Select */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-5 w-full max-w-3xl bg-white/80 backdrop-blur-md p-5 rounded-2xl shadow-xl"
      >
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Choose Route
        </label>
        <select
          className="w-full border border-gray-300 rounded-lg px-3 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setMainArea(e.target.value)}
          value={mainArea}
        >
          <option value="" className="cursor-pointer">Select Main Route</option>
          {busInfo.map((bus) => (
            <option key={bus._id} value={bus.route_name}>
              {bus.route_name}
            </option>
          ))}
        </select>
      </motion.div>

      {/* Search Stop */}
      {mainArea && <SearchStop stops={mainArea} />}
    </div>
  );
};

export default SearchDestination;
