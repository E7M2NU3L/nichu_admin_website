import { Typography } from '@mui/material'
import React from 'react'
import CoursePage from '../../assets/images/images (5).png'

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

      <section>
        
      </section>
    </div>
  )
}

export default Webinars