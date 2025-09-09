import React from 'react'

const Acitvity = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
      <ul className="space-y-3">
        <li className="flex justify-between text-gray-700">
          <span>Activity item</span>
          <span className="text-sm text-gray-500">time</span>
        </li>
        <li className="flex justify-between text-gray-700">
          <span>Activity item</span>
          <span className="text-sm text-gray-500">time</span>
        </li>
      </ul>
    </div>
  )
}

export default Acitvity