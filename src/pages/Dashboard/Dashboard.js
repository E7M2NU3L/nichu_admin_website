import React from 'react'
import Sidebar from '../../components/Dashboard/Sidebar'
import Profile from '../../components/Dashboard/Profile'
import { Route, Routes } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className='flex justify-between items-center h-full w-full min-h-screen'>
        <section className='bg-dark-1 min-h-screen max-w-[4rem] sm:min-w-[18rem]' style={{
            flex: 2
        }}>
            <Sidebar />
        </section>
        <section className='bg-dark-2 min-h-screen w-full flex-grow' style={{
            flex: 4
        }}>
            <Routes>
                <Route path='/' element={<Profile />} />
            </Routes>
        </section>
    </div>
  )
}

export default Dashboard