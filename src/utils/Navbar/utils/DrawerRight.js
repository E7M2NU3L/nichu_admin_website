import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { AdminPanelSettings, GolfCourse, Login, Menu, Person, Person2Outlined, WebOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function DrawerRight() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setOpen(open);
  };

const Iconset = [
    <Person />,
    <GolfCourse />,
    <WebOutlined />,
    <Person2Outlined />
];

const labels = ['Users', 'Courses', 'Webinars', 'Instructors'];
const links = ['/admin/users', '/admin/course', '/admin/webinars', '/admin/instructor']

const arrayOfObjects = labels.map((label, index) => ({
    text: label,
    Icon: Iconset[index],
    link: links[index]
}));

const AdminLinks = ['/admin/dashboard', '/admin/auth/login'];
const AdminList = [
    <AdminPanelSettings />,
    <Login />
];

const Adminlabels = ['Admin Panel', 'Login'];

const adminArrayOfObjects = Adminlabels.map((label, index) => ({
    text: label,
    Icon: AdminList[index],
    links: AdminLinks[index]
}));


  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      className="bg-dark-2 h-full"
    >
      <List>
        {arrayOfObjects.map((content) => (
          <Link to={content.link}>
            <ListItem key={content.text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {content.Icon}
                </ListItemIcon>
                <ListItemText primary={content.text} className='text-dark-1 font-semibold' />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {adminArrayOfObjects.map((content) => (
          <Link to={content.links}>
            <ListItem key={content.text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {content.Icon}
                </ListItemIcon>
                <ListItemText primary={content.text} className='text-dark-1 font-semibold' />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>
        <Menu className='text-dark-2 border outline-none border-dark-2'/>
      </Button>
      <SwipeableDrawer
        className=''
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list()}
      </SwipeableDrawer>
    </div>
  );
}
