import { createSlice } from "@reduxjs/toolkit";

const initial_state = {
    username: '',
    userEmail: '',
    userPhone: '',
    isEmailVerified: false,
    label: '',
}

const profileSlice = createSlice({
    name: "profile",
    initialState: initial_state,
    reducers: {
        put_on: (state, action) => {
            state.username = action.payload.username;
            state.userEmail = action.payload.userEmail;
            state.userPhone = action.payload.userPhone;
            state.isEmailVerified = action.payload.isEmailVerified;
            state.label = action.payload.label;
        },
        put_off: (state) => {
            state.username = '';
            state.userEmail = '';
            state.userPhone = '';
            state.isEmailVerified = false;
            state.label = '';
        },
        update: (state, action) => {
            state.username = action.payload.username;
            state.userEmail = action.payload.userEmail;
            state.userPhone = action.payload.userPhone;
            state.isEmailVerified = action.payload.isEmailVerified;
            state.label = action.payload.label;
        }
    }
});

export const ProfileDetails = (state) => state.profile;

export const { put_off, put_on, update } = profileSlice.actions;
export default profileSlice.reducer;
