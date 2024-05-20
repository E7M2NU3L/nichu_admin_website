import { Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../api/auth/Auth';
import { useDispatch } from 'react-redux';
import { login, logout } from '../../slice/authSlice';

const LoginAdmin = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // state management
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = formData;  // Extract email and password from formData
        try {
            const response = await authService.Login({ email, password });

            if (response.$id) {
                dispatch(login({
                    userData: response
                }));
                console.log(response);
                navigate('/')
            }
            else {
                dispatch(
                    logout({
                        authentication: false,
                        userData: null
                    })
                )
                return false;
            }
        } catch (error) {
            console.log(error.message);
            navigate('/admin/auth/login');
        }
    }

    return (
        <main className='min-h-[90vh] bg-dark-2 flex flex-col justify-center items-center gap-y-[1rem]'>
            <Typography variant='h4' className='text-dark-1 font-bold'>
                Admin <span className='text-dark-5'>Login</span>
            </Typography>
            <form
                className='flex flex-col justify-center items-center gap-y-5 h-[20rem] rounded-lg shadow-dark-1 shadow-md modal'
                onSubmit={handleSubmit}
            >
                <TextField
                    id="outlined-basic"
                    label="username"
                    variant="outlined"
                    type='text'
                    required
                    name='username'
                    onChange={handleChange}
                    value={formData.username}
                />
                <TextField
                    id="outlined-basic2"
                    label="email"
                    variant="outlined"
                    type='email'
                    required
                    name='email'
                    onChange={handleChange}
                    value={formData.email}
                />
                <TextField
                    id="outlined-basic3"
                    label="password"
                    variant="outlined"
                    type='password'
                    required
                    name='password'
                    onChange={handleChange}
                    value={formData.password}
                />
                <Button variant='contained' type='submit'>
                    Login
                </Button>
            </form>
        </main>
    );
};

export default LoginAdmin;
