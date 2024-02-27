import { createSlice } from "@reduxjs/toolkit";
import { CopySlash } from "lucide-react";

const initialState = {
    searchFilters: {},
    query: "",
    currentPageNum: 1,
    totalProductsCount: 1,
    totalPages: 1,
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
            console.log(action.payload)
            state.query = action.payload
        },
        UpdateSearchProducts: (state, action) => {
            console.log("Products updated")
            state.searchProductsResults = action.payload.products
        }
    }
})

export default searchProductsSlice.reducer;
export const { UpdateSearchProducts, UpdateFilters, UpdateQuery } = searchProductsSlice.actions;