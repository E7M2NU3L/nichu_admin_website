import React from 'react'
import { useSnapshot } from 'valtio'
import store from './store';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Home } from '@mui/icons-material';

const IsAdmin = ({children}) => {
    
    // creating a state management object
    const snap = useSnapshot(store);
  return (
    <>
        {(snap.isAdmin === true) ? (
            <React.Fragment>
                {children}
            </React.Fragment>
        ) : (
            <React.Fragment>
                <main className='min-h-screen h-full py-[2rem] bg-dark-2 flex justify-center flex-col items-center'>
                <section className='w-[300px] min-height-[30rem] bg-dark-1 rounded-lg shadow-md mt-[2rem]'>
                    <Typography variant='h5' component="div" className='text-dark-2'>
                        You are not an Admin
                    </Typography>

                    <Button className='bg-red-400 hover:bg-dark-4 text-dark-1 rounded-lg shadow-md px-3 py-1 hover:translate-x-2 hover:scale-110 transition-all duration-200 ease-in-out'>
                        <Link to="/" className='flex w-full justify-around items-center'>
                            <Home />Back to Home
                        </Link>
                    </Button>
                </section>
                </main>
            </React.Fragment>
        )}
    </>
  )
}

export default IsAdmin