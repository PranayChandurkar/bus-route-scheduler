import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div>
        <aside className="w-64 h-screen  bg-white shadow-md p-4 flex flex-col gap-5">
        <div className="text-xl font-bold mb-8">🚍 Logo</div>
        <nav className="flex-1 space-y-4 gap">
          <Link to="/admin/dashboard" className="flex items-center gap-2 text-blue-600 font-medium">
            Dashboard
          </Link>
          <Link to="/admin/routes" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
            Routes
          </Link>
          <Link to="/admin/buses" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
            Buses
          </Link>
          <Link to="/admin/stops" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
            Stops
          </Link>
          <Link to="/admin/logout" className="flex items-center gap-2 text-gray-700 hover:text-red-500">
            Logout
          </Link>
        </nav>
      </aside>
    </div>
  )
}

export default Sidebar