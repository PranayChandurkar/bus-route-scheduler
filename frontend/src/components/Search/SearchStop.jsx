<<<<<<< HEAD
import React, { useState } from "react";
=======
import React, { useContext, useState } from "react";
import { BusInfoContext } from "../../context/BusInfoContext";
import { LogIn } from "lucide-react";
import axios from "axios";
import BusList from "../BusInfo/BusList";
>>>>>>> 4eeb9e74517bab7b511e7063c9ec02653d416501

const SearchStop = ({stops}) => {
  const { busInfo } = useContext(BusInfoContext)
  const [bus, setBus] = useState(null)  
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  if (!stops || stops.length === 0) {
    return <p className="text-center text-gray-500">No stops available for the selected route.</p>;
  }

  let stop = []
  busInfo.map((bus) =>{    
    if (stops === bus.route_name){
      stop = bus.stops
    }
  })

  const onSearch = async (from, to) => {
    const response = await axios.post("http://localhost:3000/bus/search-bus", {from, to});
    setBus(response.data);
  }
  
  
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
    <div>

    <div className="flex flex-col items-center bg-gray-100 p-10 rounded-lg shadow-md">
      <div className="flex items-center gap-6 mb-6">

        <div className="flex flex-col items-center">
          <label className="mb-2 text-sm font-medium text-gray-700">From</label>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="px-6 py-3 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Start Stop</option>
            {stop.map((stop, idx) => (
              <option key={idx} value={stop}>
                {stop}
              </option>
            ))}
          </select>
        </div>

        <span className="text-5xl font-bold text-gray-600">→</span>

        <div className="flex flex-col items-center">
          <label className="mb-2 text-sm font-medium text-gray-700">To</label>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="px-6 py-3 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select End Stop</option>
            {stop.map((stop, idx) => (
              <option key={idx} value={stop}>
                {stop}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={handleSearch}
        className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Search
      </button>
    </div>
    <BusList bus = {bus} />
    </div>

  );
};

export default SearchStop;
