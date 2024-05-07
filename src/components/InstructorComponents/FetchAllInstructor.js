import React from 'react'
import InstructorCard from './utils/InstructorCard'

const FetchAllInstructor = () => {
  return (
    <section className='w-full py-[2rem] flex flex-row justify-around items-center pt-[1.3rem] flex-wrap px-[1rem] gap-y-[1rem]'>
        <InstructorCard />
        <InstructorCard />
        <InstructorCard />
        <InstructorCard />
        <InstructorCard />
        <InstructorCard />
      </section>
  )
}

export default FetchAllInstructor