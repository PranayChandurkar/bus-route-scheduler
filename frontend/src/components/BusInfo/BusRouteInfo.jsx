import React, { useContext } from "react";
import { BusInfoContext } from "../../context/BusInfoContext";
import { useLocation, useParams } from "react-router-dom";

const BusRouteInfo = () => {
  const { busInfo } = useContext(BusInfoContext);
  const { busId } = useParams();
  const location = useLocation();
  const { bus } = location.state || {};
  console.log(bus);

  const selectedBus = busInfo.find((bus) => bus._id === busId);

  if (!busInfo || busInfo.length === 0) {
    return <p>Loading bus data...</p>;
  }

  const stops = selectedBus.stops.map((stop) => ({
    name: stop,
  }));

  return (
    <div className="flex flex-col  lg:flex-row justify-center gap-8 p-6">
      <div className="bg-white w-full max-w-md rounded-2xl mx-5 shadow-lg p-6">
        <h2 className="text-xl font-bold mb-6 text-center text-blue-600">
          🕒 Bus Schedule
        </h2>

        {bus.schedule?.length > 0 ? (
          <div className="space-y-4">
            {bus.schedule.map((trip, idx) => (
              <div
                key={idx}
                className="grid grid-cols-2 gap-6 p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"
              >
                {/* Forward trip */}
                <div className="text-center">
                  <p className="font-medium text-gray-700">Onward</p>
                  <p className="text-sm text-gray-500">
                    {trip.origin_departure_time} →{" "}
                    {trip.destination_arrival_time}
                  </p>
                </div>

                {/* Return trip */}
                <div className="text-center">
                  <p className="font-medium text-gray-700">Return</p>
                  <p className="text-sm text-gray-500">
                    {trip.destination_departure_time} →{" "}
                    {trip.origin_arrival_time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No schedule available</p>
        )}
      </div>
      {/* Route Card */}
      <div className="bg-white w-full max-w-md mx-5 rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-6 text-center text-blue-600">
          🛣️ Route Details
        </h2>

        <div className="relative">
          <ol className="relative space-y-8">
            {stops.map((stop, index) => {
              const isLast = index === stops.length - 1;

              return (
                <li key={index} className="flex items-start relative pl-12">
                  <span
                    className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-blue-600`}
                  ></span>

                  {!isLast && (
                    <span className="absolute left-3 top-6 h-full w-0.5 bg-gray-300"></span>
                  )}

                  <div>
                    <h3 className="font-semibold text-gray-800">{stop.name}</h3>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      
    </div>
  );
};

export default BusRouteInfo;
