import React, { useContext } from "react";
import { BusInfoContext } from "../../context/BusInfoContext";
import { useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";

const BusRouteInfo = () => {
  const { busInfo } = useContext(BusInfoContext);
  const { busId } = useParams();
  const location = useLocation();
  const { bus } = location.state || {};

  const selectedBus = busInfo.find((b) => b._id === busId);

  if (!busInfo || busInfo.length === 0) {
    return <p>Loading bus data...</p>;
  }

  const stops = selectedBus.stops.map((stop) => ({ name: stop }));

  const cardVariants = {
    hidden: { opacity: 0, y: -20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  const listVariants = {
    hidden: { opacity: 0, x: -10 },
    show: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center gap-8 p-6 bg-gradient-to-b from-blue-100 via-white to-blue-100 md:gap-15">
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="show"
        className="bg-white cursor-pointer w-full max-w-md h-full rounded-2xl shadow-lg p-6 "
      >
        <h2 className="text-xl font-bold mb-6 text-center text-blue-600">
          🕒 Bus Schedule
        </h2>

        {bus.schedule?.length > 0 ? (
          <div className="space-y-4">
            {bus.schedule.map((trip, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.2 }}
                className="grid grid-cols-2 gap-6 p-4 rounded-xl border border-gray-200 shadow-sm hover:scale-105 duration-300"
              >
                <div className="text-center">
                  <p className="font-semibold text-gray-700">Onward</p>
                  <p className="text-sm font-medium mt-1 text-gray-500">
                    {trip.origin_departure_time} → {trip.destination_arrival_time}
                  </p>
                </div>

                <div className="text-center">
                  <p className="font-semibold text-gray-700" >Return</p>
                  <p className="text-sm font-medium mt-1 text-gray-500">
                    {trip.destination_departure_time} → {trip.origin_arrival_time}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No schedule available</p>
        )}
      </motion.div>

      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.3 }}
        className="bg-white cursor-pointer w-full max-w-md h-full rounded-2xl shadow-lg p-6 "
      >
        <h2 className="text-xl font-bold mb-8 text-center text-blue-600">
          🛣️ Route Details
        </h2>

        <ol className="relative space-y-8">
          {stops.map((stop, index) => {
            const isLast = index === stops.length - 1;

            return (
              <motion.li
                key={index}
                custom={index}
                variants={listVariants}
                initial="hidden"
                animate="show"
                className="flex items-start relative pl-9 "
              >
                <span className="absolute left-1 top-1 w-4 h-4 rounded-full bg-blue-600"></span>

                {!isLast && (
                  <span className="absolute left-3 top-6 h-full w-0.5 bg-gray-300"></span>
                )}

                <div className="inline">
                  <h3 className="font-semibold text-gray-800">{stop.name}</h3>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </motion.div>
    </div>
  );
};

export default BusRouteInfo;
