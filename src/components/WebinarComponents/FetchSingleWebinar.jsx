import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import Loading from './utils/Loading';
import { Link } from 'react-router-dom';
import webinarDB from '../../api/db/WebinarsDb';
import { formatDistance } from 'date-fns';

const FormattedDate = ( isoDate ) => {
    try {
        // Convert the ISO date string to a Date object
        const date = new Date(isoDate);
        
        // Check if the date is valid
        if (isNaN(date.getTime())) {
            throw new Error('Invalid date format');
        }

        // Format the date relative to the current date
        const formattedDate = formatDistance(date, new Date(), { addSuffix: true });
        return formattedDate;
    } catch (error) {
        console.error(error.message);
        return <span>Invalid date</span>;
    }
};

const FetchSingleWebinar = ( ) => {
    const [webinarData, setWebinarData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

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
            const response = await webinarDB.FetchSingleWebinars(
                id
            );
            console.log(response);
            setWebinarData(response);
        } catch (error) {
            console.error('Failed to fetch course data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Use effect to fetch course data when component mounts
    useEffect(() => {
        fetchWebinarData();
        console.log(webinarData);
    }, []);

    // Render the course details once data is available
    return (
        <>
            {(isLoading !== true && webinarData !== null) ? (
                <React.Fragment>
                    <div className='flex flex-col justify-center items-center w-full min-h-screen py-[1.4rem] bg-dark-2'>
                        <section>
                            <img
                                src={webinarData.Webinar_Thumbnail}
                                alt='Course Thumbnail'
                                className='max-w-[50rem] w-screen object-fill h-[30rem]'
                            />
                        </section>

                        <section className='pt-[3rem] px-[3rem] max-w-[50rem]'>
                            <section className='items-center justify-between flex w-full'>
                            <Typography className='text-dark-1 font-bold pb-3' variant='h3'>
                                {webinarData.Webinar_Name}
                            </Typography>

                            <Link to={`/admin/webinar/update/${webinarData.$id}`}>
                            <button className='text-dark-2 bg-dark-1 hover:bg-gradient-to-tr hover:from-dark-3 hover:to-dark-4 hover:text-dark-1 px-4 py-1 rounded-lg font-semibold hover:t-dark-4 transition-all duration-200 ease-in-out'>
                                Edit
                            </button>
                            </Link>
                            </section>

                            <main className='w-full px-2 justify-between items-center flex'>
                                <Typography className='text-md text-dark-1 opacity-80' variant='h6'>
                                    {webinarData.instructors}
                                </Typography>

                                <Typography className='text-md text-dark-1 opacity-80' variant='h6'>
                                    {FormattedDate(webinarData.Webinar_Date)}
                                </Typography>
                            </main>

                            <main>
                            <Typography className='text-md text-dark-1 opacity-80' variant='p'>
                                    {webinarData.Duration}
                                </Typography>
                            </main>

                            <Typography className='font-normal text-dark-1' variant='p'>
                            {webinarData.Webinar_Description}
                            </Typography>

                            <Typography variant='h5' className='text-dark-2 px-3 py-1 rounded-lg shadow-md shadow-dark-4 font-normal bg-dark-1'>
                                <a href={webinarData.Webinar_URL}>
                                    Link to Join
                                </a>
                            </Typography>
                        </section>
                    </div>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <div className='flex flex-col justify-center items-center w-full min-h-screen py-[1.4rem] bg-dark-2'>
                        <section className='flex justify-center items-center h-full mt-[4rem]'>
                            <Loading />
                        </section>
                    </div>
                </React.Fragment>
            )}
        </>
    );
};

export default FetchSingleWebinar;
