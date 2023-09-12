import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: "checking", // authenticated // not-authenticated
    user: {},
    errorMessage: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: { 
        checking: (state) => {
            state.status = "checking";
        },

        login: (state, { payload }) => {
            state.status = "authenticated"
            state.user = payload
            state.errorMessage = null
        },

        logout: (state) => {
            state.status = "not-authenticated"
            state.user = {}
            state.errorMessage = null
        }
    },
});

export const { login, checking, logout } = authSlice.actions;