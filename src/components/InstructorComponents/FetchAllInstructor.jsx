import React from 'react'
import InstructorCard from './utils/InstructorCard'

const FetchAllInstructor = ({content}) => {
  return (
    <section className='w-full py-[2rem] flex flex-row justify-around items-center pt-[1.3rem] flex-wrap px-[1rem] gap-y-[1rem]'>
      {content.map((instructors, index) => (
          <React.Fragment>
            <InstructorCard instructor = {instructors} key={index}  />
          </React.Fragment>
      ))}
        
      </section>
  )
}

export default FetchAllInstructor