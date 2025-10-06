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
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-100">
  <SearchDestination />
</div>

  )
}

export default Home