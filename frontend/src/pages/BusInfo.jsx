import React from 'react'
import Sidebar from '../components/Dashboard/Sidebar'
import Topbar from '../components/Dashboard/Topbar'
import ManageBus from '../components/Dashboard/ManageBus'

const BusInfo = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <Topbar />

        {/* Page Content */}
        <div className="p-6 bg-gray-50 flex-1 overflow-y-auto">
          <ManageBus />
        </div>
      </main>
    </div>
  )
}

export default BusInfo