import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    toastify: {
        isVisible: false,
        message: "",
    },
    modal: {
        isVisible: false,
    }
};

export const uiSlice = createSlice({
    name: "ui",
    initialState: initialState,
    reducers: {
        onOpenToastify: (state, action) => {
            state.toastify.isVisible = true
            state.toastify.message = action.payload
        },
        
        onCloseToastify: (state) => {
            state.toastify.isVisible = false
            state.toastify.message = ""
        },

        onOpenModal: (state) => {
            state.modal.isVisible = true
        },

        onCloseModal: (state) => {
            state.modal.isVisible = false
        }
    },
});

export const { onOpenToastify, onCloseToastify, onCloseModal, onOpenModal } = uiSlice.actions;
