import React, { useState } from "react";

const SearchStop = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  return (
    <div className="flex flex-col items-center bg-gray-100 p-10">
      {/* From → To row */}
      <div className="flex items-center gap-6 mb-6">
        {/* From Stop */}
        <div className="flex flex-col items-center">
          <label className="mb-2 text-sm font-medium text-gray-700">From</label>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="px-6 py-3 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Start Stop</option>
            <option value="op1">Stop 1</option>
            <option value="op2">Stop 2</option>
            <option value="op3">Stop 3</option>
            <option value="op4">Stop 4</option>
          </select>
        </div>

        {/* Arrow */}
        <span className="text-5xl font-bold text-gray-600">→</span>

        {/* To Stop */}
        <div className="flex flex-col items-center">
          <label className="mb-2 text-sm font-medium text-gray-700">To</label>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="px-6 py-3 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select End Stop</option>
            <option value="op1">Stop 1</option>
            <option value="op2">Stop 2</option>
            <option value="op3">Stop 3</option>
            <option value="op4">Stop 4</option>
          </select>
        </div>
      </div>

      {/* Button below */}
      <button
        className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Search
      </button>
    </div>
  );
};

export default SearchStop;
