import { Button, Typography } from '@mui/material'
import React from 'react'
import CoursePage from '../../assets/images/images (5).png'
import { Link } from 'react-router-dom'
import CourseCard from './CourseCard'

const Courses = () => {
  return (
    <div className='min-h-screen h-full py-[2rem] bg-dark-2'>
      <section className='flex justify-between items-center px-[1rem] max-w-[760px] mx-auto'>
        <Typography variant='h3' style={{
          fontWeight: "700",
          fontFamily: "'lato', sans-serif"
        }}
        className='underline text-dark-1'
        >
          Courses
        </Typography>

        <img src={CoursePage} alt='users-section'  className='w-[10rem] h-[12rem]'/>
      </section>

      <section className='w-full justify-end flex px-[1rem]'>
        <Button variant='contained'>
          <Link to="/admin/course/create-course">
            Create a Course
          </Link>
        </Button>
      </section>

      <section className='w-full flex flex-row justify-around items-center flex-wrap px-[1rem] gap-y-[1rem]'>
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </section>
    </div>
  )
}

export default Courses