import React from 'react'
import PlaceHolder from '../../assets/images/joker.webp'
import { Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const FetchSingleInstructor = () => {
  return (
    <div className='flex justify-around items-center min-h-screen w-full bg-dark-2'>
      
      <div className='max-w-[40vh] flex flex-col justify-center items-center gap-y-[1rem]'>
      <section className='flex justify-between items-center w-full px-2'>
        <Typography variant='h6' className='text-dark-1 font-semibold'>Profile</Typography>
        
        <Link to="/admin/instructor/update">
        <button className=' bg-dark-1 text-dark-2 px-3 py-1 rounded-lg font-bold hover:bg-gradient-to-tr hover:from-dark-3 hover:to-dark-4 hover:text-dark-2 hover:scale-110 hover:translate-x-2 transition-all duration-300 ease-in-out'>
          Edit
        </button>
        </Link>
      </section>
<img src={PlaceHolder} alt='joker' />
      </div>

      <div className='max-w-[40vh]'>
        <Typography variant='h4' className='text-dark-1 font-semibold'>
          Instructor Name
        </Typography>

        <br />

        <Typography variant='body-2' className='text-md font-normal text-dark-1 mt-[1rem]'>
        Michael is a seasoned professional in the field of web development with over a decade of experience in the industry. His journey began with a passion for coding and technology, which led him to earn a degree in Computer Science. Since then, he has worked on numerous high-profile projects.
        </Typography>

        <div className='flex flex-col gap-[1rem] pt-[1.2rem]'>
<Typography className='text-dark-1'>
  IG URL
</Typography>
<Typography className='text-dark-1'>
  LinkedI URL
</Typography>
        </div>

        <section className='pt-3 flex justify-between items-center w-full px-3'>
          <Typography variant='h6'>
Portfolio URL
          </Typography>

          <Button variant='contained'>
Visit
          </Button>
        </section>
      </div>

    </div>
  )
}

export default FetchSingleInstructor