import React, { useContext, useState } from 'react';
import { BusInfoContext } from '../../context/BusInfoContext';
import SearchStop from './SearchStop';

const SearchDestination = () => {
  const { busInfo } = useContext(BusInfoContext);
  const [mainArea, setMainArea] = useState("");

  return (
    <div className="flex flex-col items-center p-2  md:p-10 space-y-6 bg-gray-50 min-h-screen">
      {/* Main Area Select */}
      <div className="w-full max-w-3xl bg-white p-6 rounded-2xl shadow-md flex justify-center">
        <select
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setMainArea(e.target.value)}
          value={mainArea}
        >
          <option value="">Select Main Stop</option>
          {busInfo.map((bus) => (
            <option key={bus._id} value={bus.route_name}>
              {bus.route_name}
            </option>
          ))}
        </select>
      </div>

      {/* Search Stop Component */}
      {mainArea && <SearchStop stops={mainArea} />}
    </div>
  );
};

export default SearchDestination;
