import { userApiSlice } from "./userApi";
import { orderApiSlice } from "./orderApi";
import { cartApiSlice } from "./cartApi";
export { apiSlice } from "./baseApi"


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