import React, { useContext, useState } from 'react'
import { Search, Bus, Map, Navigation, LogOut, User } from "lucide-react";
import { Link } from 'react-router-dom'
import { BusInfoContext } from '../context/BusInfoContext';
import Sidebar from '../components/Dashboard/Sidebar';
import Acitvity from '../components/Dashboard/Acitvity';



const AdminDashboard = () => {

  const [routes, setRoutes] = useState(null)
  let totalRoutes = 0
  let totalStops = 0

  const { busInfo } = useContext(BusInfoContext)
  busInfo.map((bus) => totalRoutes += bus.stopes.length)
  busInfo.map((bus) => totalStops += bus.stopes.length)





  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <input
            type="text"
            placeholder="Search routes, buses, stops..."
            className="border px-4 py-2 rounded-lg w-1/3"
          />
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <User />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="flex gap-6 mb-6">
          <div className="bg-white p-4 w-30 rounded-xl shadow text-center">{busInfo.length}</div>
          <div className="bg-white p-4 w-30 rounded-xl shadow">{totalRoutes}</div>
          <div className="bg-white p-4 w-30 rounded-xl shadow">{totalStops}</div>
          <div className="bg-white p-4 w-30 rounded-xl shadow">Last Update</div>
        </div>

        {/* Recent Activity */}
        <Acitvity />
      </main>
    </div>
  )
}

export default AdminDashboard