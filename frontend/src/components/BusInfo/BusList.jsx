import React from 'react'
import { useContext } from 'react'
import { BusInfoContext } from '../../context/BusInfoContext'
import { Link } from 'react-router-dom'


const BusList = () => {
  const { busInfo } = useContext(BusInfoContext)

  // make list of bus from div
  return (
    <div className="bg-gray-100 flex justify-center p-4 md:p-6 lg:p-8">
      <div className="w-full max-w-md md:max-w-full lg:max-w-full bg-white rounded-2xl shadow-lg p-6 md:p-8">

        <h1 className="text-xl md:text-2xl font-semibold text-center mb-4 md:mb-6">
          City Bus Timetable
        </h1>

        <input
          type="text"
          placeholder="Search by bus number or destination..."
          className="w-full px-4 py-2 mb-4 md:mb-6 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="space-y-3 md:space-y-4 w-full">
          {busInfo.map((bus) => (
            <Link to={`/timetable/${bus._id}`} className="flex justify-between items-center p-4 border rounded-xl hover:bg-gray-100 transition">
                <div key={bus.busNumber}>
                  <p className="text-blue-600 font-semibold">{bus.numberPlate}</p>
                  <p className="text-sm text-gray-600">{bus.stops[0].stopName} → {bus.stops[bus.stops.length - 1].stopName}</p>
                </div>
                <span className="text-blue-500 text-lg">➝</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BusList