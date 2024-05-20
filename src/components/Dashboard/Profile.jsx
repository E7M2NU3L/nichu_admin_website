import React, { useEffect, useState } from 'react';
import ProfilePlace from '../../assets/images/profile.png';
import { Button, Input, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Block, Delete, Edit, Update } from '@mui/icons-material';
import ProfileUpload from './utils/ProfileUpload';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileDetails, put_on } from '../../slice/profileSlice';

const Profile = ({ authentication }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState('');

  const profileData = useSelector(ProfileDetails);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedProfile = JSON.parse(localStorage.getItem('profileState'));
        if (storedProfile) {
          dispatch(put_on(storedProfile));
        } else {
          dispatch(
            put_on({
              userData
            })
          );
        }

        setUserData(userData);
      } catch (error) {
        console.log('Error Message:', error.message);
      }
    };

    fetchData();
  }, [dispatch, userData]);

  const handleEditMode = (e) => {
    e.preventDefault();
    setEditMode(true);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    navigate('/');
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setEditMode(false);
    navigate('/admin/dashboard');
  };

  return (
    <main className="flex min-h-[90vh] justify-center items-center">
      <div className="max-w-[20rem] min-w-[18rem] min-h-[25rem] h-full py-[1rem] flex flex-col justify-center items-center glass-effect">
        {editMode ? (
          <React.Fragment>
            <section className="px-2">
              <ProfileUpload />
            </section>

            <section className="gap-y-[1rem]">
              <Input
                className="font-bold text-dark-1 items-start ms-[1rem]"
                placeholder="John Doe"
                value="hello"
                onChange={(e) => setUserData(e.target.value)}
                variant="outlined"
              />

              <main className="my-[2rem] gap-y-[1rem] flex flex-col">
                <section className="px-2 flex justify-between items-center gap-x-[2rem] text-dark-1">
                  <Typography>Email</Typography>
                  <Input
                    className="text-dark-1"
                    placeholder="johnDoe@gmail.com"
                    value="hello"
                    onChange={(e) => setUserData(e.target.value)}
                  />
                </section>

                <section className="px-2 flex justify-between items-center gap-x-[2rem]">
                  <Typography>Status</Typography>
                  <Typography className="text-dark-5">Active</Typography>
                </section>

                <section className="flex justify-around items-center gap-x-[1rem] px-2 pb-[2rem]">
                  <Button
                    className="bg-dark-1 hover:bg-dark-3 text-dark-2 hover:text-dark-1 transition-colors duration-300 ease-in-out gap-x-[9px]"
                    variant="contained"
                    onClick={handleUpdate}
                  >
                    <Update /> Update
                  </Button>

                  <Button
                    className="bg-dark-5 hover:bg-dark-4 text-dark-1 hover:text-dark-1 transition-colors duration-300 ease-in-out gap-x-[9px]"
                    variant="contained"
                    onClick={handleLogout}
                    disabled={true}
                  >
                    <Block /> Delete
                  </Button>
                </section>
              </main>
            </section>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <section>
              <img
                src={ProfilePlace}
                alt="placeholder"
                className="h-[10rem] w-[8rem] rounded-full hover:scale-105 transition-all duration-150 ease-in-out mt-[1rem] mb-[3px]"
              />
            </section>

            <section className="gap-y-[1rem]">
              <Typography className="font-bold text-dark-1 items-start ps-[1rem]" variant="md">
                {profileData && profileData.username ? profileData.username : 'John Doe'}
              </Typography>

              <main className="my-[2rem] gap-y-[1rem] flex flex-col">
                <section className="px-2 flex justify-between items-center gap-x-[2rem]">
                  <Typography>Email</Typography>
                  <Typography>
                    {profileData && profileData.userEmail ? profileData.userEmail : 'JohnDoe@gmail.com'}
                  </Typography>
                </section>

                <section className="px-2 flex justify-between items-center gap-x-[2rem]">
                  <Typography>Status</Typography>
                  <Typography className="text-dark-5">Active</Typography>
                </section>

                <section className="flex justify-around items-center gap-x-[1rem] px-2 pb-[2rem]">
                  <Button
                    className="bg-dark-1 hover:bg-dark-3 text-dark-2 hover:text-dark-1 transition-colors duration-300 ease-in-out gap-x-[9px]"
                    variant="contained"
                    onClick={handleEditMode}
                  >
                    <Edit /> Edit
                  </Button>

                  <Button
                    className="bg-dark-5 hover:bg-dark-4 text-dark-1 hover:text-dark-1 transition-colors duration-300 ease-in-out gap-x-[9px]"
                    variant="contained"
                    onClick={handleLogout}
                  >
                    <Delete /> Delete
                  </Button>
                </section>
              </main>
            </section>
          </React.Fragment>
        )}
      </div>
    </main>
  );
};

export default Profile;
