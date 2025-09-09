import React from 'react'
import { useContext } from 'react'
import { BusInfoContext } from '../../context/BusInfoContext'


const BusList = () => {
    const {busInfo} = useContext(BusInfoContext)
    console.log(busInfo);
    
    // make list of bus from div
  return (
    <div>
        
    </div>
  )
}

export default BusList