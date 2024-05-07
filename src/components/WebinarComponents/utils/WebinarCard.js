import { FunctionsTwoTone, HotTub, Timelapse } from '@mui/icons-material'
import { Divider, Typography } from '@mui/material'
import React from 'react'
import imagePlace from '../../../assets/images/course.jpg'
import { Link } from 'react-router-dom'
import DeleteWebinar from '../DeleteWebinar'

const WebinarCard = () => {
  return (
    <div>
        <section className='flex justify-center items-center flex-col w-[300px] min-height-[30rem] bg-dark-1 rounded-lg shadow-md my-[2rem]'>

        <section className='relative'>
            <img src={imagePlace} alt='placeholder' className='relative opacity-[0.9]' />
            <Typography className='absolute top-2 right-2 bg-slate-800 p-2 text-dark-2'>
                Upcoming <FunctionsTwoTone />
            </Typography>
            <Typography className='absolute top-2 left-2 bg-slate-800 p-2 text-dark-2'>
                3hrs <Timelapse />
            </Typography>
        </section>

        <section className='w-full px-2'>
            <Typography variant='h5' className='text-dark-2 font-bold pt-2'>
                Introduction to Web development
            </Typography>
            <Typography variant='p' className='w-full flex justify-end mt-0 pe-2 text-dark-2'>
                Instructor. Nishok
            </Typography>

            <div className='my-[1rem] w-full flex justify-center'>
                <Divider className='w-1/2 mx-auto bg-dark-5 h-1' />
            </div>

            <Typography variant='p' className='text-dark-4'>
                Welcome to "Introduction to Web Development," a comprehensive course designed for beginners looking to dive into the world of web development.
            </Typography>

            <div className='py-2 justify-between items-center px-3 flex w-full'>
                <Link className='' to="/admin/webinar/edit">
                    <button className='flex bg-dark-4 text-dark-1 font-semibold px-4 py-1 rounded-lg hover:bg-dark-2 hover:scale-110 
                    hover:translate-x-2 transition-all duration-200 ease-in-out'>
                        View
                </button>
                </Link>

                <DeleteWebinar />
            </div>
            </section>
        </section>
    </div>
  )
}

export default WebinarCard