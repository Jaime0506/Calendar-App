import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isVisible: false,
    message: "",
};

export const notificationsSlice = createSlice({
    name: "notification",
    initialState: initialState,
    reducers: {
        openModal: (state, action) => {
            state.isVisible = true
            state.message = action.payload
        },
        
        closeModal: (state) => {
            state.isVisible = false
            state.message = ""
        },
    },
});

export const { openModal, closeModal } = notificationsSlice.actions;
