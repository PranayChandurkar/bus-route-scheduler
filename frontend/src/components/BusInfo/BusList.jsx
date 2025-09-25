import React, { useContext, useMemo } from "react";
import { BusInfoContext } from "../../context/BusInfoContext";
import { Link } from "react-router-dom";

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
    <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6 md:p-8 mt-6">
      <h2 className="text-xl font-bold text-blue-600 mb-6 text-center">Available Buses</h2>
      <div className="space-y-4">
        {busesWithRoutes.map((bus) => (
          <Link
            key={bus.bus_id}
            to={`/timetable/${bus.routeId}`}
            state={{ bus }}
            className="flex justify-between items-center p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:bg-blue-50 transition"
          >
            <div>
              <p className="text-lg font-semibold text-gray-800">🚌 {bus.registration_number}</p>
              <p className="text-sm text-gray-600 mt-1">{bus.from} <span className="text-blue-500">→</span> {bus.to}</p>
              <p className="text-xs text-gray-500 mt-1">
                Route: <span className="font-medium">{bus.route_name}</span> ({bus.stops.length} stops)
              </p>
            </div>
            <span className="text-blue-500 text-2xl font-bold">➝</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BusList;
