import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import authService from '../../api/auth/Auth';
import { useDispatch, useSelector } from 'react-redux';
import {authStatus, logout } from '../../slice/authSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function LogoutModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const logoutStatus = useSelector(authStatus);
  console.log(logoutStatus);

  const dispatch = useDispatch();

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      // response data
        await authService.logout();
        dispatch(
            logout({
                authentication: false,
                userData: null
            })
        )  
        console.log("The Logout has been successfull");
        navigate('/')
        handleClose();
    } catch (error) {
      console.log(error.message);
      handleClose();
    }
  }

  return (
    <div>
      <Button onClick={handleOpen} className='flex justify-between items-center w-full'>
        <Logout className='text-dark-2 me-6 hover:text-dark-3 transition-all duration-300 ease-in-out' />
        <Typography className='text-dark-2 font-semibold capitalize hidden sm:block ps-[1.4rem]'>
            Logout
        </Typography>
    </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style} className="rounded-lg shadow-md shadow-dark-4">
            <Typography id="transition-modal-title" className='font-semibold text-dark-1' variant="h6" component="h2">
              Are You Sure You want to Logout?
            </Typography>
            <section className='flex justify-around mt-[1rem] items-center w-full'>
                <button className='bg-green-400 text-dark-1 px-2 py-1 rounded-lg hover:translate-x-1 hover:scale-110 hover:bg-gradient-to-tr hover:from-dark-2 hover:to-dark-4 hover:text-dark-1 transition-all duration-300 ease-in-out' onClick={handleClose}>
                    Cancel
                </button>
            
                <button className='bg-red-500 text-dark-1 px-2 py-1 rounded-lg hover:translate-x-1 hover:scale-110 hover:bg-gradient-to-tr hover:from-dark-2 hover:to-dark-4 hover:text-dark-1 transition-all duration-300 ease-in-out' onClick={handleLogout}>
                    Logout
                </button>
            </section>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
