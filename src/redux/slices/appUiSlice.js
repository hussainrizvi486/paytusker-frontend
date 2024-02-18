import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    MobileSideOpen: false
}

const appUiSlice = createSlice({
    initialState: initialState,
    name: "appUiSlice",
    reducers: {
        ToggleMobileSideBar: (state) => {
            if (state.MobileSideOpen) {
                state.MobileSideOpen = false
            }
            else {
                state.MobileSideOpen = true
            }
            console.log(state.MobileSideOpen)
        }
    }
})


export default appUiSlice.reducer
export const { ToggleMobileSideBar } = appUiSlice.actions