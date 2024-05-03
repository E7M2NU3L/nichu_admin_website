import React, { useState } from 'react'
import ProfilePlace from '../../assets/images/profile.png'
import { Button, Input, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Block, Edit, EditAttributes, Update, UpdateSharp } from '@mui/icons-material'

const Profile = () => {
    const [EditMode, setEditMode] = useState(false);
    const handleEditMode = (e) => {
        e.preventDefault();
        try {
            setEditMode(true);
        } catch (error) {
            console.log()
        }
    }

    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        try {
            console.log("Logout was successfull");
            navigate('/')
        } catch (error) {
            console.log(error.message);
            navigate('/admin/auth/login');
        }
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        try {
            console.log("Logout was successfull");
            navigate('/admin/dashboard')
            setEditMode(false);
        } catch (error) {
            console.log(error.message);
            navigate('/');
        }
    }

    const [Email, setEmail] = useState('');
    const handleEmail = (e) => setEmail(e.target.value);
    
    const [userName, setuserName] = useState('');
    const handleUsername = (e) => setuserName(e.target.value); 

  return (
    <main className='flex min-h-[90vh] justify-center items-center'>
        <div className='max-w-[20rem] min-w-[18rem] min-h-[25rem] h-full py-[1rem] flex flex-col justify-center items-center glass-effect'>
            <>
                {EditMode ? (
                    <React.Fragment>
                        <section>
                            <Button className='relative'>
                                <img src={ProfilePlace} alt='placeholder' className='h-[10rem] w-[8rem] rounded-full mt-[1rem] mb-[3px] relative object-contain' />

                                <div cclassName='absolute inset-0'>
                                    <EditAttributes />
                                    <Typography>
                                        Edit Profile
                                    </Typography>
                                </div>
                            </Button>
                        </section>

                        <section className='gap-y-[1rem]'>
                            <Input className='font-bold text-dark-1 items-start  ms-[1rem]' placeholder='John Doe' value={userName} onClick={handleUsername} variant="outlined" />

                            <main className='my-[2rem] gap-y-[1rem] flex flex-col'>
                                <section className='px-2 flex justify-between items-center gap-x-[2rem] text-dark-1'>
                                    <Typography>
                                        Email
                                    </Typography>

                                    <Input className='text-dark-1' placeholder='johnDoe@gmail.com' value={Email} onClick={handleEmail} />
                                </section>

                                <section className='px-2 flex justify-between items-center gap-x-[2rem]'>
                                    <Typography>
                                        Status
                                    </Typography>

                                    <Typography className='text-dark-5'>
                                        Active 
                                    </Typography>
                                </section>
                                <section className='flex justify-around items-center gap-x-[1rem] px-2 pb-[2rem]'>
                            <Button className="bg-dark-1 hover:bg-dark-3 text-dark-2 hover:text-dark-1 transition-colors duration-300 ease-in-out gap-x-[9px]" variant="contained" onClick={handleUpdate}>
                                <Update className='' /> Update
                            </Button>

                            <Button className="bg-dark-5 hover:bg-dark-4 text-dark-1 hover:text-dark-1 transition-colors duration-300 ease-in-out gap-x-[9px]" variant="contained" onClick={handleLogout} disabled={true} >
                               <Block /> Update Password
                            </Button>
                            </section>
                            </main>
                        </section>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <section>
                            <img src={ProfilePlace} alt='placeholder' className='h-[10rem] w-[8rem] rounded-full hover:bg-gray-400 mt-[1rem] mb-[3px]' />
                        </section>

                        <section className='gap-y-[1rem]'>
                            <Typography className='font-bold text-dark-1 items-start ps-[1rem]' variant='md'>
                                John Doe
                            </Typography>

                            <main className='my-[2rem] gap-y-[1rem] flex flex-col'>
                                <section className='px-2 flex justify-between items-center gap-x-[2rem]'>
                                    <Typography>
                                        Email
                                    </Typography>

                                    <Typography>
                                        JohnDoe@gmail.com
                                    </Typography>
                                </section>

                                <section className='px-2 flex justify-between items-center gap-x-[2rem]'>
                                    <Typography>
                                        Status
                                    </Typography>

                                    <Typography className='text-dark-5'>
                                        Active 
                                    </Typography>
                                </section>
                            <section className='flex justify-around items-center gap-x-[1rem] px-2 pb-[2rem]'>
                            <Button className="bg-dark-1 hover:bg-dark-3 text-dark-2 hover:text-dark-1 transition-colors duration-300 ease-in-out gap-x-[9px]" variant="contained" onClick={handleEditMode}>
                                <Edit className='' /> Edit
                            </Button>

                            <Button className="bg-dark-5 hover:bg-dark-4 text-dark-1 hover:text-dark-1 transition-colors duration-300 ease-in-out gap-x-[9px]" variant="contained" onClick={handleLogout}>
                               <UpdateSharp />  Update Password
                            </Button>
                            </section>
                            </main>
                    </section>
                    </React.Fragment>
                )}
            </>
       </div>
    </main>
  )
}

export default Profile