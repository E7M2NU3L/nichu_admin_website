import React from 'react'
import './main.css'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const FooterUtil = () => {
  return (
    <div className='w-full min-h-[40vh] bg-dark-1 flex justify-around items-start pt-[3rem] px-[2rem]'>
      <div>
        <Typography variant='h5' className='text-dark-2 font-bold'>
          Nipix <span className='text-dark-5'>
            Admin
          </span>
        </Typography>
      </div>

      <div>
        <Typography variant='h6' className='text-dark-2 font-semibold pb-[1rem]'>
          Quick Links
        </Typography>

        <ul className='flex flex-col gap-y-[1rem] justify-center items-center text-md'>
          <li className='text-dark-4 hover:text-dark-5'>
            <Link to="/">
              Users
            </Link>
          </li>
          <li className='text-dark-4 hover:text-dark-5'>
            <Link to="/">
              Courses
            </Link>
          </li>
          <li className='text-dark-4 hover:text-dark-5'>
            <Link to="/">
              Webinars
            </Link>
          </li>
          <li className='text-dark-4 hover:text-dark-5'>
            <Link to="/">
              Instructors
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default FooterUtil