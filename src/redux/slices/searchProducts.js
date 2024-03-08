import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchFilters: {},
    query: "",
    currentPageNum: 1,
    totalProductsCount: 0,
    totalPages: 0,
    searchProductsResults: [],
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
        },
        UpdateCurrentPage: (state, action) => {
            state.currentPageNum = action.payload
        },
        UpdateSearchProducts: (state, action) => {
            state.searchProductsResults = action.payload.products
        }
    }
})


export default searchProductsSlice.reducer;
export const { UpdateSearchProducts, UpdateFilters, UpdateQuery, UpdateCurrentPage } = searchProductsSlice.actions;