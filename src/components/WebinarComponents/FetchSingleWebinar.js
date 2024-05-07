import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import axios from 'axios'; // Import axios or any other 
import Loading from './utils/Loading';
import PlaceHolder from '../../assets/images/images (3).png'
import { Link } from 'react-router-dom';

const FetchSingleWebinar = () => {
    const [courseData, setCourseData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch course data based on the courseId
    const fetchCourseData = async () => {
        try {
            // Replace the URL with your API endpoint for fetching course data
            // const response = await axios.get(`http://api.example.com/courses/${courseId}`);
            const response = {
              data : 'success'
            }
            setCourseData(response.data);
        } catch (error) {
            console.error('Failed to fetch course data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Use effect to fetch course data when component mounts
    useEffect(() => {
        fetchCourseData();
    }, []);

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

                <Link to="/admin/webinar/update">
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

                <Typography variant='h5' className='text-dark-1 font-normal'>
                  Link to Join
                </Typography>
            </section>
        </div>
    );
};

export default FetchSingleWebinar;
