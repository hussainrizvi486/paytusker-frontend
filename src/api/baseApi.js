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
    let result = await baseQuery(args, api, extraOptions);
    const { error } = result;
    const refreshToken = getUserDetails()[3];

    if (refreshToken && error?.status === 401 && error?.data?.code === "user_not_found") {
        api.dispatch(LogOut());
        window.location.href = "/login";
    }

    else if (refreshToken && result?.error?.status === 401) {
        try {
            let refreshResult = await axios.post(`${baseUrl}api/auth-token/refresh/`, { "refresh": getUserDetails()[3] })
            if (refreshResult.data) {
                api.dispatch(UpdateCredentials(refreshResult.data));
                result = await baseQuery(args, api, extraOptions)
            }

        } catch (error) {
            // api.dispatch(LogOut())
            // window.location.href = "/login"
        }
    }
    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ["refetchCart", "refetchAddress", "refetchReviews", "refetchOrders"],
    endpoints: () => ({})
});


export const { useGetHomeCategoriesQuery } = apiSlice; 