import { apiSlice } from "./baseApi";

export const sellerApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSellerProductListing: builder.query({
            query: (params) => ({
                url: "api/seller/product/list",
                params: params
            })
        })
    }
    )
})