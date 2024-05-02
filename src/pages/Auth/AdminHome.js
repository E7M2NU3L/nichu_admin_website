import { Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect } from 'react';
import UsersLogo from '../../assets/images/images (4).png';
import AdminUsers from '../../components/AuthComponents/AdminUsers';

const AdminHome = () => {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    const handleResize = () => {
      // Here you could handle any other tasks based on screen size if necessary
    };

    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='min-h-screen bg-dark-2'>
      <section className='flex justify-between items-center px-[1rem] max-w-[760px] mx-auto'>
        <Typography
          variant='h3'
          style={{ fontWeight: 700, fontFamily: "'Lato', sans-serif" }}
          className='underline text-dark-1'
        >
          Users
        </Typography>
        <img src={UsersLogo} alt='users-section' className='w-[10rem] h-[12rem]' />
      </section>
      
      {isMediumScreen ? (
        <section>
          <AdminUsers />
        </section>
      ) : (
        <Typography style={{ padding: '1rem', textAlign: 'center' }}>
          Try switching to desktop mode
        </Typography>
      )}
    </div>
  );
};

export default AdminHome;
