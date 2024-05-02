import { AdminPanelSettings, Logout  } from '@mui/icons-material';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const AdminList = [
        <AdminPanelSettings className='text-dark-2 hover:text-dark-3 transition-all duration-300 ease-in-out' />,
        <Logout className='text-dark-2 hover:text-dark-3 transition-all duration-300 ease-in-out' />
    ];
    
    const Adminlabels = ['Profile', 'Logout'];
    const links = ['/admin/profile', '/admin/auth/logout']
    
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
        {adminArrayOfObjects.map((content) => (
          <React.Fragment>
          <Link to={content.link}>
            <ListItem key={content.text} disablePadding>
                <ListItemButton className='hover:text-dark-3 transition-all duration-300 ease-in-out'>
                <ListItemIcon className='py-2'>
                    {content.Icon}
                </ListItemIcon>
                <ListItemText primary={content.text} className='text-dark-2 font-semibold hidden sm:block' />
                </ListItemButton>
            </ListItem>
          </Link>
          </React.Fragment>
        ))}
      </List>
    </Box>
    </div>
  )
}

export default Sidebar