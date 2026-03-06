import React, { useContext, useMemo } from "react";
import { BusInfoContext } from "../../context/BusInfoContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const BusList = ({ bus }) => {
  const { busInfo } = useContext(BusInfoContext);

  if (!bus || bus.length === 0) {
    return <p className="text-center text-slate-500 mt-6 font-medium">No buses found for the selected route.</p>;
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
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-4xl mx-auto glass-panel p-6 md:p-8 mt-6"
    >
      <motion.h2
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-500 mb-6 text-center"
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
            transition: { staggerChildren: 0.1 },
          },
        }}
      >
        {busesWithRoutes.map((bus, index) => (
          <motion.div
            key={bus.bus_id}
            variants={{ hidden: { opacity: 0, scale: 0.98, y: 20 }, show: { opacity: 1, scale: 1, y: 0 } }}
            transition={{ duration: 0.4 }}
          >
            <Link
              to={`/timetable/${bus.routeId}`}
              state={{ bus }}
              className="group flex flex-col md:flex-row justify-between items-start md:items-center p-5 rounded-2xl border border-slate-100 bg-white/60 hover:bg-white shadow-sm hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-lg shadow-sm border border-indigo-100">
                    🚌
                  </div>
                  <p className="text-xl font-bold text-slate-800 tracking-tight">{bus.registration_number}</p>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-600 font-medium ml-1">
                  <span>{bus.from}</span>
                  <span className="text-indigo-400">→</span>
                  <span>{bus.to}</span>
                </div>

                <div className="mt-3 inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-50 text-slate-500 border border-slate-100">
                  <span className="text-indigo-500">Route:</span> {bus.route_name}
                  <span className="w-1 h-1 rounded-full bg-slate-200 mx-1"></span>
                  {bus.stops.length} stops
                </div>
              </div>

              <div className="w-full md:w-auto flex justify-end">
                <div className="w-10 h-10 rounded-full bg-slate-50 group-hover:bg-indigo-600 group-hover:text-white flex items-center justify-center text-slate-400 transition-colors duration-300">
                  <span className="text-xl leading-none">➝</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default BusList;
