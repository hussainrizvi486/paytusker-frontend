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


        updateUserPassword: builder.mutation({
            query: (data) => ({
                url: "api/user/update/password",
                method: "PUT",
                body: data,
            }),
            // invalidatesTags: (result, error) => error ? [] : ["refetchAddress"]
        }),

        getUserDetails: builder.query({
            query: () => ({
                url: "api/user/detail",
                method: "GET",
            })
        }),

        // Address APIS
        getUserAddress: builder.query({
            query: (params) => ({
                url: "api/user/address",
                method: "GET",
                params: params
            }),
            providesTags: ["refetchAddress"]
        }),

        addUserAddress: builder.mutation({
            query: (data) => ({
                url: "api/user/address",
                method: "POST",
                body: data,
            }),
            invalidatesTags: (result, error) => error ? [] : ["refetchAddress"]
        }),

        updateUserAddress: builder.mutation({
            query: (data) => ({
                url: "api/user/address",
                method: "PUT",
                body: data,
            }),
            invalidatesTags: (result, error) => error ? [] : ["refetchAddress"]
        }),

        deleteUserAddress: builder.mutation({
            query: (data) => ({
                url: "api/user/address",
                method: "DELETE",
                body: data,
            }),
            invalidatesTags: (result, error) => error ? [] : ["refetchAddress"]
        }),
    }),

    overrideExisting: false
})