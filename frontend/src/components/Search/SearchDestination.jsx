import React, { useContext, useState } from 'react'
import { BusInfoContext } from '../../context/BusInfoContext';
import SearchStop from './SearchStop';

const SearchDestination = () => {
  const { busInfo } = useContext(BusInfoContext)

  const [mainArea, setMainArea] = useState("")
  console.log(mainArea);

  return (
    // make two div with flex and make select and dummy option
    <div>
      <div className='flex flex-col items-center bg-gray-100 p-10 rounded-lg shadow-md'>
        <select
          class="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setMainArea(e.target.value)}
        >
          <option selected>Select Main Stop</option>
          {busInfo.map((bus) => (
            <option key={bus._id} value={setMainArea}>{bus.route_name}</option>
          ))}
        </select>
      </div>

      <SearchStop stops={mainArea} />
    </div>


  )
}

export default SearchDestination