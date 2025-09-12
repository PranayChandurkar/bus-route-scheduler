import React from 'react'
import { BusInfoProvider } from '../context/BusInfoContext'
import BusList from '../components/BusInfo/BusList'
import AdminDashboard from './AdminDashboard'
import AddBus from './Bus/AddBus'
import BusRouteInfo from '../components/BusInfo/BusRouteInfo'

const Home = () => {
  return (
    <div>
      <BusList />
    </div>
  )
}

export default Home