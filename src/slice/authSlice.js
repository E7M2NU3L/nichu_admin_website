import { createSlice } from "@reduxjs/toolkit";

const initial_state = {
    status: false,
    userData: null,
    isAdmin: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState: initial_state,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        },
    },
})

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;