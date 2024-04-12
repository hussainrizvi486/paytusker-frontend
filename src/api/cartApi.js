import { apiSlice } from "./baseApi";

export const cartApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCartDetails: builder.query({
            query: () => ({
                url: "api/customer/cart/get",
                method: "GET"
            }),
            providesTags: ["refetchCart"]
        }),

        updateCart: builder.mutation({
            query: (data) => ({
                url: "api/customer/cart/update",
                method: "POST",
                body: data
            }),
            invalidatesTags: (res, error) => error ? [] : ["refetchCart"]
        }),

        addItemToCart: builder.mutation({
            query: (data) => ({
                url: "api/customer/cart/add",
                method: "POST",
                body: data
            }),
            invalidatesTags: (res, error) => error ? [] : ["refetchCart"]
        })

    }),
    overrideExisting: false
})
