import React from 'react'
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import BusRoute from './pages/BusRoute'
import Home from './pages/Home'
import Register from './pages/Register'
import AdminDashboard from './pages/AdminDashboard'
import BusInfo from './pages/BusInfo'
import AddBus from './pages/Bus/AddBus'

const App = () => {
  return (
    <div>
      <Routes>
        {/* Show entire timetable */}
        <Route path='/' element = {<Home />} />
        {/* Routes display for specific bus */}
        <Route path='/timetable/:id' element = {<BusRoute />} />
        {/* admin login page */}
        <Route path='/admin/login' element = {<Login />} />  
        {/* admin register page */}
        <Route path='/admin/register' element = {<Register />} />  
        {/* <Route path='/admin/timetables' element = {<Login />} /> */}
        <Route path='/admin/dashboard' element = {<AdminDashboard />} />
        <Route path='/admin/routes' element = {<Login />} />
        
        <Route path='/admin/buses' element = {<BusInfo />} />
        <Route path='/admin/buses/add' element = {<AddBus />} />
        <Route path='/admin/stops' element = {<Login />} />
      </Routes>
    </div>
  )
}

export default App