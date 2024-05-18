import { FunctionsTwoTone, Timelapse } from '@mui/icons-material'
import { Divider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DeleteWebinar from './DeleteWebinar'
import { formatDistance } from 'date-fns';
import DisplayAPI from './utils/DisplayAPI'

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


const FetchAllWebinar = ({content}) => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [content])
  return (
    <>
      {(loading !== true && content !== null) ?  (
        <React.Fragment>
          <section className='w-full py-[2rem] flex flex-row justify-around items-center flex-wrap px-[1rem] gap-y-[1rem]'>
            <div>
              {content.map((context) => (
              <section className='flex justify-center items-center flex-col w-[300px] min-height-[30rem] bg-dark-1 rounded-lg shadow-md my-[2rem]' key={context.$id}>

                <section className='relative'>
                    <img src={content.Webinar_Thumbnail} alt='placeholder' className='relative opacity-[0.9]' />
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
                    <Typography variant='p' className='w-full flex justify-end mt-0 pe-2 text-dark-2'>
                        Instructor. {context.instructors ? context.instructors : "Unknown"}
                    </Typography>

                    <div className='my-[1rem] w-full flex justify-center'>
                        <Divider className='w-1/2 mx-auto bg-dark-5 h-1' />
                    </div>

                    <Typography variant='p' className='text-dark-4'>
                        <DisplayAPI context ={context.Webinar_Description} />
                    </Typography>

                    <div className='py-2 justify-between items-center px-3 flex w-full'>
                        <Link className='' to={`/admin/webinar/edit/${context.$id}`}>
                            <button className='flex bg-dark-4 text-dark-1 font-semibold px-4 py-1 rounded-lg hover:bg-dark-2 hover:scale-110 
                            hover:translate-x-2 transition-all duration-200 ease-in-out'>
                                View
                        </button>
                        </Link>

                        <DeleteWebinar id = {context.$id} />
                    </div>
                    </section>
                  </section>
                  ))}
            </div>
          </section>
        </React.Fragment>
      ) : (
        <React.Fragment>

        </React.Fragment>
      )}
    </>
  )
}

export default FetchAllWebinar