import React, { useState } from 'react'
import './main.css'
import Logo from '../../assets/images/images (6).png'
import { Link } from 'react-router-dom'
import DrawerRight from './utils/DrawerRight'
import LogoutModal from './utils/LogoutModal'
import { useSelector } from 'react-redux'
import { AuthStatus } from '../../slice/authSlice'

const NavbarUtil = () => {

  const loginStatus = useSelector(AuthStatus);
  const auth = loginStatus.authentication;

  return (
    <div className='flex justify-between items-center w-full min-h-[10vh] bg-dark-1 px-4'>
      <Link to="/">
      <div className='rounded-full flex justify-center items-center gap-x-[1rem]'>
          <img src={Logo} alt='admin-panel-nipix' className='rounded-full w-12 h-12  hover:translate-x-2 hover:scale-105 transition-all duration-300 ease-in-out' />
          <h1 className='text-xl hidden sm:flex text-dark-2 font-semibold'>
            Nipix <span className='text-dark-5 font-bold'>Admin</span> 
          </h1>
      </div>
      </Link>
      
      <ul className='sm:flex items-center gap-x-[2rem] justify-center hidden'>
        <li className='text-md text-dark-2 font-semibold hover:translate-x-1 hover:scale-105 transition-all duration-300 ease-in-out'>
          <Link className='' to="/admin/users">
            Users
          </Link>
        </li>
        <li className='text-md text-dark-2 font-semibold hover:translate-x-1 hover:scale-105 transition-all duration-300 ease-in-out'>
          <Link className='' to="/admin/course">
            Courses
          </Link>
        </li>
        <li className='text-md text-dark-2 font-semibold hover:translate-x-1 hover:scale-105 transition-all duration-300 ease-in-out'>
          <Link className='' to="/admin/webinars">
            Webinars
          </Link>
        </li>
        <li className='text-md text-dark-2 font-semibold hover:translate-x-1 hover:scale-105 transition-all duration-300 ease-in-out'>
          <Link className='' to="/admin/instructor">
            Instructors
          </Link>
        </li>
      </ul>

      
    <div className='rounded-lg sm:flex justify-around items-center gap-x-[1rem] hidden '>
       <>
        {(auth) ? (
          <React.Fragment>
            <LogoutModal />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <button className='text-md text-dark-1 bg-dark-3 px-2 py-1 rounded-lg shadow-md font-semibold hover:translate-x-1 hover:bg-dark-4 hover:scale-105 transition-all duration-300 ease-in-out'>
              <Link to="/admin/auth/login">
                Login
              </Link>
            </button> 
          </React.Fragment>
        )}
       </>

      <h1 className='text-md text-dark-4 font-bold hover:text-dark-4 hover:translate-x-1 hover:scale-105 transition-all duration-300 ease-in-out'>
        <Link to="/admin/dashboard">
          Dashboard
        </Link>
      </h1>
    </div>

    <div className='sm:hidden block'>
      <DrawerRight />
    </div>

    </div>
  )
}

export default NavbarUtil