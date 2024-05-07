import { Button, Typography } from '@mui/material'
import React from 'react'
import CoursePage from '../../assets/images/images (5).png'
import { Link } from 'react-router-dom'
import FetchAllWebinar from '../../components/WebinarComponents/FetchAllWebinar'

const Webinars = () => {
  return (
    <div className='min-h-screen bg-dark-2'>
      <section className='flex justify-between items-center px-[1rem] max-w-[760px] mx-auto'>
        <Typography variant='h3' style={{
          fontWeight: "700",
          fontFamily: "'lato', sans-serif"
        }}
        className='underline text-dark-1'
        >
          Webinars
        </Typography>

        <img src={CoursePage} alt='users-section'  className='w-[10rem] h-[12rem]'/>
      </section>

      <section className='w-full justify-end flex px-[1rem]'>
        <Button variant='contained'>
          <Link to="/admin/webinars/create-webinars">
            Create a Webinar
          </Link>
        </Button>
      </section>

      <FetchAllWebinar />

    </div>
  )
}

export default Webinars