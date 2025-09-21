import React from 'react'
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import BusRoute from './pages/BusRoute'
import Home from './pages/Home'
import Register from './pages/Register'
import AdminDashboard from './pages/AdminDashboard'
import BusInfo from './pages/BusInfo'
import AddBus from './pages/Bus/AddBus'
import BusRouteInfo from './components/BusInfo/BusRouteInfo'
import SearchStop from './components/Search/SearchStop'
import SearchDestination from './components/Search/SearchDestination'


const App = () => {
  return (
    <div>
      <Routes>
        {/* Show entire timetable */}
        <Route path='/' element = {<Home />} />
        {/* Routes display for specific bus */}
        <Route path='/timetable/:busId' element = {<BusRouteInfo />} />
        {/* admin login page */}
        <Route path='/admin/login' element = {<Login />} />  
        {/* admin register page */}
        <Route path='/admin/register' element = {<Register />} />  
        {/* <Route path='/admin/timetables' element = {<Login />} /> */}
        <Route path='/admin/dashboard' element = {<AdminDashboard />} />
        <Route path='/admin/routes' element = {<BusRoute />} />
        
        <Route path='/admin/buses' element = {<BusInfo />} />
        <Route path='/admin/buses/add' element = {<AddBus />} />
        <Route path='/admin/stops' element = {<Login />} />
        <Route path="/search-stop" element={<SearchStop />} />
        <Route path="/search-desti" element={<SearchDestination />} />
      </Routes>
    </div>
  )
}

export default App