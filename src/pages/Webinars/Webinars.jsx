import { Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CoursePage from '../../assets/images/images (5).png'
import { Link } from 'react-router-dom'
import FetchAllWebinar from '../../components/WebinarComponents/FetchAllWebinar'
import webinarDB from '../../api/db/WebinarsDb'
import Loading from '../../components/WebinarComponents/utils/Loading'

const Webinars = () => {

  const [loading, setLoading] = useState(true);
  const [webinars, setWebinars] = useState(null);

  const fetchAllWebinars = async () => {
    try {
      const response = await webinarDB.FetchAllWebinars();
      return response;
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
          setWebinars(response.documents);
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
      {(loading !== true && webinars !== null)?  (
        <React.Fragment>
          <div className='min-h-screen bg-dark-2'>
            <section className='flex justify-between items-center px-[1rem] max-w-[760px] mx-auto'>
              <Typography style={{
                fontWeight: "700",
                fontFamily: "'lato', sans-serif"
              }}
              className='underline text-dark-1 text-2xl sm:text-4xl'
              >
                Webinars
              </Typography>

              <img src={CoursePage} alt='users-section'  className='w-[8rem] h-[10rem] sm:h-[12rem] sm:w-[10rem]'/>
            </section>

            <section className='w-full justify-end flex px-[1rem]'>
              <Button variant='contained'>
                <Link to="/admin/webinars/create-webinars">
                  Create a Webinar
                </Link>
              </Button>
            </section>

            <FetchAllWebinar content={webinars} />
          </div>
        </React.Fragment>
      ) :(
        <React.Fragment>
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

            <section className='flex justify-center items-center h-full mt-[4rem]'>
              <Loading />
            </section>
          </div>
        </React.Fragment>
      )}
    </>
  )
}

export default Webinars