import { Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CoursePage from '../../assets/images/images (5).png'
import { Link } from 'react-router-dom'
import FetchAllInstructor from '../../components/InstructorComponents/FetchAllInstructor'
import instructorDB from '../../api/db/InstructorsDb'
import Loading from '../../components/WebinarComponents/utils/Loading'

const Instructors = () => {

  const [loading, setLoading] = useState(true);
  const [Instructors, setInstructors] = useState(null);

  const fetchAllWebinars = async () => {
    try {
      const res = await instructorDB.FetchAllInstructors();
      console.log(res);
      return res;
    } catch (error) {
      console.log("Error Occured: "+error.message);
    }
  }

  useEffect(() => {
    const loadWebinars = async () => {
      try {
        const response = await fetchAllWebinars();
        if (response) {
          console.log(response.documents);
          setInstructors(response.documents);
          setLoading(false);
        }
      } catch (error) {
        console.log('Error occurred: ' + error.message);
        setLoading(true);
      }
    };

    // Call the async function
    loadWebinars();
  }, [])

  return (
    <>
      {(loading !== true && Instructors !== null) ?  (
        <React.Fragment>
          <div className='min-h-screen bg-dark-2'>
            <section className='flex justify-between items-center px-[1rem] max-w-[760px] mx-auto'>
              <Typography variant='h3' style={{
                fontWeight: "700",
                fontFamily: "'lato', sans-serif"
              }}
              className='underline text-dark-1'
              >
                Instructors
              </Typography>

              <img src={CoursePage} alt='users-section'  className='w-[10rem] h-[12rem]'/>
            </section>

            <section className='w-full justify-end flex px-[1rem]'>
              <Button variant='contained'>
                <Link to="/admin/instructor/create-instructor">
                  Enroll Instructors
                </Link>
              </Button>
            </section>
            
            <FetchAllInstructor content={Instructors} />
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
            <div className='min-h-screen bg-dark-2'>
            <section className='flex justify-between items-center px-[1rem] max-w-[760px] mx-auto'>
              <Typography variant='h3' style={{
                fontWeight: "700",
                fontFamily: "'lato', sans-serif"
              }}
              className='underline text-dark-1'
              >
                Instructors
              </Typography>

              <img src={CoursePage} alt='users-section'  className='w-[10rem] h-[12rem]'/>
            </section>

            <section className='w-full justify-end flex px-[1rem]'>
              <Button variant='contained'>
                <Link to="/admin/instructor/create-instructor">
                  Enroll Instructors
                </Link>
              </Button>
            </section>
             

            <section className='flex justify-center items-center h-full mt-[4rem]'>
              <Loading />
            </section>
            </div>
        </React.Fragment>
      )}
    </>
  )
}

export default Instructors