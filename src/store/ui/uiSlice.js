import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isVisibleToastify: false,
    messageToastify: "",
    isVisibleModal: false
};

export const uiSlice = createSlice({
    name: "ui",
    initialState: initialState,
    reducers: {
        onOpenToastify: (state, action) => {
            state.isVisibleToastify = true
            state.messageToastify = action.payload
        },
        
        onCloseToastify: (state) => {
            state.isVisibleToastify = false
            state.messageToastify = ""
        },

        onOpenModal: (state) => {
            state.isVisibleModal = true
        },

        onCloseModal: (state) => {
            state.isVisibleModal = false
        }
    },
});

export const { onOpenToastify, onCloseToastify, onCloseModal, onOpenModal } = uiSlice.actions;
