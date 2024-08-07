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
        },
        closeMobileSideBar: (state) => {
            state.MobileSideOpen = false
        }
    }
})


export default appUiSlice.reducer
export const { ToggleMobileSideBar, closeMobileSideBar } = appUiSlice.actions