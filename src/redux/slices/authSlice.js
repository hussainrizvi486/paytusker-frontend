import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';


export const getUserDetails = () => {
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
    let isAuthenticated = false;
    let accessToken = null;
    let refreshToken = null;

    if (localStorage.getItem("authTokens")) {
        const tokensObj = JSON.parse(localStorage.getItem("authTokens"))
        accessToken = tokensObj.access;
        refreshToken = tokensObj.refresh;
    }

    if (user) { isAuthenticated = true }
    return [user, isAuthenticated, accessToken, refreshToken]
}


const initialState = {
    user: getUserDetails()[0],
    isAuthenticated: getUserDetails()[1],
    accessToken: getUserDetails()[2],
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        LogIn: (state, action) => {
            const tokens = action.payload;
            const user = jwtDecode(tokens.access);

            state.user = user;
            state.accessToken = tokens.access;
            state.isAuthenticated = true;

            localStorage.setItem("authTokens", JSON.stringify(tokens));
            localStorage.setItem("user", JSON.stringify(user));
        },
        LogOut: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.accessToken = null;
            localStorage.clear();
        },

        UpdateCredentials: (state, action) => {
            const tokens = action.payload;
            const user = jwtDecode(tokens.access);

            state.user = user;
            state.accessToken = tokens.access;
            state.isAuthenticated = true;

            localStorage.setItem("authTokens", JSON.stringify(tokens));
            localStorage.setItem("user", JSON.stringify(user));
        }
    }
})


export const { LogIn, LogOut, UpdateCredentials } = authSlice.actions
export default authSlice.reducer
export const getToken = (state) => state.auth.accessToken
