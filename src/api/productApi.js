import { apiSlice } from "./baseApi";

export const ProductApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProductCategories: builder.query({
            query: (params) => ({
                url: "api/category/get",
                method: "GET",
                params: params
            })
        })
    })
})
