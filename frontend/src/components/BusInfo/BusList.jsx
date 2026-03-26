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
              className="group block p-3.5 sm:p-4 rounded-3xl border border-slate-200/60 bg-white hover:bg-slate-50/50 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-indigo-50 flex items-center justify-center text-lg shadow-inner border border-indigo-100/50">
                    🚌
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-lg font-extrabold text-slate-800 tracking-tight truncate pb-0.5">{bus.registration_number}</p>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium whitespace-nowrap overflow-hidden">
                      <span className="truncate">{bus.from}</span>
                      <span className="text-indigo-400 shrink-0">→</span>
                      <span className="truncate">{bus.to}</span>
                    </div>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-indigo-600 group-hover:text-white flex items-center justify-center text-slate-400 transition-colors duration-300 shrink-0 shadow-sm border border-slate-100 group-hover:border-indigo-600">
                  <span className="text-lg leading-none mb-0.5">➝</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div className="text-[11px] font-medium text-slate-600 leading-snug pr-2 line-clamp-2 w-full">
                  <span className="text-indigo-600 font-bold mr-1">ROUTE:</span> 
                  {bus.route_name}
                </div>
                <div className="inline-flex items-center justify-center px-2 py-1 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold tracking-wider border border-slate-200/60 shrink-0 shadow-sm whitespace-nowrap mt-1 sm:mt-0">
                  {bus.stops.length} STOPS
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
