import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import Loading from './utils/Loading';
import PlaceHolder from '../../assets/images/images (3).png'
import { Link } from 'react-router-dom';
import courseDB from '../../api/db/CoursesDb';
import CourseBucket from '../../api/bucket/CoursesBucket';

const FetchSingleCourses = () => {
    const [courseData, setInstructor] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
  
    const [loading, setLoading] = useState(false);
    const [Image, loadedImage] = useState(null);
  
    // Fetch course data based on the courseId
    const fetchCourseData = async () => {
        try {
            // Get the current URL path from window.location.pathname
            const urlPath = window.location.pathname;
  
            // Split the path into an array of segments using the '/' separator
            const pathSegments = urlPath.split('/');
  
            // The last segment is the last part of the array
            const id = pathSegments[pathSegments.length - 1];
  
            // Output the extracted ID
            console.log('Extracted ID:', id);
            const response = await courseDB.ListCourse(
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
        fetchCourseData();
        console.log(courseData);
    }, []);
  
    const getImage = async () => {
      try {
          const promise = await CourseBucket.GetCourseThumbnail(courseData?.Course_Thumbnail);
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
    }, [courseData])
    // Display loading spinner if data is still being fetched
    if (isLoading) {
        return <Loading />;
    }

    // Render the course details once data is available
    return (
        <div className='flex flex-col justify-center items-center w-full min-h-screen py-[1.4rem] bg-dark-2'>
            <section>
                <img
                    src={PlaceHolder}
                    alt='Course Thumbnail'
                    className='max-w-[50rem] w-screen object-fill h-[30rem]'
                />
            </section>

            <section className='pt-[3rem] px-[3rem] max-w-[50rem]'>
                <section className='items-center justify-between flex w-full'>
                <Typography className='text-dark-1 font-bold pb-3' variant='h3'>
                    Title
                </Typography>

                <Link to="/admin/course/update">
                <button className='text-dark-2 bg-dark-1 hover:bg-gradient-to-tr hover:from-dark-3 hover:to-dark-4 hover:text-dark-1 px-4 py-1 rounded-lg font-semibold hover:t-dark-4 transition-all duration-200 ease-in-out'>
                    Edit
                </button>
                </Link>
                </section>

                <main className='w-full px-2 justify-between items-center flex'>
                    <Typography className='text-md text-dark-1 opacity-80' variant='h6'>
                        Instructor
                    </Typography>

                    <Typography className='text-md text-dark-1 opacity-80' variant='h6'>
                        {new Date(courseData?.date).toLocaleDateString()}
                    </Typography>
                </main>

                <Typography className='font-normal text-dark-1' variant='p'>
                To create a cool loading animation, you can use CSS animations and transitions in your Loading component. Here is an example of a more visually appealing loading spinner using a rotating dot animation:

                  1. Create the Loading Component: The Loading component uses a series of div elements with class names to define the structure of the loader. These classes will later be styled in the CSS file.
                </Typography>

                <section className='flex flex-col justify-center items-center w-full h-full py-[2rem]'>
                <Typography className='text-dark-1 font-semibold' variant='h3'>
                    Intro Video
                </Typography>
{/* 

{courseData?.introVideo && (
                    <video src={courseData.introVideo} controls />
                )}
*/}
                </section>
                
            </section>

            <section className='pb-[2rem]'>
                <Typography className='text-dark-1 font-semibold' variant='h3'>
                    Course Videos
                </Typography>
                <section className='flex justify-around w-full h-full items-center gap-y-[1rem]'>
                    {/*
                    {courseData?.videos?.map((video, index) => (
                        <video key={index} src={video} controls />
                    ))}
                    */}
                </section>
            </section>
        </div>
    );
};

export default FetchSingleCourses;
