import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

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

export default function DeleteCourses() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  const handleDelete = (e) => {
    try {
      console.log("The Course has been Successfully Deleted")
      navigate('/admin/course')
      handleClose();
    } catch (error) {
      console.log(error.message);
      navigate('/')
    }
  }

  return (
    <div>
      <button className='flex bg-red-400 text-dark-1 font-semibold px-4 py-1 rounded-lg hover:bg-red-600 hover:text-white hover:scale-110 
                hover:translate-x-2 transition-all duration-200 ease-in-out' onClick={handleOpen}>
                Delete
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
              Are You Sure You want to Delete the Course?
            </Typography>
            <section className='flex justify-around mt-[1rem] items-center w-full'>
                <button className='bg-green-400 text-dark-1 px-2 py-1 rounded-lg hover:translate-x-1 hover:scale-110 hover:bg-gradient-to-tr hover:from-dark-2 hover:to-dark-4 hover:text-dark-1 transition-all duration-300 ease-in-out' onClick={handleClose}>
                    Cancel
                </button>

                <button className='bg-red-500 text-dark-1 px-2 py-1 rounded-lg hover:translate-x-1 hover:scale-110 hover:bg-gradient-to-tr hover:from-dark-2 hover:to-dark-4 hover:text-dark-1 transition-all duration-300 ease-in-out' onClick={handleDelete}>
                    Delete
                </button>
            </section>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
