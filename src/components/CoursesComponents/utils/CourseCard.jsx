import React from 'react'
import imagePlace from '../../../assets/images/course.jpg'
import { HotTub } from '@mui/icons-material'
import { Rating, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import DeleteCourses from '../DeleteCourses'

const CourseCard = () => {
  return (
    <div>
        <section className='flex justify-start flex-col items-start w-[300px] min-height-[30rem] bg-dark-1 rounded-lg shadow-md mt-[2rem]'>

        <section className='relative'>
            <img src={imagePlace} alt='placeholder' className='relative opacity-[0.9]' />
            <Typography className='absolute top-2 right-2 bg-slate-800 p-2 text-dark-2'>
                Trending <HotTub />
            </Typography>
        </section>

        <section className='w-full px-2'>
            <section className='flex w-full px-2 justify-between items-center pt-2'>
                <h1 className='text-sm text-gray-400 font-normal'>
                744 learners
                </h1>

                <Rating value={4} variant="fixed" />
            </section>

            <Typography variant='h5' className='text-dark-2 font-bold pt-2'>
                Introduction to Web development
            </Typography>

            <Typography variant='h6' className='w-full flex justify-end mt-0 pe-2 text-dark-2'>
                Instructor. Nishok
            </Typography>

            <Typography variant='p' className='text-dark-4'>
                Welcome to "Introduction to Web Development," a comprehensive course designed for beginners looking to dive into the world of web development.
            </Typography>

            <div className='py-2 justify-between px-3 flex items-center w-full'>
                <Link to="/admin/course/single" >
                <button className='flex bg-dark-4 text-dark-1 font-semibold px-4 py-1 rounded-lg hover:bg-dark-2 hover:scale-110 
                hover:translate-x-2 transition-all duration-200 ease-in-out'>
                View
                </button>
                </Link>
                <DeleteCourses />
            </div>
            </section>
        </section>
    </div>
  )
}

export default CourseCard