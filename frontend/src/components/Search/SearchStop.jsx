import React, { useState } from "react";

const SearchStop = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  return (
    <div className="flex gap-10 p-4">
      {/* From Stop */}
      <div className="flex flex-col">
        <label className="mb-2 text-sm font-medium text-gray-700">From</label>
        <select
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Bus Stop</option>
          <option value="op1">Stop 1</option>
          <option value="op2">Stop 2</option>
          <option value="op3">Stop 3</option>
          <option value="op4">Stop 4</option>
        </select>
      </div>

      {/* To Stop */}
      <div className="flex flex-col">
        <label className="mb-2 text-sm font-medium text-gray-700">To</label>
        <select
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select End Stop</option>
          <option value="op1">Stop 1</option>
          <option value="op2">Stop 2</option>
          <option value="op3">Stop 3</option>
          <option value="op4">Stop 4</option>
        </select>
      </div>
    </div>
  );
};

export default SearchStop;