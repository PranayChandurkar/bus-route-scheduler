import React from 'react'

const Topbar = () => {
  return (
    <div className="flex items-center justify-between mb-6">
      <input
        type="text"
        placeholder="Search routes, buses, stops..."
        className="border px-4 py-2 rounded-lg w-1/3"
      />
      <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
    </div>
  )
}

export default Topbar