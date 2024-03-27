import axios from "axios";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { LogOut, getUserDetails, UpdateCredentials } from "../redux/slices/authSlice"



const baseUrl = import.meta.env.VITE_API_URL;

const baseQuery = fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
        const accessToken = getState().auth.accessToken
        if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`)
        return headers
    }
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    const refreshToken = getUserDetails()[3]
    if (result.error && refreshToken) {
        let refreshResult = await axios.post(`${baseUrl}api/auth-token/refresh/`, { "refresh": getUserDetails()[3] })
        if (refreshResult.data) {
            api.dispatch(UpdateCredentials(refreshResult.data));
            result = await baseQuery(args, api, extraOptions)
        }
        else { api.dispatch(LogOut()) }
    }
    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ["refetchCart", "refetchAddress", "refetchReviews", "refetchOrders"],
    endpoints: () => ({}),
});