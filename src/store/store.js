import { configureStore } from "@reduxjs/toolkit";
import { notificationsSlice } from "./notifications/notificationsSlice";

export const store = configureStore({
    reducer: {
        notification: notificationsSlice.reducer
    }
})