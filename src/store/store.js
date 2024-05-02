import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slice/authSlice";
import DashSlice from "../slice/DashSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        dashboard: DashSlice,
    }
});

export default store;