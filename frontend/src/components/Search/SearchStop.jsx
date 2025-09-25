import React, { useContext, useState } from "react";
import { BusInfoContext } from "../../context/BusInfoContext";
import axios from "axios";
import BusList from "../BusInfo/BusList";

const SearchStop = ({ stops }) => {
  const { busInfo } = useContext(BusInfoContext);
  const [bus, setBus] = useState(null);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  if (!stops) {
    return <p className="text-center text-gray-500 mt-6">No stops available for the selected route.</p>;
  }

  let stopList = [];
  busInfo.forEach((bus) => {
    if (stops === bus.route_name) {
      stopList = bus.stops;
    }
  });

  const onSearch = async (from, to) => {
    const response = await axios.post("http://localhost:3000/bus/search-bus", { from, to });
    setBus(response.data);
  };

  const handleSearch = () => {
    if (!from || !to) {
      alert("Please select both From and To stops.");
      return;
    }
    if (from === to) {
      alert("From and To cannot be the same stop.");
      return;
    }
    onSearch(from, to);
  };

  return (
    <div className="w-full max-w-3xl flex flex-col items-center space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:gap-6 bg-white p-6 rounded-2xl shadow-md w-full">
        {/* From */}
        <div className="flex flex-col flex-1 mb-4 md:mb-0">
          <label className="mb-2 text-sm font-medium text-gray-700">From</label>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Start Stop</option>
            {stopList.map((stop, idx) => (
              <option key={idx} value={stop}>{stop}</option>
            ))}
          </select>
        </div>

        {/* Arrow */}
        <span className="hidden md:block text-4xl font-bold text-gray-600">→</span>

        {/* To */}
        <div className="flex flex-col flex-1">
          <label className="mb-2 text-sm font-medium text-gray-700">To</label>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select End Stop</option>
            {stopList.map((stop, idx) => (
              <option key={idx} value={stop}>{stop}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition w-full md:w-auto"
      >
        Search
      </button>

      {/* Bus List */}
      <BusList bus={bus} />
    </div>
  );
};

export default SearchStop;
