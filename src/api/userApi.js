import { apiSlice } from "./baseApi";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (data) => ({
                url: "api/user/login",
                method: "POST",
                body: data
            })
        }),

        addUserAddress: builder.mutation({
            query: (data) => ({
                url: "api/user/address/add",
                method: "POST",
                body: data,
            }),
            invalidatesTags: (result, error) => error ? [] : ["refetchAddress"]
        }),

        updateUserAddress: builder.mutation({
            query: (data) => ({
                url: "api/user/address/update",
                method: "POST",
                body: data,
            }),
            invalidatesTags: (result, error) => error ? [] : ["refetchAddress"]
        }),

        getUserDetails: builder.query({
            query: () => ({
                url: "api/get-user-details/",
                method: "GET",
            })
        }),

        getUserAddress: builder.query({
            query: (params) => ({
                url: "api/user/address/get",
                method: "GET",
                params: params
            }),
            providesTags: ["refetchAddress"]

        }),
    }),
    overrideExisting: false
})