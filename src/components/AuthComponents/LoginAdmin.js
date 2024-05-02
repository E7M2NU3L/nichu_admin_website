import { Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import './main.css'
import { useNavigate } from 'react-router-dom'

const LoginAdmin = () => {

  const navigate = useNavigate('');

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUsername = (e) => setUsername(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      console.log(
        username,
        email,
        password
      )
      console.log("Login successfull");
      navigate('/')
    } catch (error) {
      console.log(error.message);
      navigate('/admin/auth')
    }
  }

  return (
    <main className='min-h-[90vh] bg-dark-2 flex flex-col justify-center items-center gap-y-[1rem]'>
      
      <Typography variant='h4' className='text-dark-1 font-bold'>
        Admin <span className='text-dark-5'>
          Login
        </span>
      </Typography>
      
        <form className='flex flex-col justify-center items-center gap-y-5 h-[20rem] rounded-lg shadow-dark-1 shadow-md modal' onSubmit={handleSubmit}>
            <TextField id="outlined-basic" label="username" variant="outlined" type='text' required={true} onChange={handleUsername} value={username}  />
            <TextField id="outlined-basic" label="email" variant="outlined" type='email' required={true} onChange={handleEmail} value={email}  />
            <TextField id="outlined-basic" label="password" variant="outlined" type='password' required={true} value={password} onChange={handlePassword}  />
            
            <Button variant='contained' type='submit'>
              Login
            </Button>
          </form>

    </main>
  )
}

export default LoginAdmin