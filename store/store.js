// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import { mainApi } from './api';
// import authReducer from './features/auth/authSlice'; // If you have client-side auth state

export const store = configureStore({
    reducer: {
        [mainApi.reducerPath]: mainApi.reducer,
        // auth: authReducer, // Your regular Redux slices for client-side state
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(mainApi.middleware),
});