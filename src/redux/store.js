import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"
import cartSlice from "./slices/cartSlice";
import appUiSlice from "./slices/appUislice";
import { apiSlice } from "../features/api/api";


export const API_URL = import.meta.env.VITE_API_URL

const store = configureStore({
    reducer: {
        auth: authReducer,
        appUi: appUiSlice,
        cart: cartSlice,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});



export default store