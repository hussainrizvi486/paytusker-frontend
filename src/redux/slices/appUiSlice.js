import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    MobileSideOpen: false
}

const appUiSlice = createSlice({
    initialState: initialState,
    name: "appUiSlice",
    reducers: {
        ToggleMobileSideBar: (state) => {
            console.log(state.MobileSideOpen)
            if (state.MobileSideOpen) {
                state.MobileSideOpen = false
            }
            else {
                state.MobileSideOpen = true
            }
        }
    }
})


export default appUiSlice.reducer
export const { ToggleMobileSideBar } = appUiSlice.actions