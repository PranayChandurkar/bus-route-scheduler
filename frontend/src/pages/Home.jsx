import React from 'react'
import { BusInfoProvider } from '../context/BusInfoContext'
import BusList from '../components/BusInfo/BusList'
import AdminDashboard from './AdminDashboard'
import AddBus from './Bus/AddBus'
import BusRouteInfo from '../components/BusInfo/BusRouteInfo'
import SearchDestination from '../components/Search/SearchDestination'
import SearchStop from '../components/Search/SearchStop'

const Home = () => {
  return (
    <div>
      {/* <BusList /> */}
      <SearchDestination />
      {/* <SearchStop /> */}
      
    </div>
  )
}

export default Home