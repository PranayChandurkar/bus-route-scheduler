import React, { useContext, useState } from "react";
import { BusInfoContext } from "../../context/BusInfoContext";
import SearchStop from "./SearchStop";
import { motion } from "framer-motion";

const SearchDestination = () => {
  const { busInfo } = useContext(BusInfoContext);
  const [mainArea, setMainArea] = useState("");

  return (
    <div className="relative w-full flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-10 text-center"
      >
        <span className="inline-block py-1.5 px-4 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-semibold tracking-wide mb-6 shadow-sm">
          Smart Transit
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold premium-gradient-text drop-shadow-sm mb-6 pb-2 leading-tight">
          City Bus Timetable
        </h1>
        <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto font-light">
          Find the best route and bus for your journey 🚍
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-10 sm:mt-12 w-full max-w-4xl glass-panel p-4 sm:p-6 md:p-8"
      >
        <div className="mb-2">
          <label className="block mb-3 font-semibold text-slate-700">
            Choose Route
          </label>
          <select
            className="premium-input"
            onChange={(e) => setMainArea(e.target.value)}
            value={mainArea}
          >
            <option value="" className="text-slate-500">Select Main Route</option>
            {busInfo?.map((bus) => (
              <option key={bus._id} value={bus.route_name} className="text-slate-800">
                {bus.route_name}
              </option>
            ))}
          </select>
        </div>

        {mainArea && <SearchStop stops={mainArea} />}
      </motion.div>
    </div>
  );
};

export default SearchDestination;
