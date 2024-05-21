import { FunctionsTwoTone, Timelapse } from '@mui/icons-material';
import { Divider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DeleteWebinar from './DeleteWebinar';
import { formatDistance } from 'date-fns';
import DisplayAPI from './utils/DisplayAPI';
import webinarBucket from '../../api/bucket/WebinarsBucket';
import Loading from './utils/Loading';

const FormattedDate = (isoDate) => {
    try {
        const date = new Date(isoDate);
        if (isNaN(date.getTime())) {
            throw new Error('Invalid date format');
        }
        return formatDistance(date, new Date(), { addSuffix: true });
    } catch (error) {
        console.error(error.message);
        return <span>Invalid date</span>;
    }
};

const FetchAllWebinar = ({ content }) => {
    const [images, setImages] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            const imagePromises = content.map(async (context) => {
                const imageUrl = await webinarBucket.GetImage(context.Webinar_Thumbnail);
                return { id: context.$id, url: imageUrl };
            });

            const imageResults = await Promise.all(imagePromises);
            const imageMap = imageResults.reduce((acc, curr) => {
                acc[curr.id] = curr.url;
                return acc;
            }, {});

            setImages(imageMap);
            setLoading(false);
        };

        if (content && content.length > 0) {
            fetchImages();
        }
    }, [content]);

    return (
        <>
            {!loading && content ? (
                <React.Fragment>
                    <section className='w-full py-[2rem] flex flex-row justify-around items-center flex-wrap px-[1rem] gap-y-[1rem]'>
                        {content.map((context) => (
                            <section className='flex justify-center items-center flex-col w-[300px] min-height-[30rem] bg-dark-1 rounded-lg shadow-md my-[2rem]' key={context.$id}>
                                <section className='relative'>
                                    {images[context.$id] ? (
                                        <img src={images[context.$id]} alt='Webinar Thumbnail' className='relative opacity-[0.9]' />
                                    ) : (
                                        <main className='w-full h-full flex justify-center items-center'>
                                            <Loading />
                                        </main>
                                    )}
                                    <Typography className='absolute top-2 right-2 bg-slate-800 p-2 text-dark-2'>
                                        {FormattedDate(context.Webinar_Date)} <FunctionsTwoTone />
                                    </Typography>
                                    <Typography className='absolute top-2 left-2 bg-slate-800 p-2 text-dark-2'>
                                        {context.Duration} <Timelapse />
                                    </Typography>
                                </section>
                                <section className='w-full px-2'>
                                    <Typography variant='h5' className='text-dark-2 font-bold pt-2'>
                                        {context.Webinar_Name}
                                    </Typography>
                                    <Typography variant='body1' className='w-full flex justify-end mt-0 pe-2 text-dark-2'>
                                        Instructor. {context.instructors ? context.instructors : "Unknown"}
                                    </Typography>
                                    <div className='my-[1rem] w-full flex justify-center'>
                                        <Divider className='w-1/2 mx-auto bg-dark-5 h-1' />
                                    </div>
                                    <Typography variant='body1' className='text-dark-4'>
                                        <DisplayAPI context={context.Webinar_Description} />
                                    </Typography>
                                    <div className='py-2 justify-between items-center px-3 flex w-full'>
                                        <Link to={`/admin/webinar/edit/${context.$id}`}>
                                            <button className='flex bg-dark-4 text-dark-1 font-semibold px-4 py-1 rounded-lg hover:bg-dark-2 hover:scale-110 hover:translate-x-2 transition-all duration-200 ease-in-out'>
                                                View
                                            </button>
                                        </Link>
                                        <DeleteWebinar id={context.$id} />
                                    </div>
                                </section>
                            </section>
                        ))}
                    </section>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <div className='flex flex-col justify-center items-center w-full min-h-screen py-[1.4rem] bg-dark-2'>
                        <Loading />
                    </div>
                </React.Fragment>
            )}
        </>
    );
};

export default FetchAllWebinar;
