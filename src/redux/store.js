import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"
import cartSlice from "./slices/cartSlice";
export const API_URL = import.meta.env.VITE_API_URL
import thunk from 'redux-thunk';
import { apiSlice } from "../features/api/api";
// import { CartApi } from "../features/api/api";
const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartSlice,
        [apiSlice.reducerPath]: apiSlice.reducer
        // [CartApi.reducerPath]: CartApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware, thunk),
});



export default store