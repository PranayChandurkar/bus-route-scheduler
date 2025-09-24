import React, { useContext } from 'react'
import { BusInfoContext } from '../../context/BusInfoContext';
import { useParams } from 'react-router-dom';



    // this file is for route detail so make this
    
const BusRouteInfo = () => {
  const { busInfo } = useContext(BusInfoContext)
  const {busId} = useParams()


  const selectedBus = busInfo.find(bus => bus._id === busId);
  
  if (!busInfo || busInfo.length === 0) {
    return <p>Loading bus data...</p>;
  }

  const stops = selectedBus.stops.map((stop) => ({
    name: stop,
  }));

  console.log(stops);
  
  return (
    <div className='flex justify-center p-4'>
        <div className="bg-white w-full max-w-md rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6 text-center">
            Bus 25 – Badnera to Kathora
          </h2>

          <div className="relative">
            <ol className="relative space-y-8">
              {stops.map((stop, index) => {
                const isLast = index === stops.length - 1;
                const dotColor = isLast ? "bg-blue-600" : "bg-blue-600";

                return (
                  <li key={index} className="flex items-start relative pl-12">
                    {/* Dot */}
                    <span
                      className={`absolute left-1 top-4 w-4 h-4 rounded-full ${dotColor}`}
                    ></span>

                    {/* Line below (only if not last) */}
                    {!isLast && (
                      <span className="absolute left-3 top-9 h-full w-0.5 bg-gray-300"></span>
                    )}

                    {/* Stop details */}
                    <div>
                      <h3 className="font-semibold text-gray-900 m-3">{stop.name}</h3>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
    </div>
  )
}

export default BusRouteInfo