import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import authService from '../../../api/auth/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { AuthStatus } from '../../../slice/authSlice';
import {logout} from '../../../slice/authSlice'

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

  const logoutStatus = useSelector(AuthStatus);
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
        <button className='text-md text-dark-1 bg-dark-3 px-2 py-1 rounded-lg shadow-md font-semibold hover:translate-x-1 hover:bg-dark-4 hover:scale-105 transition-all duration-300 ease-in-out' onClick={handleOpen}>
            Logout
        </button> 
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
