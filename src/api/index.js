import { userApiSlice } from "./userApi";
import { orderApiSlice } from "./orderApi";
import { cartApiSlice } from "./cartApi";
import { apiSlice } from "./baseApi";
export { apiSlice } from "./baseApi"


export const { useGetHomeCategoriesQuery } = apiSlice;
export const {
    useAddUserAddressMutation,
    useUpdateUserAddressMutation,
    useGetUserAddressQuery,
    useGetUserDetailsQuery,
    useLoginUserMutation,
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