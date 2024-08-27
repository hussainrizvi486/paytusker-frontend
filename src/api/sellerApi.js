import { apiSlice } from "./baseApi";

export const sellerApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSellerProductListing: builder.query({
            query: (params) => ({
                url: "api/seller/product/list",
                params: params
            }),
            providesTags: ["refetchSellerProductsListView"]
        }),
        createSellerProduct: builder.mutation({
            query: (data) => ({
                url: "api/seller/product",
                method: "POST",
                body: data
            }),
            invalidatesTags: (res, error) => error ? [] : ["refetchSellerProductsListView"]
        }),
        updateSellerProduct: builder.mutation({
            query: (data) => ({
                url: "api/seller/product",
                method: "PUT",
                body: data
            }),
            invalidatesTags: (res, error) => error ? [] : ["refetchSellerProductsListView"]
        }),
        productUploadDetails: builder.query({
            query: () => ({
                url: "api/product/upload-details",
                method: "GET",
            }),
        }),
    }
    )
})