import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import axios from "axios"
import { LogOut, getUserDetails } from "../../redux/slices/authSlice"
import { UpdateCredentials } from "../../redux/slices/authSlice";

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
    tagTypes: ["updateCart"],
    endpoints: (builder) => ({
        LoginUser: builder.mutation({
            query: (body) => ({
                url: "/api/auth-token/",
                method: "POST",
                body: body
            })
        }),

        getCartDetails: builder.query({
            query: () => ({
                url: "/api/get-cart",
            }),
            providesTags: ["updateCart"]
        }),

        updateQty: builder.mutation({
            query: (data) => ({
                url: "/api/cart/update-cart",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["updateCart"],
        }),

        addToCart: builder.mutation({
            query: (data) => ({
                url: "/api/add-to-cart",
                method: "POST",
                body: data,
            }),
            invalidatesTags: (result, error) => error ? [] : ["updateCart"],
        }),

        getCustomerOrders: builder.query({
            query: () => ({
                url: "/api/order/get-orders",
                method: "GET",
            }),
        }),

        getUserDetails: builder.query({
            query: () => ({
                url: "/api/get-user-details/",
                method: "GET",
            }),
        }),
        getUserAddress: builder.query({
            query: () => ({
                url: "/api/get-user-address/",
                method: "GET",
            }),
        }),
    })
});



export const { useLoginUserMutation,
    useGetCartDetailsQuery,
    useUpdateQtyMutation,
    useAddToCartMutation,
    useGetCustomerOrdersQuery,
    useGetUserDetailsQuery,
    useGetUserAddressQuery,
} = apiSlice;