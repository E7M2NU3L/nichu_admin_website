import React from 'react'
import Sidebar from '../../components/Dashboard/Sidebar'
import Profile from '../../components/Dashboard/Profile'
import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AuthStatus } from '../../slice/authSlice'
import authService from '../../api/auth/Auth'

const Dashboard = () => {
    const authstatus = useSelector(AuthStatus);
    const authentication = authstatus.authentication;

    const userData = authService.getCurrentUser();
    const label = userData.labels[0];
    const user_email = userData.email;
    const isEmailVerified = userData.emailVerification;
    const user_name = userData.name;
    const userPhone = userData.phone;

  return (
    <div className='flex justify-between items-center h-full w-full min-h-screen'>
        <section className='bg-dark-1 min-h-screen max-w-[4rem] sm:min-w-[18rem]' style={{
            flex: 2
        }}>
            <Sidebar authentication = {authentication} />
        </section>
        <section className='bg-dark-2 min-h-screen w-full flex-grow' style={{
            flex: 4
        }}>
            <Routes>
                <Route path='/' element={<Profile authentication = {authentication} user_email = {user_email} label = {label} isEmailVerified = {isEmailVerified} user_name = {user_name} userPhone = {userPhone} />} />
            </Routes>
        </section>
    </div>
  )
}

export default Dashboard