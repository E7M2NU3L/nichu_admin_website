import { createSlice } from "@reduxjs/toolkit";
import PlaceHolder from '../assets/images/profile.png'

const initialState = {
    profileImage: PlaceHolder,
    Username: '',
    UserEmail: '',
    Status: ''
};

const DashSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        update: (state, action) => {
            
        }
    }
})

export default DashSlice.reducer;
