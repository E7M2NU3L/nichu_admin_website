import { AdminPanelSettings, Logout  } from '@mui/icons-material';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';
import LogoutModal from '../AuthComponents/LogoutModal';

const Sidebar = () => {
    const AdminList = [
       ,
        <Logout className='text-dark-2 hover:text-dark-3 transition-all duration-300 ease-in-out' />
    ];
    
    const Adminlabels = ['Profile', 'Logout'];
    const links = [, '/admin/auth/logout']
    
    const adminArrayOfObjects = Adminlabels.map((label, index) => ({
        text: label,
        Icon: AdminList[index],
        link: links[index]
    }));

    
  return (
    <div>
        <Box
      role="presentation"
      className=""
    >
      <List>
          <React.Fragment>
          <Link to='/admin/dashboard'>
            <ListItem disablePadding>
                <ListItemButton className='hover:text-dark-3 transition-all duration-300 ease-in-out'>
                <ListItemIcon className='py-2'>
                <AdminPanelSettings className='text-dark-2 hover:text-dark-3 transition-all duration-300 ease-in-out' />
                </ListItemIcon>
                <ListItemText primary="Profile" className='text-dark-2 font-semibold hidden sm:block' />
                </ListItemButton>
            </ListItem>
          </Link>

          <ListItem className='w-full'>
              <LogoutModal />
          </ListItem>
          </React.Fragment>
      </List>
    </Box>
    </div>
  )
}

export default Sidebar