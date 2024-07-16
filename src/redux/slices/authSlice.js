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


export const getAuthUser = () => {
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
    let isAuthenticated = false;
    let accessToken = null;
    let refreshToken = null;
    let roles = null

    if (localStorage.getItem("authTokens")) {
        const tokensObj = JSON.parse(localStorage.getItem("authTokens"))
        accessToken = tokensObj.access;
        let decodedToken = jwtDecode(tokensObj.access);
        roles = decodedToken.roles;
        refreshToken = tokensObj.refresh;
    }

    if (user) { isAuthenticated = true }

    return {
        user: user,
        isAuthenticated: isAuthenticated,
        accessToken: accessToken,
        refreshToken: refreshToken,
        roles: roles
    }
    // return [user, isAuthenticated, accessToken, refreshToken]
}



const getAuthSliceState = () => {
    const { user, isAuthenticated, accessToken } = getAuthUser();
    return { user: user, isAuthenticated: isAuthenticated, accessToken: accessToken }
}

const authSlice = createSlice({
    name: 'auth',
    initialState: getAuthSliceState(),
    reducers: {
        LogIn: (state, action) => {
            const { tokens } = action.payload;
            const decode_token = jwtDecode(tokens.access);
            const user = {
                "user_id": decode_token.user_id,
                "email": decode_token.email,
                "full_name": decode_token.full_name,
                "username": decode_token.username,
            }

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
