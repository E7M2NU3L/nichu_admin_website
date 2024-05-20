import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedin: false,
  userData: null,
};

// Load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('authState');
    if (serializedState === null) {
      return initialState;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return initialState;
  }
};

// Save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('authState', serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: loadState(),
  reducers: {
    login: (state, action) => {
      state.isLoggedin = true;
      state.userData = action.payload.userData;
      saveState(state);  // Save state to localStorage
    },
    logout: (state) => {
      state.isLoggedin = false;
      state.userData = null;
      saveState(state);  // Save state to localStorage
    },
  }
});

export const authStatus = (state) => state.auth;
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
