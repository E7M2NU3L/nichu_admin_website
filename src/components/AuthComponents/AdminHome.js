import { Typography } from '@mui/material'
import React from 'react'
import UsersLogo from '../../assets/images/images (5).png'

const AdminHome = () => {
  return (
    <div>
      <section>
        <Typography variant='h3' style={{
          fontWeight: "700",
          fontFamily: "'lato', sans-serif"
        }}>
          Users
        </Typography>

        <img src={UsersLogo} alt='users-section' />
      </section>
    </div>
  )
}

export default AdminHome