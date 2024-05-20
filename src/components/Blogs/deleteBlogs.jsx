import { DeleteForever } from '@mui/icons-material';
import { Box, Fade, Modal, Typography } from '@mui/material';
import React from 'react'
import blogs_db from '../../api/db/Blog';
import Backdrop from '@mui/material/Backdrop';
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

const Delete = ( { fileId} ) => {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const promise = await blogs_db.DeleteBlog(fileId);
            if (promise) {
                console.log(promise);
            }
            else {
                console.log("No response");
            }
            navigate('/admin/blogs/fetch-all-blogs')
        } catch (error) {
            console.log(error.message);
            return false;
        }
    }

  return (
    <div>
       <button onClick={handleOpen} className='bg-red-400 px-6 py-2 text-white font-semibold rounded-md hover:shadow-md hover:translate-x-1 hover:scale-105 transition-all duration-300 ease-in-out'>
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
              Are You Sure You want to Delete?
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
  )
}

export default Delete