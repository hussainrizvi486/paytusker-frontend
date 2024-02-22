import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchFilters: {},
    query: "",
    currentPageNum: 1,
    totalPages: 1,
}
const searchProductsSlice = createSlice({

    initialState: initialState,
    name: "searchProducts",
    reducers: {
        UpdateFilters: (state, action) => {
            state.searchFilters[action.payload.key] = [action.payload.value]
        },
        ClearFilters: (state) => {
            state.searchFilters = {}
        },
        UpdateQuery: (state, action) => {
            state.query = action.payload
        }
    }
})

export default searchProductsSlice