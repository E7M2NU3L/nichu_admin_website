import React from 'react'
import HeroImg from '../../assets/images/images (3).png'
import { Button } from '@mui/material'
import HeroImg1 from '../../assets/images/images (1).png'
import HeroImg2 from '../../assets/images/images (2).png'
import { Link } from 'react-router-dom'


const HEro = () => {
  return (
    <main className='relative'>
        <div className='relative z-10 min-h-screen bg-dark-2 flex justify-around gap-y-[4rem] items-center h-full   w-full flex-col sm:flex-row'>
        
            <div className='max-w-[40vh] gap-y-[1rem] flex justify-center align-center flex-col z-50'>
                <h1 className='text-3xl font-bold text-dark-1'>
                    Nipix <span className='text-dark-5'>
                    Admin Panel
                    </span>
                </h1>
                <h2 className='text-xl text-dark-1 pt-3'>
                    Admin Dashboards and Website Management For Nipix Tech Platform
                </h2>
                <Button className="bt-3 bg-dark-1 text-dark-3 hover:text-dark-1 transition-colors duration-200 ease-in-out" variant='contained'>
                    <Link to="/admin/dashboard">
                        Get Started
                    </Link>
                </Button>
            </div>

            <div className="max-w-[35vh] sm:max-w-[40vh]  max-h-[40vh] flex relative">
                <img src={HeroImg} alt='hero-logo' className='relative rounded-full shadow-md shadow-blue-400' />
                <img src={HeroImg1} alt='supporter-1' className='absolute bottom-[-10px] right-[-40px] w-[7rem] h-[7rem]' />
                <img src={HeroImg2} alt='supporter-2' className='absolute top-[-20px] left-[-40px] w-[7rem] h-[7rem]' />
            </div>
        </div>
    </main>
  )
}

export default HEro