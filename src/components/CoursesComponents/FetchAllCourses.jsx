import React from 'react'
import CourseCard from './utils/CourseCard'

const FetchAllCourses = () => {
  return (
    <div>
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

export default FetchAllCourses