import React, { useEffect, useState } from 'react'
import PlaceHolder from '../../../assets/images/joker.webp'
import { Divider, Typography } from '@mui/material'
import { Instagram, LinkedIn } from '@mui/icons-material'
import DeleteInstructor from '../DeleteInstructor'
import { Link } from 'react-router-dom'
import InstructorService from '../../../api/bucket/InstructorBucket'
import Loading from '../../WebinarComponents/utils/Loading'

const InstructorCard = ({instructor}) => {
    const [loading, setLoading] = useState(false);
    const [Image, loadedImage] = useState(null);

    const getImage = async () => {
        try {
            const promise = await InstructorService.GetInstructorImage(instructor.Instructor_Photo);
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
              console.log(response.$id);
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
      }, [])

    useEffect(() => {}, []);
  
    return (
    <div className='w-[230px] min-h-[25rem] bg-dark-1 shadow-md shadow-dark-4 hover:shadow-lg rounded-lg hover:scale-105 translate-x-1 transition-all duration-200 ease-in-out'>
        <React.Fragment>
            {(loading === false && Image !== null) ?  (
                <>
                <img src={PlaceHolder} alt='placeholder' className='w-full object-fit h-[14rem]' />
                </>
            ): (
                <>
                    <section className='flex justify-center items-center h-full mt-[4rem]'>
                        <Loading />
                    </section>
                </>
            )}
        </React.Fragment>
        
        <section className='flex flex-col justify-center items-center w-full h-full px-2 text-center'>
            <Typography variant='h6' className='font-semibold text-dark-2'>
                {instructor.Instructor_Name}
            </Typography>

            <div className='w-[90px] mx-auto flex justify-around itemse-center'>
                <a href={instructor.Instructor_IG}>
                <Instagram className='text-pink-500' />
                </a>

                <a href={instructor.Instructor_Linked_in} >
                <LinkedIn className="text-dark-4" />
                </a>
            </div>

            <section className='mt-1'>
            <Divider className='w-[90px] mx-auto bg-dark-5' />
            </section>

            <Typography variant='body-2' className='font-light text-[12px] pt-1 text-dark-4'>
            {instructor.Instructor_Description}
            </Typography>

            <section className='flex w-full justify-around items-center pt-2'>
                <button className='bg-dark-2 text-dark-1 px-2 py-1 rounded-lg hover:translate-x-1 hover:scale-110 hover:bg-gradient-to-tr hover:from-dark-2 hover:to-dark-4 hover:text-dark-1 transition-all duration-300 ease-in-out'>
                <Link to={`/admin/instructors/single/${instructor.$id}`}>
                    View
                </Link>
                </button>

                <DeleteInstructor slug={instructor.$id}/>
            </section>
        </section>
    </div>
  )
}

export default InstructorCard