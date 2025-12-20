import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import BusRouteInfo from './components/BusInfo/BusRouteInfo'
import SearchStop from './components/Search/SearchStop'
import SearchDestination from './components/Search/SearchDestination'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element = {<Home />} />
        <Route path='/timetable/:busId' element = {<BusRouteInfo />} />
        <Route path="/search-stop" element={<SearchStop />} />
        <Route path="/search-desti" element={<SearchDestination />} />
      </Routes>
    </div>
  )
}

export default App