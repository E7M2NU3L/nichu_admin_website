import React from 'react'
import PlaceHolder from '../../../assets/images/joker.webp'
import { Divider, Typography } from '@mui/material'
import { Instagram, LinkedIn } from '@mui/icons-material'
import DeleteInstructor from '../DeleteInstructor'
import { Link } from 'react-router-dom'

const InstructorCard = () => {
  return (
    <Link to="/admin/instructors/single">
    <div className='w-[230px] min-h-[25rem] bg-dark-1 shadow-md shadow-dark-4 hover:shadow-lg rounded-lg hover:scale-105 translate-x-1 transition-all duration-200 ease-in-out'>
        <img src={PlaceHolder} alt='placeholder' className='w-full object-fit h-[14rem]' />
        
        <section className='flex flex-col justify-center items-center w-full h-full px-2 text-center'>
            <Typography variant='h6' className='font-semibold text-dark-2'>
                Arthur Fleck
            </Typography>

            <div className='w-[90px] mx-auto flex justify-around itemse-center'>
                <LinkedIn className="text-dark-4" />
                <Instagram className='text-pink-500' />
            </div>

            <section className='mt-1'>
            <Divider className='w-[90px] mx-auto bg-dark-5' />
            </section>

            <Typography variant='body-2' className='font-light text-[12px] pt-1 text-dark-4'>
            Arthur is a thoughtful and insightful individual with a keen sense of observation. He has dark brown hair and warm.
            </Typography>

            <section className='flex w-full justify-around items-center pt-2'>
                <button className='bg-dark-2 text-dark-1 px-2 py-1 rounded-lg hover:translate-x-1 hover:scale-110 hover:bg-gradient-to-tr hover:from-dark-2 hover:to-dark-4 hover:text-dark-1 transition-all duration-300 ease-in-out'>
                    Portfolio
                </button>

                <DeleteInstructor />
            </section>
        </section>
    </div>
    </Link>
  )
}

export default InstructorCard