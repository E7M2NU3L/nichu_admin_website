import { createSlice } from "@reduxjs/toolkit";

const initial_state = {
    authentication: false,
    userData: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState: initial_state,
    reducers: {
        login: (state, action) => {
            state.authentication = true;
            state.userData = action.payload;
        },
        logout: (state) => {
            state.authentication = false;
            state.userData = null;
        },
    },
})

export const AuthStatus = (state) => state.auth;

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;