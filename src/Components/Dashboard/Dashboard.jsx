import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
const Dashboard = () => {
  return (
    <div className='w-full flex h-screen'>
      <div className='w-1/5'>
        <Sidebar></Sidebar>
      </div>
      <div className='w-4/5 bg-black'>

      </div>
    </div>
  )
}

export default Dashboard