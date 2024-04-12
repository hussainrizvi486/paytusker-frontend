import { createSlice } from "@reduxjs/toolkit"
import { cartApiSlice } from "../../api/cartApi"

const initialState = {
    items: [],
    total_qty: 0,
    total_amount: 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        updateCart: (state, action) => {
            const { items, total_amount, total_qty } = action.payload;
            state.items = items;
            state.total_qty = total_qty;
            state.total_amount = total_amount;
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            cartApiSlice.endpoints.getCartDetails.matchFulfilled,
            (state, action) => {
                const { total_qty } = action.payload;
                state.total_qty = total_qty;
            }
        );
    }
});


export default cartSlice.reducer
export const { updateCart } = cartSlice.actions
