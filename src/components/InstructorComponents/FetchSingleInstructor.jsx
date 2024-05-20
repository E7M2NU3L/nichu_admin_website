import React, { useEffect, useState } from 'react'
import PlaceHolder from '../../assets/images/joker.webp'
import { Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import instructorDB from '../../api/db/InstructorsDb'
import Loading from '../WebinarComponents/utils/Loading'
import InstructorService from '../../api/bucket/InstructorBucket'

const FetchSingleInstructor = () => {

  const [InstruuctorData, setInstructor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [loading, setLoading] = useState(false);
  const [Image, loadedImage] = useState(null);

  // Fetch course data based on the courseId
  const fetchWebinarData = async () => {
      try {
          // Get the current URL path from window.location.pathname
          const urlPath = window.location.pathname;

          // Split the path into an array of segments using the '/' separator
          const pathSegments = urlPath.split('/');

          // The last segment is the last part of the array
          const id = pathSegments[pathSegments.length - 1];

          // Output the extracted ID
          console.log('Extracted ID:', id);
          const response = await instructorDB.FetchSingleInstructor(
              id
          );
          console.log(response);
          setInstructor(response);
      } catch (error) {
          console.error('Failed to fetch course data:', error);
      } finally {
          setIsLoading(false);
      }
  };

  // Use effect to fetch course data when component mounts
  useEffect(() => {
      fetchWebinarData();
      console.log(InstruuctorData);
  }, []);

  const getImage = async () => {
    try {
        const promise = await InstructorService.GetInstructorImage(InstruuctorData?.Instructor_Photo);
        console.log(promise);
        return promise;
    } catch (error) {
        console.log("Error Occured: "+ error.message);
        setLoading(false);
    }
}

useEffect(() => {
    const loadImage = async () => {
      try {
        const response = await getImage();
        if (response) {
          console.log(response);
          loadedImage(response);
          setLoading(false);
        }
      } catch (error) {
        console.log('Error occurred: ' + error.message);
        setLoading(true);
      }
    };

    // Call the async function
    loadImage();
  }, [InstruuctorData])



  return (
    <>
      {(isLoading === false && InstruuctorData !== null) ? (
        <React.Fragment>
          <div className='flex justify-around items-center min-h-screen w-full bg-dark-2'>
      
      <div className='max-w-[40vh] flex flex-col justify-center items-center gap-y-[1rem]'>
      <section className='flex justify-between items-center w-full px-2'>
        <Typography variant='h6' className='text-dark-1 font-semibold'>Profile</Typography>
        
        <Link to={`/admin/instructor/update/${InstruuctorData.$id}`}>
        <button className=' bg-dark-1 text-dark-2 px-3 py-1 rounded-lg font-bold hover:bg-gradient-to-tr hover:from-dark-3 hover:to-dark-4 hover:text-dark-2 hover:scale-110 hover:translate-x-2 transition-all duration-300 ease-in-out'>
          Edit
        </button>
        </Link>
      </section>
      <React.Fragment>
        {(loading === false && Image !== null) ? (
          <>
            <img src={Image} alt='joker' />
          </>
        ) : (
          <>
            <main className='w-[400px] h-[500px] flex justify-center items-center'>
              <loading />
            </main>
          </>
        )}
      </React.Fragment>
      </div>

      <div className='max-w-[40vh] sm:max-w-[60vh]'>
        <Typography variant='h4' className='text-dark-1 font-semibold'>
          {InstruuctorData.Instructor_Name}
        </Typography>

        <br />

        <Typography variant='body-2' className='text-md font-normal text-dark-1 mt-[1rem]'>
        {InstruuctorData.Instructor_Description}
        </Typography>

        <div className='flex flex-col gap-[1rem] pt-[1.2rem]'>
          <Typography className='text-dark-1'>
            {InstruuctorData.Instructor_IG}
          </Typography>
          <Typography className='text-dark-1'>
            {InstruuctorData.Instructor_Linked_in}
          </Typography>
        </div>

        <section className='pt-3 flex justify-between items-center w-full px-3'>
          <Typography variant='h6'>
            Portfolio URL
          </Typography>

          <Button variant='contained'>
            <a href={InstruuctorData.
Instructor_Portfolio}>
            Visit
            </a>
          </Button>
        </section>
        </div>

        </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className='flex justify-around items-center min-h-screen w-full bg-dark-2'>
            <Loading />
          </div>
        </React.Fragment>
      )}
    </>
  )
}

export default FetchSingleInstructor