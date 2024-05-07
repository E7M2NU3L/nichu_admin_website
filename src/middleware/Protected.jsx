import React from 'react'
import { useSelector } from 'react-redux'
import { AuthStatus } from '../slice/authSlice'
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import { Home } from '@mui/icons-material';

const Protected = ({children}) => {

  const userAuthStatus = useSelector(AuthStatus);
  const authentication = userAuthStatus.authentication;

  const renderParent = (authentication) => {
    if(authentication) {
      return children
    }
    else {
      return (
        <React.Fragment>
                <main className='min-h-screen h-full py-[2rem] bg-dark-2 flex justify-center flex-col items-center'>
                <section className='w-[300px] h-[15rem] flex justify-center items-center flex-col gap-y-[2rem] bg-dark-1 rounded-lg shadow-md mt-[2rem]'>
                    <Typography variant='h5' component="div" className='text-dark-2'>
                        You are not Logged in
                    </Typography>

                    <button className='bg-red-400 hover:bg-dark-4 text-dark-1 rounded-lg shadow-md px-3 py-1 hover:translate-x-2 hover:scale-110 transition-all duration-200 ease-in-out'>
                        <Link to="/admin/auth/login" className='flex w-full justify-around items-center'>
                            <Home />Login
                        </Link>
                    </button>
                </section>
                </main>
            </React.Fragment>
      )
    }
  }

  return (
    <div>
        {renderParent(authentication)}
    </div>
  )
}

export default Protected