import React, { useContext, useMemo } from "react";
import { BusInfoContext } from "../../context/BusInfoContext";
import { Link } from "react-router-dom";

const BusList = ({ bus }) => {
  const { busInfo } = useContext(BusInfoContext);
  console.log(bus);
  if (!bus || bus.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No buses found for the selected route.
      </p>
    );
  }

  // Map buses with their corresponding route details
  const busesWithRoutes = useMemo(() => {
    return bus.map((b) => {
      const route = busInfo.find((r) => r.route_number === b.route_number);
      return { ...b, routeId: route?._id, stops: route?.stops || [] };
    });
  }, [bus, busInfo]);

  return (
    <div className="bg-gray-100 flex justify-center p-4 md:p-6 lg:p-8">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <h1 className="text-xl md:text-2xl font-semibold text-center mb-6">
          City Bus Timetable
        </h1>

        <div className="space-y-3 md:space-y-4 w-full">
          {busesWithRoutes.map((b) => (
            <Link
              key={b.bus_id}
              to={`/timetable/${b.routeId}`} // 🔹 routeId from schema
              className="flex justify-between items-center p-4 border rounded-xl hover:bg-gray-100 transition"
            >
              <div>
                <p className="text-blue-600 font-semibold">
                  {b.registration_number}
                </p>
                <p className="text-sm text-gray-600">
                  {b.from} → {b.to}
                </p>
                <p className="text-xs text-gray-500">
                  Route: {b.route_name} ({b.stops.length} stops)
                </p>
              </div>
              <span className="text-blue-500 text-lg">➝</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusList;
