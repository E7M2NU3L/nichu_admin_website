import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null
};

// Load initial state from local storage if available
const savedState = JSON.parse(localStorage.getItem('profileState'));
const initial_state = savedState || initialState;

const profileSlice = createSlice({
  name: "profile",
  initialState: initial_state,
  reducers: {
    put_on: (state, action) => {
        state.userData = action.payload;
      // Save state to local storage
      localStorage.setItem('profileState', JSON.stringify(state));
    },
    put_off: (state) => {
      state.userData = null
      // Save state to local storage
      localStorage.setItem('profileState', JSON.stringify(state));
    },
    update: (state, action) => {
      state.userData = action.payload;
      // Save state to local storage
      localStorage.setItem('profileState', JSON.stringify(state));
    }
  }
});

export const ProfileDetails = (state) => state.profile;

export const { put_off, put_on, update } = profileSlice.actions;
export default profileSlice.reducer;
