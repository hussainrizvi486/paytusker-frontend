import { apiSlice } from "./baseApi";

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCustomerOrder: builder.mutation({
            query: (body) => ({
                url: "api/customer/order/create",
                method: "POST",
                body: body
            }),
            invalidatesTags: (res, error) => error ? [] : ["refetchOrders"]

        }),

        addOrderReview: builder.mutation({
            query: (body) => ({
                url: "api/customer/reviews/add",
                method: "POST",
                body: body
            }),
            invalidatesTags: (res, error) => error ? [] : ["refetchReviews"]
        }),

        getCustomerOrders: builder.query({
            query: (params) => ({
                url: "api/customer/order/get",
                method: "GET",
                params: params
            }),
            providesTags:["refetchOrders"]
        }),

        getOrderReviews: builder.query({
            query: () => ({
                url: "api/customer/reviews/get",
                method: "GET",
            }),
            providesTags: ["refetchReviews"]
        }),

        getPendingOrderReviews: builder.query({
            query: () => ({
                url: "api/customer/reviews/pending",
                method: "GET",
            }),
            providesTags: ["refetchReviews"]
        }),
    }),
    overrideExisting: false
})

