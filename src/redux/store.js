import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice"
import cartSlice from "./slices/cartSlice";
import appUiSlice from "./slices/appUislice";
import { apiSlice } from "../features/api/api";
import searchProductsSlice from "./slices/searchProducts";


export const API_URL = "http://66.94.104.18/"

const store = configureStore({
    reducer: {
        auth: authReducer,
        appUi: appUiSlice,
        cart: cartSlice,
        search: searchProductsSlice,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});



export default store