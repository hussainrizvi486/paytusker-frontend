import { createSlice } from "@reduxjs/toolkit"

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
            const { items, total_amount, total_qty } = action.payload
            state.items = items;
            state.total_qty = total_qty;
            state.total_amount = total_amount;
        }
    },
})


export default cartSlice.reducer
export const { updateCart } = cartSlice.actions