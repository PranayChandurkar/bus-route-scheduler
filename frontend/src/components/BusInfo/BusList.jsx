import React, { useContext, useMemo } from "react";
import { BusInfoContext } from "../../context/BusInfoContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const BusList = ({ bus }) => {
  const { busInfo } = useContext(BusInfoContext);

  if (!bus || bus.length === 0) {
    return <p className="text-center text-gray-500 mt-6">No buses found for the selected route.</p>;
  }

  const busesWithRoutes = useMemo(() => {
    return bus.map((bus) => {
      const route = busInfo.find((r) => r.route_number === bus.route_number);
      return { ...bus, routeId: route?._id, stops: route?.stops || [] };
    });
  }, [bus, busInfo]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="w-full max-w-3xl bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-6 mt-6"
    >
      <motion.h2
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-2xl font-bold text-blue-700 mb-6 text-center"
      >
        Available Buses
      </motion.h2>

      <motion.div
        className="space-y-4"
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
          },
        }}
      >
        {busesWithRoutes.map((bus, index) => (
          <motion.div
            key={bus.bus_id}
            variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Link
              to={`/timetable/${bus.routeId}`}
              state={{ bus }}
              className="flex justify-between items-center p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:bg-blue-50 transition"
            >
              <div>
                <p className="text-lg font-semibold text-gray-800">🚌 {bus.registration_number}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {bus.from} <span className="text-blue-500">→</span> {bus.to}
                </p>
                <p className="hidden text-xs text-gray-500 mt-1 md:block">
                  Route: <span className="font-medium">{bus.route_name}</span> ({bus.stops.length} stops)
                </p>
              </div>
              <span className="text-blue-500 text-2xl font-bold">➝</span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default BusList;
