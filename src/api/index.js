import { userApiSlice } from "./userApi";
import { orderApiSlice } from "./orderApi";
import { cartApiSlice } from "./cartApi";
import { apiSlice } from "./baseApi";
import { ProductApiSlice } from "./productApi";
export { apiSlice } from "./baseApi"


export const { useGetHomeCategoriesQuery } = apiSlice;
export const {
    useAddUserAddressMutation,
    useUpdateUserAddressMutation,
    useGetUserAddressQuery,
    useGetUserDetailsQuery,
    useLoginUserMutation,
    useUpdateUserPasswordMutation
} = userApiSlice;

export const {
    useAddOrderReviewMutation,
    useGetCustomerOrdersQuery,
    useCreateCustomerOrderMutation,
    useGetOrderReviewsQuery,
    useGetPendingOrderReviewsQuery,
} = orderApiSlice;

export const {
    useAddItemToCartMutation,
    useGetCartDetailsQuery,
    useUpdateCartMutation
} = cartApiSlice;

export const { useGetProductCategoriesQuery } = ProductApiSlice;